<template>
  <div id="app">
     <router-view/>
  </div>
</template>


<script>
// import User from './components/User.vue'
export default {
  name: 'App',
  components: {
    // User
  }
}
</script> 

<style>
html {
  min-height: 100%;
}

body {
  padding-top: 0px;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: rgba(255, 255, 255, 0.459);
  /*background-color: black;*/
}
</style>
