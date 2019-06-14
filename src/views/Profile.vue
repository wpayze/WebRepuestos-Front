<template>
<section>
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
                    </b-col>
                    <b-col class="center">
                        <h5>Miembro desde {{user.createdAt}}</h5>
                        <h5>Telefono: {{user.phone}}</h5>
                        <h5>Correo: {{user.email}}</h5>
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
</section>
    
</template>

<script>
export default {
    data: function(){
        return {
            user: {},
            type: "",
            products: {}
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
            }
        })
        .catch(function (error){
            console.log(error);
        });
    },
    methods: {
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
</style>
