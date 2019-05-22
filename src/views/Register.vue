<template>
    <section class="register">
        <br>
        <div class="form container">
            <ui-alert @dismiss="error_alert = false" type="error" v-show="error_alert">
                {{error}}
            </ui-alert>

            <h2>Registro</h2>
            <p>Bienvenido, ingresa tus datos para crear una nueva cuenta.</p>

            <form @submit="checkForm">
                <b-row>
                    <b-col>
                        <ui-textbox
                        floating-label
                        label="Nombre"
                        v-model="first_name"
                        ></ui-textbox>
                    </b-col>
                    <b-col>
                        <ui-textbox
                        floating-label
                        label="Apellido"
                        v-model="last_name"
                        ></ui-textbox>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <ui-textbox
                        icon="email"
                        floating-label
                        label="Correo"
                        v-model="email"
                        ></ui-textbox>
                    </b-col>
                    <b-col>
                        <ui-textbox
                        icon="phone"
                        floating-label
                        label="Teléfono"
                        type="number"
                        v-model="phone"
                        ></ui-textbox>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <ui-textbox
                        icon="vpn_key"
                        floating-label
                        label="Contraseña"
                        type="password"
                        v-model="password"
                        ></ui-textbox>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <ui-textbox
                        icon="store"
                        floating-label
                        label="Empresa"
                        v-model="company"
                        ></ui-textbox>
                    </b-col>
                    <b-col>
                        <label for="">Tipo de Cuenta</label>
                        <div class="select is-info">
                            <select class="form-control" v-model="type">
                                <option v-for="t in types" :value="t.value">
                                    {{t.name}}
                                </option>
                            </select>
                        </div>
                    </b-col>
                </b-row>
                <br>
                <ui-button color="primary" buttonType="submit">Crear Cuenta</ui-button>
                <!-- <p class="control">
                    <a class="forgot-link" >Forgot Password</a>
                </p> -->
            </form>

        </div>
  </section>
</template>

<script>

import router from '@/router.js';

export default {
/* eslint-disable */
    data: function(){
        return {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            company: "",
            type: "1",
            phone: "",
            types: 
            [
                {
                    "name" : "Comprador",
                    "value" : 1
                },
                {
                    "name" : "Vendedor",
                    "value" : 2
                },
                {
                    "name" : "Técnico",
                    "value" : 3
                }
            ],
            error_alert: false,
            error: ""
        }
    },
    methods: {
        checkForm: function(e){
        e.preventDefault();
        
        this.error = "";
        if (!this.email || !this.password || !this.first_name || !this.last_name) {
            this.error = "Por favor completar los campos requeridos.";
        } else if (!this.validEmail(this.email)) {
            this.error = 'Por favor ingresar un email válido.';
        }

        if (this.error) {
            this.error_alert = true;
            return false;
        }

        //Validacion superada
        this.axios.post(process.env.VUE_APP_REGISTER, {
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
            password: this.password,
            phone: this.phone,
            company: this.company,
            type: this.type
        })
        .then(function (response) {
            if (response.data.success == true){
                router.push('/login');
            }
        })
        .catch(function (error) {
            console.log(error);
        });

        },
        validEmail: function(email){
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }
    }
}
</script>

<style scoped>
section{
  background: #78afed;
  min-height: 100vh;
}

.form {
  background: #fff;
  width: 45%;
}
</style>