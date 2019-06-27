<template>
    <b-container class="padding">
        <hooper style="height: 400px">
            <slide style="text-align:center;">
                <img src="https://img2.freepng.es/20180606/qi/kisspng-car-auto-repuestos-f1-c-a-logo-vehicle-calle-aranj-repuestos-5b17de991f46b2.1919347415282909691281.jpg" alt="">
            </slide>
            <slide>
                <img src="https://i.pinimg.com/originals/8c/fd/a5/8cfda53547fe9d32942be6c7ea5dce19.jpg" alt="">
            </slide>
            <hooper-navigation slot="hooper-addons"></hooper-navigation>
        </hooper> 

        <b-row>
            <b-col md="3" class="categories">
                  <b-nav vertical class="categorias">
                    <b-nav-item v-for="cat in categories" :to="'/category_products/'+cat._id">{{cat.name}}</b-nav-item>
                </b-nav>
            </b-col>
            <b-col sm="3" v-if="products && index <= 2" v-for="(product,index) in products">
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
                        {{product.description.substring(0,50)}}...
                        
                        <b-row>
                            <b-col class="location">
                                {{product.location}}
                                <br>
                                {{product.quantity}} disponibles.
                            </b-col>
                            <b-col class="price">
                                L. {{product.price}}
                            </b-col>
                        </b-row>

                        </b-card-text>

                        <router-link :to="'/product/'+product._id">
                            <ui-icon-button color="primary" icon="remove_red_eye"></ui-icon-button>
                        </router-link>
                    </b-card>
                </b-col>
        </b-row> 
    </b-container>
</template>

<script>
import {
  Hooper,
  Slide,
  Navigation as HooperNavigation 
  } from 'hooper';
    import 'hooper/dist/hooper.css';


export default {
    data: function(){
        return {
            user: {},
            categories: [],
            products: {}
        }
    },
    components: {
    Hooper,
    Slide,
    HooperNavigation
    },
    mounted: function(){
        this.user = JSON.parse(localStorage.getItem('user'));
        this.categories = JSON.parse(localStorage.getItem('categories'));
        this.carga();
        console.log(this.products);
    },
    methods: {
        carga: function(){
            var vm = this;
            console.log(process.env.VUE_APP_PRODUCT);
            this.axios.get(process.env.VUE_APP_PRODUCT,
                {
                    headers: {
                        "Content-Type"   : "application/json",
                        "Authorization"  : localStorage.getItem('token')
                    }
                })
                .then(function (response) {
                    console.log(response);
                    console.log(response.data);
                    if (response.data.length > 0){
                        vm.products = response.data;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
}
</script>

<style scoped>
    .categorias{
        background: #047AFC;
        border-radius: 1em;
    }

    .categorias li a{
        color: #fff;
    }
</style>
