<template>
    <div id="app" class="padding">
        <b-container>
            <b-row>
                <b-col md="4">
                    <img class="image" :src="product.img" alt>
                </b-col>
                <b-col class="content" md="5">
                    <h1>{{product.name}}</h1>
                    <hr>
                    <p>{{product.description}}</p>
                    <h5 v-if="product.price">PRECIO: L. {{(product.price).toLocaleString()}}</h5>
                    <p>{{product.quantity}} Disponibles</p>
                    <br>

                    <div v-if="user">
                        <ui-button v-show="product.quantity > 0" v-if="user.type == 1" icon="star" @click="showConfirm('addItemConfirm')" color="primary">
                            Agregar a mi Lista
                        </ui-button>
                        <p v-show="product.quantity <= 0">Producto Fuera de Stock</p>
                        
                        <ui-button style="margin-left:10px;" v-if="user.type == 1" icon="add_comment" @click="openModal('createComment')" color="primary">
                            Agregar Comentario
                        </ui-button>
                    </div>
                    <div v-else>
                        <p>Para agregar al carrito <router-link to="/login">Inicie Sesión</router-link></p>
                    </div>
                
                    <ui-confirm
                    ref="addItemConfirm"
                    title="Agregar Repuesto"
                    @confirm="addItemList"
                    >
                        ¿Seguro que desea agregar el producto a su lista?
                    </ui-confirm>
                    <ui-modal ref="product_added" title="Felicidades" transition="scale-up">
                        {{modal_msg}}
                    </ui-modal>

                    <ui-modal ref="createComment" title="Nuevo Comentario">
                        <ui-textbox label="Comentario" v-model="comment"></ui-textbox>
                        <br>
                        <ui-button color="primary" @click="addComment()">Guardar Comentario</ui-button>
                    </ui-modal>


                </b-col>
                <b-col md="3" class="center">
                    <h5>Vendedor: </h5>
                    <p>{{seller.first_name}} {{seller.last_name}}</p>
                    <span id="star" class="rating" data-stars="5" :data-default-rating="user.rating"></span>
                    <br>
                    <br>
                    <router-link :to="'/profile/'+seller._id">
                        <ui-button color="primary">Ver Perfil</ui-button>
                    </router-link>
                </b-col>
            </b-row>
            <hr>
            <h4>Comentarios de los Clientes</h4>
            
            <b-row v-if="comments.length != 0" v-for="comment in comments" class="comentario">
                <b-col md="3">
                    <p>De: {{comment.user.first_name}} {{comment.user.last_name}}</p>
                </b-col>
                <b-col md="9">
                    <p class="comment">{{comment.text}}</p>
                </b-col>
            </b-row>
            <b-row v-if="comments.length == 0">
                <p class="comment">Este ítem todavia no tiene comentarios... <a href="#" @click="openModal('createComment')">Agregar uno aquí</a></p>
            </b-row>

        </b-container>
        
    </div>
</template>

<script>
export default {
    data: function(){
        return {
            product: "",
            seller: "" ,
            modal_msg: "",
            user: "",
            comment: "",
            comments: []
        }
    },
    mounted(){
        var vm = this;
        this.user = JSON.parse(localStorage.getItem("user"));

        this.axios.get(process.env.VUE_APP_PRODUCT+'/'+this.$route.params.id, 
        {
            headers: {
                "Content-Type"   : "application/json",
                "Authorization"  : localStorage.getItem('token')
            }
        })
        .then(function(response){
            vm.product = response.data;
            vm.getComments();
            vm.axios.get(process.env.VUE_APP_USER+'/'+vm.product.seller_id, 
            {
                headers: {
                    "Content-Type"   : "application/json",
                    "Authorization"  : localStorage.getItem('token')
                }
            })
            .then(function(response){
                vm.seller = response.data;
                var star = new SimpleStarRating(document.getElementById('star'));
                star.setDefaultRating(vm.seller.rating);
                star.disable();
            })
            .catch(function (error) {
                console.log(error);
            }); 
        })
        .catch(function (error) {
            console.log(error);
        });

        
    },
    methods: {
        showConfirm(ref) {
        this.$refs[ref].open();
        },
        addItemList(){
            var vm = this;
            //Validacion superada
            this.axios.post(process.env.VUE_APP_API + 'addItemList', 
            {
                "product_id" : this.product._id
            },
            {
                headers: {
                "Content-Type"   : "application/json",
                "Authorization"  : localStorage.getItem('token')
                },
            })
            .then(function (response) {
                vm.modal_msg = response.data.msg;
                vm.openModal('product_added');
            })
            .catch(function (error) {
                console.log(error);
            });
            
        },
        addComment(){
            var vm = this;
            //Validacion superada
            this.axios.post(process.env.VUE_APP_COMMENT, 
            {
                "product_id" : this.product._id,
                "text" : this.comment
            },
            {
                headers: {
                "Content-Type"   : "application/json",
                "Authorization"  : localStorage.getItem('token')
                },
            })
            .then(function (response) {
                vm.modal_msg = response.data.msg;
                vm.getComments();
                vm.closeModal('createComment');
                vm.openModal('product_added');
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        getComments(){
            
            var vm = this;
            this.axios.post(process.env.VUE_APP_COMMENT + '/get',
            {
                "product_id" : this.product._id
            },
            {
                headers: {
                    "Content-Type"   : "application/json",
                    "Authorization"  : localStorage.getItem('token')
                },
            })
            .then(function (response) {
                   vm.comments = response.data; 
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        openModal(ref) {
            this.$refs[ref].open();
        },
        closeModal(ref) {
            this.$refs[ref].close();
        }
    }

};

</script>

<style scoped>
    .image{
        width:100%;
    }
    .content{
        text-align: left;
    }
    #app{
        text-align: left;
    }
    .comentario{
        margin: 0.5em 0;
        padding:1em;
        border: 1px #f2f2f2 solid;
        border-radius: 10px;
    }
    .comment{
        font-size: 16px;
    }
</style>
