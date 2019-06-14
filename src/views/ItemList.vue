<template>
    <div id="app">
        <b-container class="padding">
            <h1>Mi Lista de Productos</h1>
            <hr>
            <b-row v-if="products.length > 0">
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
                        <ui-icon-button color="red" @click="showConfirm('eraseConfirm'); product_to_delete=product._id" icon="delete" style="margin-left:5px;"></ui-icon-button>

                    </b-card>
                </b-col>
                <ui-confirm
                ref="eraseConfirm"
                title="Eliminar Repuesto"
                @confirm="eraseItem"
                confirm-button-icon="delete"
                confirm-button-text="Eliminar"
                deny-button-text="Cancelar"
                type="danger"
                >
                    ¿Seguro que desea eliminar el producto a su lista?
                </ui-confirm>
                <ui-modal ref="product_deleted" title="Felicidades" transition="scale-up">
                    {{modal_msg}}
                </ui-modal>

            </b-row>
            <b-row v-else>
                <h5>Por favor agregue repuestos a su lista...</h5>
            </b-row>
            <hr>
            <h2>Total: L. {{total}}</h2>
            <form action="http://localhost:3000/api/pay" method="POST" v-if="products.length > 0">
                <input class="hide" type="text" name="amount" :value="totalUSD">
                <input class="hide" type="text" name="quantity" :value="cantidad">
                 <ui-button icon="credit_card">Pagar</ui-button>
            </form>
        </b-container>
    </div>
</template>

<script>
export default {
    data: function(){
        return {
            products: "",
            total: 0,
            totalUSD: 0,
            product_to_delete: "",
            modal_msg: ""
        }
    },
    mounted: function(){
        this.carga();
    },
    methods: {
        openModal(ref) {
            this.$refs[ref].open();
        },
        closeModal(ref) {
            this.$refs[ref].close();
        },
        showConfirm(ref) {
        this.$refs[ref].open();
        },
        eraseItem(){
            var vm = this;
            //Validacion superada
            this.axios.post(process.env.VUE_APP_API + 'removeItemList', 
            {
                "product_id" : this.product_to_delete
            },
            {
                headers: {
                "Content-Type"   : "application/json",
                "Authorization"  : localStorage.getItem('token')
                },
            })
            .then(function (response) {
                vm.modal_msg = response.data.msg;
                vm.openModal('product_deleted');
                vm.carga();
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        carga(){
            var vm = this;
            this.axios.get(process.env.VUE_APP_API + 'getList',
                {
                    headers: {
                        "Content-Type"   : "application/json",
                        "Authorization"  : localStorage.getItem('token')
                    }
                })
                .then(function (response) {
                    if (response.data.length > 0){
                        vm.products = response.data;
                        vm.total = 0;
                        response.data.forEach(product => {
                            vm.total += product.price;
                        });
                        vm.totalUSD = (vm.total / 24.5).toFixed(2);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
};
</script>
