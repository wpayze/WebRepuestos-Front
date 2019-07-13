<template>
    <b-container class="padding">
        <hooper style="height: 400px">
            <slide>
                <img src="https://i.pinimg.com/originals/8c/fd/a5/8cfda53547fe9d32942be6c7ea5dce19.jpg" alt="">
            </slide>
            <slide style="text-align:center;">
                <img src="http://www.italika.com.hn/ItalikaLAM/imgTemplate/Honduras/SLIDE/11.jpg" alt="">
            </slide>
            <slide style="text-align:center;">
                <img src="https://cdn-az.allevents.in/banners/5e41bbb0-eab0-11e8-9aa1-3dda9c965bad-rimg-w720-h265-dce0e0e0-gmir.jpg" alt="">
            </slide>
            
            <slide style="text-align:center;">
                <img style="max-width:70%;" src="https://autorepuestos.hn/wp-content/uploads/2017/12/productos_web.jpg" alt="">
            </slide>
            <hooper-navigation slot="hooper-addons"></hooper-navigation>
        </hooper> 
        <b-row>
            <b-col md="3">

            </b-col>
            <b-col md="9" style="margin-top: 5px;">
                <h2>Productos Destacados</h2>
            </b-col>
        </b-row>
        
        <b-row> 
            <b-col md="3" class="categories">
                  <b-nav vertical class="categorias">
                    <b-nav-item class="cat-item" v-for="cat in categories" :to="'/category_products/'+cat._id">{{cat.name}}</b-nav-item>
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
        background: #344054;
    }

    .categorias li a{
        color: #fff;
    }

    .cat-item{
        border: 1px #fff solid;
        transition: 0.2s ease-in;
    }
    .cat-item:hover{
        background: #047AFC;
    }
</style>
