<template>
  <div id="app" class="container-fluid mt-3">
    <div class="jumbotron">
      <h1>TP4 Vue.js CLI</h1>
      <br>
      <Navbar />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navbar from "./componentes/Navbar.vue"

export default {
  name: 'App',
  components: {
    Navbar,
  }
}
</script>

<style>

h2{
  color: whitesmoke;
}

#app {

}

.jumbotron {
  padding: 32px !important;
}

hr{
  background-color: whitesmoke;
}

label{
  color: whitesmoke;
}

p{
  color: whitesmoke;
}
</style>
