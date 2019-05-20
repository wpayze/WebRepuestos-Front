<template>
  <div id="app">
    <div id="showcase">
      <!-- <h1>El repuesto que necesita</h1>
      <h2>En poco tiempo</h2> -->
    </div>

    <div class="columns features">
      <div class="column">
        <ui-icon icon="schedule"></ui-icon>
        <h2>Ahorre tiempo</h2>
        <p>Navegue entre cientos de repuestos hasta encontrar el que usted necesita rápidamente.</p>
      </div>
      <div class="column">
        <ui-icon icon="verified_user"></ui-icon>
        <h2>Plataforma Segura</h2>
        <p>Descubra vendedores y técnicos certificados para dar solución a sus reparaciones.</p>
      </div>
      <div class="column">
        <ui-icon icon="desktop_mac"></ui-icon>
        <h2>En la Nube</h2>
        <p>Acceda desde cualquier dispositivo y desde cualquier lugar.</p>
      </div>
    </div>
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
}

.ui-icon{
  font-size: 100px;
  color:#fff;
}

.features{
  margin-top: 1em;
}
.features .column{
  background:#2ca081;
  border-radius: 1em;
  margin: 0 50px;
  padding: 1em;
}
.features .column h2{
  color: #fff;
  font-size:18px;
}
.features .column p{
  color:#fff;
  font-size:14px;
}
</style>
