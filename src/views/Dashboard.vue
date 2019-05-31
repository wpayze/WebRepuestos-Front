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
                    <b-nav-item v-for="cat in categories" @click="reload" :to="'/category_products/'+cat._id">{{cat.name}}</b-nav-item>
                </b-nav>
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
            categories: []
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
