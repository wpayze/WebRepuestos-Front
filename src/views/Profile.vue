<template>
<section>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <b-container class="padding">
        <b-row>
            <b-col>
                <b-row>
                    <b-col md="2">
                        <!-- <img class="profile-pic" src="https://i14.ebayimg.com/03/u/000/77/39/1673_7.JPG?set_id=81" alt=""> -->
                    </b-col>
                    <b-col md="4">
                        <h2>{{user.first_name}} {{user.last_name}}</h2>
                        <h4>({{user.company}})</h4>
                        <p>{{type}}</p>
                        
                        <span id="star" class="rating" data-stars="5" :data-default-rating="user.rating"></span>
                    </b-col>
                    <b-col class="center">
                        <h5>Miembro desde {{user.createdAt}}</h5>
                        <h5>Telefono: {{user.phone}}</h5>
                        <h5>Correo: {{user.email}}</h5>
                        <ui-button v-if="user.type == 2 && !ya_voto" color="primary" @click="openModal('rating');" icon="add">Agregar Puntuación</ui-button>
                        <p v-else> <span v-show="user.type == 2">Gracias por su rating.</span></p> 
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </b-container>
    <hr>
    <b-container v-if="this.user.type == 2">
        <h1>Productos de {{user.first_name}}</h1>
        <b-row>
            <b-col sm="3" v-if="products" v-for="product in products">
                  <b-card
                    :title="product.name"
                    :img-src="product.img"
                    img-alt="Image"
                    img-top
                    tag="article"
                    style="max-width: 20rem;"
                    class="mb-2"
                    >
                    <b-card-text>
                    {{product.description}}
                    {{product.location}}
                    {{product.price}}
                    </b-card-text>
                    <router-link :to="'/product/'+product._id">
                        <ui-button raised color="primary" size="small" type="secondary">
                            Ver Repuesto
                        </ui-button>
                    </router-link>
                </b-card>
            </b-col>
        </b-row>
    </b-container>

    <ui-modal ref="rating" title="Agregar Rating">
        <span id="myRating" class="rating" data-stars="5" data-default-rating="5"></span>
        <br>
        {{stars}} estrellas.
        <br>
        <ui-button color="primary" @click="rating()">Guardar Rating</ui-button>
    </ui-modal>
</section>
    
</template>

<script>

export default {
    data: function(){
        return {
            user: {},
            type: "",
            products: {},
            stars: 5,
            ya_voto: false
        }
    },
    mounted(){
        var vm = this;

                this.axios.get(process.env.VUE_APP_USER+'/'+this.$route.params.id,
                {
                    headers: {
                        "Content-Type"   : "application/json",
                        "Authorization"  : localStorage.getItem('token')
                    }
                })
                .then(function (response){
                    vm.user = response.data;
                    switch(response.data.type){
                        case 1: vm.type="Comprador";break;
                        case 2: vm.type="Vendedor";break;
                        case 3: vm.type="Técnico";break;
                    }

                    //Si el usuario es vendedor cargamos sus productos.

                    if (vm.user.type == 2)
                    {
                        vm.getProducts();
                        var star = new SimpleStarRating(document.getElementById('star'));
                        star.setDefaultRating(vm.user.rating);
                        star.disable();

                        let user_id = JSON.parse(localStorage.getItem("user"));
                        
                        if (user_id){
                            vm.user.rated.forEach(user_id_api => {
                            
                                if (user_id_api == user_id._id){
                                    vm.ya_voto = true;
                                }
                            });
                        } else {
                            vm.ya_voto = true;
                        }
                        

                    let user = JSON.parse(localStorage.getItem("user"));
                    if (user._id == vm.user._id){
                        vm.ya_voto = true;
                    }
                        
                    }
                    
                })
                .catch(function (error){
                    console.log(error);
                });

        var r = new SimpleStarRating(document.getElementById('myRating'));
        
        document.getElementById('myRating').addEventListener('rate', function (e) {
            vm.updateStars(e.detail);
        });
    },
    methods: {
        openModal(ref) {
            this.$refs[ref].open();
        },
        closeModal(ref) {
            this.$refs[ref].close();
        },
        getProducts: function(){
            var vm = this;
            this.axios.get(process.env.VUE_APP_PRODUCTS + '/'+this.$route.params.id,
            {
                headers: {
                    "Content-Type"   : "application/json",
                    "Authorization"  : localStorage.getItem('token')
                },
            })
            .then(function (response) {
                vm.products = response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        updateStars: function(rating){
            this.stars = rating;
        },
        rating: function(){
            var vm = this;
            this.axios.get(process.env.VUE_APP_API + '/rating/'+this.$route.params.id+'/'+this.stars,
            {
                headers: {
                    "Content-Type"   : "application/json",
                    "Authorization"  : localStorage.getItem('token')
                },
            })
            .then(function (response) {
                vm.loadUser();
                vm.closeModal('rating');
                vm.ya_voto = true;
                vm.addRated();
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        loadUser: function(){
            var vm = this;
            this.axios.get(process.env.VUE_APP_USER+'/'+this.$route.params.id,
                {
                    headers: {
                        "Content-Type"   : "application/json",
                        "Authorization"  : localStorage.getItem('token')
                    }
                })
                .then(function (response){
                    vm.user = response.data;
                    switch(response.data.type){
                        case 1: vm.type="Comprador";break;
                        case 2: vm.type="Vendedor";break;
                        case 3: vm.type="Técnico";break;
                    }

                    //Si el usuario es vendedor cargamos sus productos.

                    if (vm.user.type == 2)
                    {
                        vm.getProducts();
                    }
                })
                .catch(function (error){
                    console.log(error);
                });
        },
        addRated: function(){
            var vm = this;
            let user = JSON.parse(localStorage.getItem("user"));
            this.axios.get(process.env.VUE_APP_API + '/rated/'+this.$route.params.id+'/'+user._id,
            {
                headers: {
                    "Content-Type"   : "application/json",
                    "Authorization"  : localStorage.getItem('token')
                },
            })
            .then(function (response) {
                vm.loadUser();
                vm.ya_voto = true;
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }

}
</script>

<style scoped>
    .profile{
        background: #2880e3;
    }
    .profile-pic{
        width:100%;
    }
    .checked {
    color: orange;
    }
</style>
