<template>
    <div class="container padding">
        <div class="row">
            <div class="col-md-6"><h1>Mis Productos</h1></div>
            <div class="col-md-6"><ui-button color="primary" @click="openModal('createProduct')" icon="add">Agregar</ui-button></div>
        </div>
        <hr>

        <b-row>
            <b-col sm="3" v-if="products" v-for="product in products">
                  <b-card
                    :title="product.name"
                    img-src="https://picsum.photos/600/300/?image=25"
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

                    <b-button href="#" variant="primary">Go somewhere</b-button>
                </b-card>
            </b-col>
        </b-row>
    
    <ui-modal ref="createProduct" title="Nuevo Repuesto">
        <ui-alert @dismiss="error_alert = false" type="error" v-show="error_alert">
          {{error}}
        </ui-alert>
        <ui-alert @dismiss="success = false" type="success" v-show="success">
            {{msg_success}}
        </ui-alert>

        <ui-textbox label="Nombre" v-model="name"></ui-textbox>
        <ui-textbox
                enforce-maxlength
                help="Máximo 256 carácteres"
                label="Descripción"
                :multi-line="true"
                :maxlength="256"
                v-model="description"
            ></ui-textbox>
        <ui-textbox label="Dirección" v-model="location"></ui-textbox>
        <ui-textbox label="Precio" type="number" v-model="price"></ui-textbox>
        <ui-switch v-model="is_active">
            Producto Activo
        </ui-switch>
        <ui-fileupload color="primary" name="foto_repuesto">Subir Imagen</ui-fileupload>
        <br>
        <ui-button color="primary" @click="checkForm()">Guardar Producto</ui-button>
    </ui-modal>
    
    </div>
</template>

<script>
export default {
    data: function(){
        return {
            products: [],
            name: "",
            description: "",
            location: "",
            price: "",
            is_active: false,
            error: "",
            error_alert: false,
            success: false,
            msg_success: ""
        }
    },
    mounted(){
        this.axios.get(process.env.VUE_APP_PRODUCT,
            {
                headers: {
                    "Content-Type"   : "application/json",
                    "Authorization"  : localStorage.getItem('token')
                },
            })
            .then(function (response) {
                if (response.data.length > 0){
                    console.log(response.data);
                    this.products = response.data;
                    
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    },
    methods: {
        openModal(ref) {
            this.$refs[ref].open();
        },
        closeModal(ref) {
            this.$refs[ref].close();
        },
        checkForm(){
            if (this.name == "" || this.price == ""){
                this.error = "Por favor completar los campos requeridos.";
                this.error_alert = true;
                return false;
            }

            this.is_active = this.is_active ? 1 : 0;

            var datos = {
                name: this.name,
                description: this.description,
                location: this.location,
                price: this.price,
                is_active: this.is_active
            }

            //Validacion superada
            this.axios.post(process.env.VUE_APP_PRODUCT, datos,
            {
                headers: {
                "Content-Type"   : "application/json",
                "Authorization"  : localStorage.getItem('token')
                },
            })
            .then(function (response) {

                if (response.data.success){
                    this.msg_success = response.data.msg;
                    this.success = true;
                    getProducts();
                }else{
                    this.error = response.data.msg;
                    this.error_alert = true;
                    console.log(this.error);
                }
                
            })
            .catch(function (error) {
                console.log(error);
            });

        },
        getProducts(){
            this.axios.get(process.env.VUE_APP_PRODUCT,
            {
                headers: {
                    "Content-Type"   : "application/json",
                    "Authorization"  : localStorage.getItem('token')
                },
            })
            .then(function (response) {
                this.products = response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }
    
}
</script>

<style scoped>

</style>
