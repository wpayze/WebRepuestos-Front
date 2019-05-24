<template>
  <div id="app">

    <div>
      <b-navbar toggleable="lg" type="dark" variant="primary">
        <b-navbar-brand to="/">Reon</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
              <b-nav-form>
                <b-form-input size="sm" class="mr-sm-2" placeholder="Buscar"></b-form-input>
                <b-button size="sm" class="my-2 my-sm-0" type="submit">Buscar</b-button>
              </b-nav-form>
  
              <b-nav-item v-if="!user" to="/">Inicio</b-nav-item>
              <b-nav-item v-else to="/dashboard">Inicio</b-nav-item>

            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">

              <img v-if="user" class="miniatura" src="https://pbs.twimg.com/profile_images/846659478120366082/K-kZVvT8_400x400.jpg" alt="">
              <b-nav-item-dropdown v-if="user" :text="user.first_name" right>
                <b-dropdown-item :to="'/profile/'+user._id"><ui-icon icon="account_circle"></ui-icon> Perfil</b-dropdown-item>

                <b-dropdown-item v-if="user.type == 1" to="/profile"><ui-icon icon="list_alt"></ui-icon> Lista de Repuestos</b-dropdown-item>
                <b-dropdown-item v-if="user.type == 2" to="/products"><ui-icon icon="build"></ui-icon> Mis Repuestos</b-dropdown-item>

                <b-dropdown-item @click="logout"><ui-icon icon="power_settings_new"></ui-icon> Cerrar Sesión</b-dropdown-item>
              </b-nav-item-dropdown>

              <b-button size="sm" v-if="!user" to="/register" class="my-2 my-sm-0">Registro</b-button>
              <b-button size="sm" v-if="!user" to="/login" class="my-2 my-sm-0">Ingresar</b-button>

            </b-navbar-nav>
          </b-collapse>

      </b-navbar>
    </div>

    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
    
  </div>
</template>

<script>
import router from "@/router.js";

export default {
  data: function(){
    return {
      user: {},
      nombre: ""
    }
  },
  beforeMount: function(){
    this.validation();
  },
  beforeUpdate: function(){
    this.validation();
  },
  methods: {
    logout: function() {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      router.push('/');
      location.reload();
    },
    validation: function(){
      if (localStorage.getItem("user")) {
        this.user = JSON.parse(localStorage.getItem("user"));
      }else{
        this.user = null;
      }
    }
  }
}
</script>


<style>

*,
*::before,
*::after {
  box-sizing: border-box;
}

html,body {
  font-size: 100%;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}

.ui-textbox__label-text{
  text-align: left!important;
}

.form{
  padding: 25px;
  border-radius: 0.5em;
}
.padding{
  padding:1em;
}
.margin{
  margin:1em;
}
.miniatura{
  width:40px;
  height: 100%;
}
.center{
  text-align: center;
}
</style>
