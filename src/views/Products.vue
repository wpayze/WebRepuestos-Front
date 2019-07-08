<template>
    <div class="container padding">
        <div class="row">
            <ui-alert @dismiss="success = false" type="success" v-show="success">
                {{msg_success}}
            </ui-alert>
            
            <div class="col-md-6"><h1>Mis Productos</h1></div>
            <div class="col-md-6"><ui-button color="primary" @click="erase();openModal('createProduct');" icon="add">Agregar</ui-button></div>
        </div>
        <hr>

        <b-row>
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
                    {{product.description}}
                    
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
                    
                    <ui-icon-button @click="updateForm(product._id)" color="orange" icon="edit" style="margin-left:2px;"></ui-icon-button>
                    <ui-icon-button @click="showConfirm('eraseConfirm'); product_to_delete=product._id" color="red" icon="delete"  style="margin-left:2px;"></ui-icon-button>
                    <!-- <router-link :to="'/product/'+product._id" style="margin-left: 5px;">
                        <ui-icon-button color="primary" icon="edit"></ui-icon-button>
                    </router-link> -->
                </b-card>
            </b-col>
        </b-row>

    <ui-modal ref="createProduct" title="Nuevo Repuesto">
        <ui-alert @dismiss="error_alert = false" type="error" v-show="error_alert">
          {{error}}
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

        <b-row>
            <b-col>
                <ui-textbox label="Precio" type="number" v-model="price"></ui-textbox>
            </b-col>
            <b-col>
                <label for="cats">Categoría</label>
                <select v-model="category" id="cats" class="form-control category">
                    <option v-for="cat in categories" :value="cat._id">{{cat.name}}</option>
                </select>
            </b-col>
        </b-row>
        
        <b-row>
            <b-col>
                <ui-textbox label="Existencias" type="number" v-model="quantity"></ui-textbox>
            </b-col>
            <!-- <b-col>
                <ui-switch v-model="is_active">
                    Producto Activo
                </ui-switch>
            </b-col> -->
        </b-row>
        
        <ui-fileupload @change="addImage"  color="primary" name="foto_repuesto">Subir Imagen</ui-fileupload>
        <br>
        <ui-button color="primary" @click="checkForm('create')">Guardar Producto</ui-button>
    </ui-modal>

    <ui-modal ref="editProduct" title="Editar Repuesto">
        <!-- <ui-alert @dismiss="error_alert = false" type="error" v-show="error_alert">
          {{error}}
        </ui-alert> -->

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

        <b-row>
            <b-col>
                <ui-textbox label="Precio" type="number" v-model="price"></ui-textbox>
            </b-col>
            <b-col>
                <label for="cats">Categoría</label>
                <select v-model="category" id="cats" class="form-control category">
                    <option v-for="cat in categories" :value="cat._id">{{cat.name}}</option>
                </select>
            </b-col>
        </b-row>
        
        <b-row>
            <b-col>
                <ui-textbox label="Existencias" type="number" v-model="quantity"></ui-textbox>
            </b-col>
            <!-- <b-col>
                <ui-switch v-model="is_active">
                    Producto Activo
                </ui-switch>
            </b-col> -->
        </b-row>
        
        <ui-fileupload @change="addImage" color="primary" name="foto_repuesto">Subir Imagen</ui-fileupload>
        <br>
        <ui-button color="primary" @click="checkForm('update')">Guardar Producto</ui-button>
    </ui-modal>

    <ui-confirm
    ref="eraseConfirm"
    title="Eliminar Repuesto"
    @confirm="eraseItem"
    confirm-button-icon="delete"
    confirm-button-text="Eliminar"
    deny-button-text="Cancelar"
    type="danger"
    >
        ¿Seguro que desea eliminar el repuesto?
    </ui-confirm>

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
            msg_success: "",
            category: "",
            categories: "",
            quantity: 1,
            image: "",
            id_product_edit: "",
            product_to_delete: "",
            user: ""
        }
    },
    mounted(){
        this.categories = JSON.parse(localStorage.getItem("categories"));
        this.user = JSON.parse(localStorage.getItem("user"));

        this.category = this.categories[0]._id;
        var vm = this;
        this.axios.get(process.env.VUE_APP_PRODUCTS + '/' + this.user._id,
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
        addImage(event){
            this.image = event[0];
        },
        erase(){
            this.name = "";
            this.description = "";
            this.location = "";
            this.price = "";
            this.is_active = false;
        },
        checkForm(type){
            this.error="";
            this.error_alert = false;

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
                is_active: 1,
                category_id: this.category,
                quantity: this.quantity,
                img: ""
            }
            
            let formData = new FormData();
            formData.append('image', this.image);
            //Validacion superada

            if (type == "create"){
                if (this.image){
                    var vm = this;
                    this.axios.post(process.env.VUE_APP_UPLOAD_IMAGE, formData,
                    {
                        headers: {
                        "Content-Type"   : "application/json",
                        "Authorization"  : localStorage.getItem('token')
                        },
                    })
                    .then(function (response) {
                        
                        if (response.data.success){
                            datos.img = process.env.VUE_APP_SERVER + 'images/' + response.data.url;
                        }

                        vm.addProduct(datos);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                }else {
                   this.addProduct(datos); 
                }
                
            } else if (type == "update"){

                if (this.image){
                    var vm = this;
                    this.axios.post(process.env.VUE_APP_UPLOAD_IMAGE, formData,
                    {
                        headers: {
                        "Content-Type"   : "application/json",
                        "Authorization"  : localStorage.getItem('token')
                        },
                    })
                    .then(function (response) {
                        
                        if (response.data.success){
                            datos.img = process.env.VUE_APP_SERVER + 'images/' + response.data.url;
                        }

                        vm.update(datos);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                }else {
                   this.update(datos);
                }
            }
            

        },
        getProducts(){
            var vm = this;
            this.axios.get(process.env.VUE_APP_PRODUCTS + '/' + this.user._id,
            {
                headers: {
                    "Content-Type"   : "application/json",
                    "Authorization"  : localStorage.getItem('token')
                },
            })
            .then(function (response) {
                vm.products = response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        addProduct(datos){
            
            var vm = this;
            this.axios.post(process.env.VUE_APP_PRODUCT, datos,
            {
                headers: {
                "Content-Type"   : "application/json",
                "Authorization"  : localStorage.getItem('token')
                },
            })
            .then(function (response) {
                
                if (response.data.success){
                    vm.msg_success = response.data.msg;
                    vm.success = true;
                    vm.getProducts();

                    vm.name = "";
                    vm.description = "";
                    vm.location = "";
                    vm.price = "";
                    vm.is_active = false;
                    vm.image = false;
                    
                    vm.closeModal('createProduct');
                    
                }else{
                    vm.error = response.data.msg;
                    vm.error_alert = true;
                }
                
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        updateForm(id){
            var vm = this;

            this.axios.get(process.env.VUE_APP_PRODUCT+'/'+id, 
            {
                headers: {
                    "Content-Type"   : "application/json",
                    "Authorization"  : localStorage.getItem('token')
                }
            })
            .then(function(response){
                vm.name = response.data.name;
                vm.description = response.data.description;
                vm.location = response.data.location;
                vm.price = response.data.price;
                vm.category = response.data.category_id;
                vm.quantity = response.data.quantity;
                vm.id_product_edit = id;
                vm.openModal('editProduct');
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        update(datos){
            var vm = this;
            this.axios.post(process.env.VUE_APP_PRODUCT + '/update/' + this.id_product_edit, 
            datos,
            {
                headers: {
                "Content-Type"   : "application/json",
                "Authorization"  : localStorage.getItem('token')
                },
            })
            .then(function (response) {
                if (response.data.success){
                    vm.msg_success = response.data.msg;
                    vm.success = true;
                    vm.getProducts();

                    vm.name = "";
                    vm.description = "";
                    vm.location = "";
                    vm.price = "";
                    vm.is_active = false;
                    vm.image = false;
                    
                    vm.closeModal('editProduct');
                    
                }else{
                    vm.error = response.data.msg;
                    vm.error_alert = true;
                }
                
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        eraseItem(){
            var vm = this;
            this.axios.delete(process.env.VUE_APP_PRODUCT + '/' + this.product_to_delete, 
            {
                headers: {
                "Content-Type"   : "application/json",
                "Authorization"  : localStorage.getItem('token')
                },
            })
            .then(function (response) {
                if (response.data.success){
                    vm.msg_success = response.data.msg;
                    vm.success = true;
                    vm.getProducts();

                    vm.name = "";
                    vm.description = "";
                    vm.location = "";
                    vm.price = "";
                    vm.is_active = false;
                }else{
                    vm.error = response.data.msg;
                    vm.error_alert = true;
                }
                
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }
    
}
</script>

