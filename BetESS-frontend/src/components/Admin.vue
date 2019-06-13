<template>
  <div>
    <NavbarToOffcanvasAdmin v-if="['calendario'].indexOf($route.name) < 0" ></NavbarToOffcanvasAdmin>
    <Home/>
  </div>
</template>

<script>
import NavbarToOffcanvasAdmin from '../components/NavBarToOffcanvasAdmin'
import Home from '../components/Home'
export default {
  name: 'Admin',
  components: {
    NavbarToOffcanvasAdmin,
    Home
  }
}



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
