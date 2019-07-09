<template>
    <div id="app">
        <b-container class="padding">
            <h1>Mis Órdenes</h1>
            <hr>
            <b-row>
                <b-col md="12" v-for="order in orders" class="orden">
                    <b-row>
                        <b-col>
                            <p>ID Orden: {{order._id}}</p>
                            <p>Total: L. {{order.amount.toFixed(2)}}</p>
                            <p>Creada el: {{order.createdAt}}</p>
                        </b-col>
                        <b-col>
                            <router-link :to="'/invoice/'+order._id">
                                <ui-button color="primary" icon="print">Factura</ui-button>
                            </router-link>
                        </b-col>
                    </b-row>
                    
                    <hr>
                    <div v-for="detail in order.list">
                        <p>Vendedor: {{detail.seller.first_name}} {{detail.seller.last_name}}</p>

                            <table class="table" v-if="detail.products">
                                <tr>
                                    <th>Nombre</th>
                                    <th>Cantidad</th>
                                    <th>Precio</th>
                                </tr>
                                <tr v-for="product in detail.products">
                                    <td>{{product.name}}</td>
                                    <td>{{product.qty_sale}}</td>
                                    <td>L. {{product.price.toFixed(2)}}</p></td>
                                </tr>

                            </table>
                    </div>
                    
                </b-col>
            </b-row>

            
        </b-container>
    </div>
</template>

<script>
export default {
    data: function(){
        return {
            orders: []
        }
    },
    mounted: function(){
        this.cargaInicial();
    },
    methods: {
        cargaInicial() {
            var vm = this;
            this.axios.get(process.env.VUE_APP_SALE,
            {
                headers: {
                    "Content-Type"   : "application/json",
                    "Authorization"  : localStorage.getItem('token')
                }
            })
            .then(function (response) {
                if (response.data.length > 0){
                    vm.orders = response.data;
                    vm.orders = vm.orders.reverse();
                } else {
                    vm.orders = [];
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
.orden{
    border: 1px #000 solid;
    margin:1em;
    background:#e6f3fe;
    padding:1em;
    border-radius: 1em;
    text-align: justify;
}
</style>
