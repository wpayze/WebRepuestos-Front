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
                </b-col>
                <b-col md="3" class="center">
                    <h5>Vendedor: </h5>
                    <p>{{seller.first_name}} {{seller.last_name}}</p>
                    <router-link :to="'/profile/'+seller._id"><ui-button color="primary">Ver Perfil</ui-button></router-link>
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
            seller: ""   
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
</style>
