<template>
    <b-container class="padding">
        <b-row>
            <b-col md="3" class="categories">
                  <b-nav vertical class="categorias">
                    <b-nav-item v-for="cat in categories" :to="'/category_products/'+cat._id">{{cat.name}}</b-nav-item>
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
            query: "",
            products: ""
        }
    },
    mounted: function(){
        this.carga();
    },
    methods: {
        carga: function(){
            this.categories = JSON.parse(localStorage.getItem('categories'));
            this.query = {
                name: this.$route.params.name,
                category_id: this.$route.params.category_id
            };
            
            var vm = this;

            this.axios.post(process.env.VUE_APP_PRODUCT + "/search", 
            this.query,
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
