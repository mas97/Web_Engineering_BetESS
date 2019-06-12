<template>
  <div>
    <NavbarToOffcanvas v-if="['calendario'].indexOf($route.name) < 0" ></NavbarToOffcanvas>
    <div class="container-full">

    </div>
  </div>
</template>

<script>
import NavbarToOffcanvas from '../components/NavBarToOffcanvas'
export default {
  name: 'notifications',
  components: {
    NavbarToOffcanvas
  }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.container-full { 
  background-color: black;
  margin: 0 auto;
  height: 100%;
  width: 100%;
  background-size: cover;
  overflow: hidden;
  height: 95vh;
}

</style>
