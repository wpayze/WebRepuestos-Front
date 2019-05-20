<template>
  <div id="app">
  
    <nav class="navbar is-link" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/">
          <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
        </router-link>
    
        <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false"
          data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
    
      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">

          <router-link class="navbar-item" to="/" v-if="!user">Inicio</router-link>
          <router-link class="navbar-item" to="/dashboard" v-else>Inicio</router-link>
  
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">Más</a>
    
            <div class="navbar-dropdown">
              <router-link class="navbar-item" to="/about">Acerca</router-link>
              <a class="navbar-item">Contacto</a>
            </div>
          </div>
        </div>
    
        <div class="navbar-end">

          <div class="navbar-item" v-if="!user">
            <div class="buttons">
              <router-link class="button is-info" to="/register">Registro</router-link>
              <router-link class="button is-light" to="/login">Ingresar</router-link>
            </div>
          </div>

          <div class="navbar-item has-dropdown is-hoverable" v-else>
            <a class="navbar-link" style="min-width:180px;">{{this.user.first_name}} {{this.user.last_name}}</a>
    
            <div class="navbar-dropdown">
              <router-link class="navbar-item" to="/profile">Perfil</router-link>
              <a class="navbar-item" @click="logout">Cerrar Sesión</a>
            </div>
          </div>

          </div>

        </div>
    </nav>

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
      user: {}
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
@import "~bulma/css/bulma.css";
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  font-size: 100%;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
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

</style>
