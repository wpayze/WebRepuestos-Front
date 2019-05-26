<template>
    <section class="login">
      <br>
      <div class="form container">
        <ui-alert @dismiss="error_alert = false" type="error" v-show="error_alert">
          {{error}}
        </ui-alert>

        <h2>Iniciar Sesión</h2>
        <p>Ingresa tus datos y empieza a navegar entre cientos de repuestos.</p>

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
            error: ""
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
        this.axios.post(process.env.VUE_APP_LOGIN, 
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
/* eslint-disable */
section{
  background: url('../assets/background.png');
  min-height: 100vh;
}

.form {
  background: #fff;
  width: 30%; 
}

</style>

