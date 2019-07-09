<template>
    <div id="app">
        <b-container class="padding">
            <h1>PAGO RECIBIDO EXITOSAMENTE</h1>
            <p>El vendedor ha recibido su pedido y le contactará pronto.</p>
            <p>ID de la compra: {{id_compra}} </p>
            <p>ID de la orden: {{id_orden}} </p>
            <router-link to="/dashboard">
                <ui-button color="primary">Ir a Inicio</ui-button>
            </router-link>
            
        </b-container>
    </div>
</template>

<script>
export default {
    mounted() {
        this.axios.get(process.env.VUE_APP_API + 'clearItemList',
        {
            headers: {
            "Content-Type"   : "application/json",
            "Authorization"  : localStorage.getItem('token')
            },
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });

        var url_str = window.location.href;
        var url_string = url_str.replace("/#", "");
        var url = new URL(url_string);

        url.searchParams.get("paymentId") ? this.id_compra = url.searchParams.get("paymentId") : this.id_compra = "0" ;
        url.searchParams.get("order") ? this.id_orden = url.searchParams.get("order") : this.id_compra = "0" ;

        this.axios.get(process.env.VUE_APP_SALE + '/' + this.id_orden,
        {
            headers: {
            "Content-Type"   : "application/json",
            "Authorization"  : localStorage.getItem('token')
            }
        }).then(({data: response})=>{
            response.list.forEach(detail => {
                detail.products.forEach(product => {
                   this.axios.get(process.env.VUE_APP_PRODUCT + '/' + product._id + '/' + product.qty_sale,
                    {
                        headers: {
                        "Content-Type"   : "application/json",
                        "Authorization"  : localStorage.getItem('token')
                        }
                    });
                });
            });
        })
        .catch(function (error) {
            console.log(error);
        });;

        this.axios.get(process.env.VUE_APP_SALE + '/activate/'+this.id_orden,
        {
            headers: {
            "Content-Type"   : "application/json",
            "Authorization"  : localStorage.getItem('token')
            }
        });

    },
    data: function(){
        return {
            id_compra: "",
            id_orden: ""
        }
    }
}

</script>
