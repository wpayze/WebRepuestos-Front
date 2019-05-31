<template>
    <div id="app" class="padding">
        <b-container>
            <b-row>
                <b-col md="4">
                    <img class="image" src="https://i.ebayimg.com/images/g/2sMAAOSw5FBc4tX0/s-l1600.jpg" alt>
                </b-col>
                <b-col class="content" md="5">
                    <h1>{{product.name}}</h1>
                    <hr>
                    <p>{{product.description}}</p>
                    <h5 v-if="product.price">PRECIO: L. {{(product.price).toLocaleString()}}</h5>
                    <br>
                     <ui-button icon="star" @click="showConfirm('addItemConfirm')" color="primary">Agregar a mi Lista</ui-button>

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


                </b-col>
                <b-col md="3" class="center">
                    <h5>Vendedor: </h5>
                    <p>{{seller.first_name}} {{seller.last_name}}</p>
                    <router-link :to="'/profile/'+seller._id">
                        <ui-button color="primary">Ver Perfil</ui-button>
                    </router-link>
                </b-col>
            </b-row>
        </b-container>
        <hr>
        <b-container>
            <h1>Más Productos de este vendedor</h1>
        </b-container>
    </div>
</template>

<script>
export default {
    data: function(){
        return {
            product: "",
            seller: "" ,
            modal_msg: ""
        }
    },
    mounted(){
        var vm = this;

        this.axios.get(process.env.VUE_APP_PRODUCT+'/'+this.$route.params.id, 
        {
            headers: {
                "Content-Type"   : "application/json",
                "Authorization"  : localStorage.getItem('token')
            }
        })
        .then(function(response){
            vm.product = response.data;
            console.log(response);
            vm.axios.get(process.env.VUE_APP_USER+'/'+vm.product.seller_id, 
            {
                headers: {
                    "Content-Type"   : "application/json",
                    "Authorization"  : localStorage.getItem('token')
                }
            })
            .then(function(response){
                vm.seller = response.data;
                console.log(vm.seller);
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
        openModal(ref) {
            this.$refs[ref].open();
        },
        closeModal(ref) {
            this.$refs[ref].close();
        }
    }

};

</script>

<script src="<a class="vglnk" href="https://www.paypalobjects.com/api/checkout.js" rel="nofollow"><span>https</span><span>://</span><span>www</span><span>.</span><span>paypalobjects</span><span>.</span><span>com</span><span>/</span><span>api</span><span>/</span><span>checkout</span><span>.</span><span>js</span></a>"></script>


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
</style>
