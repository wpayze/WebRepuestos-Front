<template>
  <div id="app">
    <div id="showcase">
      <div class="text">
        <h1 class="wow bounceIn">El repuesto que necesitas</h1>
        <h2 class="wow bounceIn">En poco tiempo</h2>
      </div>
      
    </div>

    <b-container>
      <b-row class="features center wow fadeInUp">
        <b-col class="feature">
          <ui-icon icon="schedule"></ui-icon>
          <h2>Ahorra tiempo</h2>
          <p>Navegua entre cientos de repuestos hasta encontrar el que necesitas, rápidamente.</p>
        </b-col>
        <b-col class="feature">
          <ui-icon icon="verified_user"></ui-icon>
          <h2>Plataforma Segura</h2>
          <p>Descubre vendedores y técnicos certificados para dar solución a tus reparaciones.</p>
        </b-col>
        <b-col class="feature">
          <ui-icon icon="desktop_mac"></ui-icon>
          <h2>En la Nube</h2>
          <p>Acceda desde cualquier dispositivo y desde cualquier lugar.</p>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
/*import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    HelloWorld
  }
};*/
</script>

<style scoped>
#showcase {
  width: 100%;
  height: 50vh;
  background-image: url("../assets/showcase.jpg");
  display: table;
}

.ui-icon{
  font-size: 100px;
  color:#fff;
}

.features{
  padding: 1em;
}

.feature{
  background: #2880e3;
  color: #fff;
  border-radius: 1em;
  margin: 1em;
  padding:1em;
}
.vertical-center {
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
.text{
  display: table-cell;
    vertical-align: middle;
    text-align: center;
    color:#fff;
    background: rgb(0,0,0,0.3)
}

.text h1{
  font-size:40px;
}
</style>
