<template>
    <div id="app">
    <br>
    <div style="text-align:center;">
        <ui-button onclick="this.style.display ='none';window.print();" color="primary" icon="print">Imprimir</ui-button>
    </div>
    
    <div class="invoice-box">
        <table cellpadding="0" cellspacing="0">
            <tr class="top">
                <td colspan="2">
                    <table>
                        <tr>
                            <td class="title">
                                REON
                            </td>
                            
                            <td>
                                Factura #: {{order.number}}<br>
                                Creada: {{date}}<br>
                                Vence: {{date}}
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            
            <tr class="information">
                <td colspan="2">
                    <table>
                        <tr>
                            <td>
                                REON, Inc.<br>
                                Res. Villas del Bosque<br>
                                San Pedro Sula, Cortés. 
                            </td>
                            
                            <td>
                                Inversiones Paiz<br>
                                Wilfredo Paiz<br>
                                info@reon.pro
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            
            <tr class="heading">
                <td>
                    Método de Pago
                </td>
                
                <td>
                    ID Orden
                </td>
            </tr>
            
            <tr class="details">
                <td>
                    PayPal
                </td>
                
                <td>
                    {{order._id}}
                </td>
            </tr>

            <tr class="top">
                <td colspan="2">
                    <table style="table-layout: fixed;">
                        <tr class="heading" style="padding-bottom:0;" >
                            <!-- <td>
                                Vendedor
                            </td> -->
                            <td style="text-align: center!important;">
                                Cantidad
                            </td>
                            <td style="text-align: center!important;">
                                Descripción
                            </td>
                            <td style="text-align: center!important;">
                                Precio Unitario
                            </td>
                            <td style="text-align: center!important;">
                                Desc. y Reb. Otorgados
                            </td>
                            <td style="text-align: center!important;">
                                Total
                            </td>
                        </tr>

                        <tr class="item" v-for="product in products">
                            <td style="text-align:center!important;">
                                {{product.qty_sale}}
                            </td>
                            <td style="text-align:center!important;">
                                {{product.name}}
                            </td>
                            <td style="text-align:center!important;"> 
                                L. {{product.price.toFixed(2)}}
                            </td>
                            <td style="text-align:center!important;"> 
                                L. 0.00
                            </td>
                            <td style="text-align:center!important;"> 
                                L. {{(product.qty_sale * product.price).toFixed(2) }}
                            </td>
                        </tr>
                        
                        <tr v-if="user.type == 1" class="total">
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td style="text-align: center;">
                            <strong>Total: L. {{order.amount}}</strong>
                            </td>
                        </tr>

                    </table>
                </td>
            </tr>
            
            
        </table>
    </div>


    </div>
</template>

<script>
export default {
    data: function(){
        return {
            order: [],
            date: "",
            products: [],
            taxes: "",
            user: ""
        }
    },
    mounted: function(){
        this.cargaInicial();
        this.user = JSON.parse(localStorage.getItem("user"));
    },
    methods: {
        cargaInicial() {
            var vm = this;
            console.log(localStorage.getItem('token'));
            this.axios.get(process.env.VUE_APP_SALE + '/' + this.$route.params.id,
            {
                headers: {
                    "Content-Type"   : "application/json",
                    "Authorization"  : localStorage.getItem('token')
                }
            })
            .then(function (response) {

                vm.order = response.data;
                vm.date = new Date(vm.order.createdAt).toDateString();

                vm.order.list.forEach(detail => {
                    detail.products.forEach(product => {
                        vm.products.push(product);
                    });
                });
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }
}
</script>

<style scoped>
.invoice-box {
        max-width: 800px;
        margin: auto;
        margin-top: 1em;
        padding: 30px;
        border: 1px solid #eee;
        box-shadow: 0 0 10px rgba(0, 0, 0, .15);
        font-size: 16px;
        line-height: 24px;
        font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
        color: #555;
    }
    
    .invoice-box table {
        width: 100%;
        line-height: inherit;
        text-align: left;
    }
    
    .invoice-box table td {
        padding: 5px;
        vertical-align: top;
    }
    
    .invoice-box table tr td:nth-child(2) {
        text-align: right;
    }
    
    .invoice-box table tr.top table td {
        padding-bottom: 20px;
    }
    
    .invoice-box table tr.top table td.title {
        font-size: 45px;
        line-height: 45px;
        color: #333;
    }
    
    .invoice-box table tr.information table td {
        padding-bottom: 40px;
    }
    
    .invoice-box table tr.heading td {
        background: #eee;
        border-bottom: 1px solid #ddd;
        font-weight: bold;
    }
    
    .invoice-box table tr.details td {
        padding-bottom: 20px;
    }
    
    .invoice-box table tr.item td{
        border-bottom: 1px solid #eee;
    }
    
    .invoice-box table tr.item.last td {
        border-bottom: none;
    }
    
    .invoice-box table tr.total td:nth-child(2) {
        border-top: 2px solid #eee;
        font-weight: bold;
    }
    
    @media only screen and (max-width: 600px) {
        .invoice-box table tr.top table td {
            width: 100%;
            display: block;
            text-align: center;
        }
        
        .invoice-box table tr.information table td {
            width: 100%;
            display: block;
            text-align: center;
        }
    }
    
    /** RTL **/
    .rtl {
        direction: rtl;
        font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
    }
    
    .rtl table {
        text-align: right;
    }
    
    .rtl table tr td:nth-child(2) {
        text-align: left;
    }

    @media print {
    .invoice-box {
        background-color: white;
        height: 100%;
        width: 100%!important;
        position: fixed;
        top: 0;
        left: 0;
        margin: 0;
        padding: 15px;
        font-size: 14px;
        line-height: 18px;
    }
}
</style>
