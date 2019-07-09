<template>
    <div id="app">
        <b-container class="padding">
            <h1>Mi Lista de Productos</h1>
            <hr>
            <b-row v-if="products.length > 0">
                <b-col md="12" v-for="product in products" style="margin-bottom:1em;">
                    <b-card
                    >
                    <p class="title-vendor" style="display:inline-block;">Vendedor: {{product.seller.first_name}} {{product.seller.last_name}}</p>
                    <router-link :to="'/profile/'+product.seller._id" style="margin-left:5px;">
                        <ui-icon-button size="small" color="primary" icon="remove_red_eye"></ui-icon-button>
                    </router-link>
                    <b-row>
                        
                        <b-col md="3" v-for="prod in product.products" class="wow fadeInUp">
                            <b-card
                            :title="prod.name"
                            :img-src="prod.img"
                            img-alt="Image"
                            img-top
                            tag="article"
                            style="max-width: 20rem;"
                            class="mb-2"
                            >
                                <b-card-text>
                                {{prod.description.substring(0,50)}}...
                                
                                <b-row>
                                    <b-col class="location">
                                        {{prod.location}}
                                        <br>
                                        {{prod.quantity}} disponibles.
                                    </b-col>
                                    <b-col class="price">
                                        L. {{prod.price}}
                                    </b-col>
                                </b-row>

                                </b-card-text>
                                
                                <b-row>
                                    <b-col md="4">
                                        <label style="font-size:12px;">Cantidad</label>
                                    </b-col>
                                    <b-col md="8">
                                        <input @change="updateTotal()" v-model="prod.qty_sale" min="1" :max="prod.quantity" type="number" class="form-control" style="height: 30px;margin-bottom: 5px;">
                                    </b-col>
                                </b-row>

                                <router-link :to="'/product/'+prod._id">
                                    <ui-icon-button color="primary" icon="remove_red_eye"></ui-icon-button>
                                </router-link>
                                <ui-icon-button color="red" @click="showConfirm('eraseConfirm'); product_to_delete=prod._id" icon="delete" style="margin-left:5px;"></ui-icon-button>

                            </b-card>
                        </b-col>
                        </b-row>

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
                <input class="hide" type="text" name="quantity" value="1">
                <input class="hide" type="text" name="sale_id" v-model="sale_id">
                <ui-button @click="createSale" icon="credit_card" color="primary">Pagar</ui-button>
                <button class="hide" type="submit" id="submitPaypal"></button>
                <br><br>
                <img style="width:300px;" src="https://cdn.shopify.com/s/files/1/1813/3161/t/15/assets/trust.png?17077343378658693986" alt="">
            </form>
        </b-container>

    </div>
</template>

<style scoped>
.title-vendor{
    font-size: 25px;
}
</style>


<script>
export default {
    data: function(){
        return {
            products: "",
            total: 0,
            totalUSD: 0,
            product_to_delete: "",
            modal_msg: "",
            reduction: [],
            sale_id: ""
        }
    },
    mounted: function(){
        this.cargaInicial();
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
        async createSale(e){
            e.preventDefault();

            var {data: sale} = await this.axios.post(process.env.VUE_APP_SALE, 
            {
                "list" : this.products,
                "amount" : this.total,
                "reduction" : {}
            },
            {
                headers: {
                "Content-Type"   : "application/json",
                "Authorization"  : localStorage.getItem('token')
                },
            });

            this.sale_id = sale._id;
            setTimeout(()=>{
                document.getElementById("submitPaypal").click();
            },1000);
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
                            product.products.forEach(product2 => {
                                vm.total += product2.price;
                            });
                        });
                        vm.totalUSD = (vm.total / 24.5).toFixed(2);
                    } else {
                        vm.products = [];
                        vm.total = 0;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        updateTotal(){
            this.total=0;
            this.products.forEach(product => {
                product.products.forEach(product2 => {
                    this.total += product2.price * product2.qty_sale;
                });
            });
        },
        cargaInicial(){
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
                            product.products.forEach(product2 => {
                                vm.total += product2.price;
                            });
                        });
                        vm.totalUSD = (vm.total / 24.5).toFixed(2);

                        /*response.data.forEach(item => {
                            item.products.forEach(it => {
                                var string = it._id.toString();
                                vm.reduction[string] = 1;
                            });
                        });*/

                    } else {
                        vm.products = [];
                        vm.total = 0;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

};
</script>
