<template>
    <div id="app">
        <b-container class="padding">
            <h1>PAGO RECIBIDO EXITOSAMENTE</h1>
            <p>El vendedor ha recibido su pedido y le contactará pronto.</p>
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
    }
}

</script>
