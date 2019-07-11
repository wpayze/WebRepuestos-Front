<template>
    <b-container class="padding">
        <b-row>
            <b-col md="3" class="categories">
                  <b-nav vertical class="categorias">
                    <b-nav-item class="cat-item" v-for="cat in categories" @click="reload" :to="'/category_products/'+cat._id">{{cat.name}}</b-nav-item>
                </b-nav>
            </b-col>
            <b-col>
                <b-row>
                    <b-col sm="4" v-if="products" v-for="product in products">
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
                                <ui-icon-button color="primary" icon="remove_red_eye"></ui-icon-button>
                            </router-link>
                        </b-card>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
    data: function(){
        return {
            categories: [],
            products: ""
        }
    },
    mounted: function(){
        this.carga();
    },
    methods: {
        carga: function(){
            this.categories = JSON.parse(localStorage.getItem('categories'));
            
            var vm = this;

            this.axios.get(process.env.VUE_APP_PRODUCTS_CATEGORY + "/"+this.$route.params.category_id,
            {
                headers: {
                    "Content-Type"   : "application/json",
                    "Authorization"  : localStorage.getItem('token')
                }
            })
            .then(function (response) {
                if (response.data.length > 0){
                    vm.products = response.data;
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        reload: function(){
            location.reload();
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
