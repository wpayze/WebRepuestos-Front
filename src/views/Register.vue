<template>
    <section class="login is-fullheight">
      <div class="login-body">
        <div class="container v-middle">
          <div class="columns login-page">
              <div class="column is-5 login-sidebar is-hidden-mobile">
                <div class="login-gradient-background">
                  <h1>Registro</h1>
                </div>
              </div>
              <div class="column is-7 login-form-wrapper">
                <!-- <div class="column is-12 has-text-right register-btn">
                  <a class="btn" name="button">Register</a>
                </div> -->
                <div class="column is-12 field-box">
                  <div class="column is-7 is-offset-1">
                    <p class="login-subheading">Ingrese sus datos y encuentre lo que necesita rápidamente.</p>
                    <ui-alert @dismiss="error_alert = false" type="error" v-show="error_alert">
                        {{error}}
                    </ui-alert>
                    
                    <form @submit="checkForm">

                        <div class="columns">
                            <div class="column is-6">
                                <ui-textbox
                                floating-label
                                label="Nombre"
                                v-model="first_name"
                                ></ui-textbox>
                            </div>
                            <div class="column is-6">
                                <ui-textbox
                                floating-label
                                label="Apellido"
                                v-model="last_name"
                                ></ui-textbox>
                            </div>
                        </div>
                        <div class="columns">
                            <div class="column is-6">
                                <ui-textbox
                                    icon="email"
                                    floating-label
                                    label="Correo"
                                    v-model="email"
                                ></ui-textbox>
                            </div>
                            <div class="column is-6">
                                <ui-textbox
                                    icon="phone"
                                    floating-label
                                    label="Teléfono"
                                    type="number"
                                    v-model="phone"
                                ></ui-textbox>
                            </div>
                        </div>
                        <div class="columns">
                            <div class="column is-12">
                                <ui-textbox
                                    icon="vpn_key"
                                    floating-label
                                    label="Contraseña"
                                    type="password"
                                    v-model="password"
                                ></ui-textbox>
                            </div>
                        </div>
                        <div class="columns">
                            <div class="column is-6">
                                <ui-textbox
                                    icon="store"
                                    floating-label
                                    label="Empresa"
                                    v-model="company"
                                ></ui-textbox>
                            </div>
                            <div class="column is-6">
                                <label for="">Tipo de Cuenta</label>
                                <div class="select is-info">
                                    <select v-model="type">
                                        <option v-for="t in types" :value="t.value">
                                            {{t.name}}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>

                      <div class="is-grouped is-grouped-centered">
                          <ui-button color="primary" buttonType="submit">Ingresar</ui-button>
                        <!-- <p class="control">
                          <a class="forgot-link" >Forgot Password</a>
                        </p> -->
                      </div>

                    </form>

                  </div>
                </div>
              </div>
          </div>
        </div>
        
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
            error: "",
            config: {
                register: process.env.VUE_APP_REGISTER
            }
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
        this.axios.post(this.config.register, {
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
.login .login-sidebar{
  background:  url('../assets/register.jpg')center center no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.column{
    padding:12px 12px 0 12px;
}
</style>

<style>
.ui-textbox__label-text{
    text-align: left;
}
.login{
  min-height: 100vh;
  background-color: #f7f7f7;
}
.login .login-page{
  height: 100vh;display: flex;align-items: center;
}
.login .login-sidebar, .login-form-wrapper{
  background: #fff;height: 80vh;
}
.login .login-sidebar::before{
  content: '';
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
  z-index: 1;
	background-image: linear-gradient(to bottom right,#21AEA2,#6472A5);
	opacity: .8;
}
.login .login-sidebar .login-gradient-background{
  position: absolute;z-index: 2;
}
.login .login-sidebar .login-gradient-background h1{
  font-size: 2em;font-weight: 600;text-transform: uppercase;color: #ffffff;
}
.login-subheading{
    padding-bottom: 15px;
}
</style>