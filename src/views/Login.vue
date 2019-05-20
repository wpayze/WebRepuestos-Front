<template>
    <section class="login is-fullheight">
      <div class="login-body">
        <div class="container v-middle">
          <div class="columns login-page">
              <div class="column is-5 login-sidebar is-hidden-mobile">
                <div class="login-gradient-background">
                  <h1>Inicio de Sesión</h1>
                </div>
              </div>
              <div class="column is-7 login-form-wrapper">
                <!-- <div class="column is-12 has-text-right register-btn">
                  <a class="btn" name="button">Register</a>
                </div> -->
                <div class="column is-12 field-box">
                  <div class="column is-7 is-offset-1">
                    <h1 class="login-heading">Bienvenido</h1>
                    <p class="login-subheading">Por favor ingresar con sus datos.</p>
                    <ui-alert @dismiss="error_alert = false" type="error" v-show="error_alert">
                        {{error}}
                    </ui-alert>
                    
                    <form @submit="checkForm">

                      <div class="field">
                        <ui-textbox
                            icon="email"
                            floating-label
                            label="Correo"
                            placeholder="Ingrese su correo"
                            name="email"
                            v-model="email"
                        ></ui-textbox>
                      </div>

                      <div class="field">
                        <ui-textbox
                            icon="vpn_key"
                            floating-label
                            label="Contraseña"
                            type="password"
                            placeholder="Ingrese su contraseña"
                            name="password"
                            v-model="password"
                        ></ui-textbox>
                      </div>

                      <div class="field is-grouped is-grouped-centered login-btn-group">
                        <p class="control">
                          <ui-button color="primary" buttonType="submit">Ingresar</ui-button>
                        </p>
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
import router from "@/router.js";

export default {
/* eslint-disable */
    data: function(){
        return {
            email: "",
            password: "",
            error_alert: false,
            error: "",
            config: {
                login: process.env.VUE_APP_LOGIN
            }
        }
    },
    methods: {
        checkForm: function(e){
        e.preventDefault();
        
        this.error = "";
        this.error_alert = false;

        if (!this.email || !this.password) {
            this.error = "Por favor completar ambos campos.";
        } else if (!this.validEmail(this.email)) {
            this.error = 'Por favor ingresar un email válido.';
        }

        if (this.error) {
            this.error_alert = true;
            return false;
        }

        var vm = this;

        //Validacion superada
        this.axios.post(this.config.login, 
        {
            email: this.email,
            password: this.password
        },
        {
            headers: {"Content-Type" : "application/json"}
        })
        .then(function (response) {

            if (response.data.success == true){
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                router.push('dashboard');
            } else {
                vm.error = response.data.msg;
                vm.error_alert = true;
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
  background:  url('https://images.pexels.com/photos/926390/pexels-photo-926390.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260')center center no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
</style>


<style>
/* eslint-disable */
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

.login-form-wrapper .register-btn a{
  color: #ffffff;border-radius: 18px;padding: 0.57em 2em;background: #21AEA2;
}
.login-form-wrapper .register-btn a:hover{
  opacity: .8;
}
.field-box .field{margin-bottom: 2.1em;}
.login-form-wrapper .field-box{
  display: flex;
  height: 80%;
  align-items: center;
}
.login-form-wrapper .field-box .login-heading{
  font-size: 1.95em;
}
.login-form-wrapper .field-box .login-subheading{
  margin-bottom: 2em;font-size: 0.85em;color: #787877;
}

.login-form-wrapper .field-box .login-btn-group .login-btn{
  background: #6472A5;color: #ffffff;border-radius: 18px;padding: 0.57em 2em;
}
.login-form-wrapper .field-box .login-btn-group .forgot-link{
  color: #777777;font-size: 0.85em;
}
.login-form-wrapper .field-box .login-btn-group .forgot-link:hover{
  color: #444444;font-size: 0.85em;
}
</style>

