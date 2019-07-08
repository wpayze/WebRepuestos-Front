<template>
  <div id="app">

    <div>
      <b-navbar toggleable="lg" type="dark" variant="primary">
        <b-navbar-brand to="/">REON</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
              <b-nav-form>

                <select v-model="category" class="category form-control search-nav">
                  <option v-for="cat in categories" :value="cat._id">{{cat.name}}</option>
                </select>

                <b-form-input v-model="search_input" class="search-nav" size="sm" placeholder="Buscar"></b-form-input>

                <b-button size="sm" class="my-2 my-sm-0 boton-nav search-nav" @click="search()">Buscar</b-button>
              </b-nav-form>
  
              <!-- <b-nav-item v-if="!user" to="/">Inicio</b-nav-item> -->
              <b-nav-item to="/dashboard">Inicio</b-nav-item>

            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
              <!-- <img v-if="user" class="miniatura" src="https://pbs.twimg.com/profile_images/846659478120366082/K-kZVvT8_400x400.jpg" alt=""> -->
              <b-nav-item-dropdown v-if="user" :text="user.first_name" right>
                <b-dropdown-item :to="'/profile/'+user._id"><ui-icon icon="account_circle"></ui-icon> Perfil</b-dropdown-item>

                <b-dropdown-item v-if="user.type == 1" to="/itemList"><ui-icon icon="list_alt"></ui-icon> Lista de Repuestos</b-dropdown-item>
                <b-dropdown-item v-if="user.type == 2" to="/products"><ui-icon icon="build"></ui-icon> Mis Repuestos</b-dropdown-item>

                <b-dropdown-item @click="logout"><ui-icon icon="power_settings_new"></ui-icon> Cerrar Sesión</b-dropdown-item>
              </b-nav-item-dropdown>

              <b-button size="sm" v-if="!user" to="/register" class="my-2 my-sm-0 boton-nav">Registro</b-button>
              <b-button size="sm" v-if="!user" to="/login" class="my-2 my-sm-0 boton-nav">Ingresar</b-button>

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
      categories: "",
      category: "",
      nombre: "",
      categories: [],
      search_input: ""
    }
  },
  beforeMount: function(){
    this.validation();
    this.loadCategories();
  },
  beforeUpdate: function(){
    this.validation();
    console.log('beforeU');
  },
  methods: {
    logout: function() {
      localStorage.clear();
      router.push('/');
      location.reload();
    },
    validation: function(){
      if (localStorage.getItem("user")) {
        this.user = JSON.parse(localStorage.getItem("user"));
      }else{
        this.user = null;
      }
    },
    loadCategories: function(){
      var vm = this;
      this.axios.get(process.env.VUE_APP_CATEGORY,
      {
          headers: {
              "Content-Type"   : "application/json",
              "Authorization"  : localStorage.getItem('token')
          }
      })
      .then(function (response) {
        localStorage.setItem('categories', JSON.stringify(response.data));
        vm.categories = response.data;
        vm.category = vm.categories[0]._id;
      })
      .catch(function (error) {
          console.log(error);
      });
    },
    search: function(){
      if (this.search_input.trim() != "")
      {
        router.push('/');
        router.push('search/'+this.search_input+'/'+this.category);
        this.search_input = "";
        setTimeout(function(){ location.reload() }, 100);
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
.category{
  height: calc(1.5em + 0.5rem + 2px)!important;
  
}
.card-title{
    text-align: left;
    font-size: 14px;
}
.card-text{
    text-align: left;
    font-size: 12px;
}
.price{
    font-size:16px;
}
.hide{
  display:none;
}
.boton-nav{
  background:#344055!important;
  border:none!important;
  color:#fff;
  margin-right: 10px;
}
.card-img-top{
  max-width: 100%;
  max-height: 100%;
  
  height: 215px;

  object-fit: contain;
}
.search-nav{
  height: 32px!important;
  border-radius: 0px!important;
  border:none!important;
}
</style>
