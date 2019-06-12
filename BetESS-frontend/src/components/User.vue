<template>
  <div>
    <NavbarToOffcanvas v-if="['calendario'].indexOf($route.name) < 0" ></NavbarToOffcanvas>
    <Home/>

    
  </div>
</template>

<script>
import NavbarToOffcanvas from '../components/NavBarToOffcanvas'
import Home from '../components/Home'
export default {
  name: 'user',
  components: {
    NavbarToOffcanvas,
    Home
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>



</style>
