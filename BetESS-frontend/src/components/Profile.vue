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
  name: 'profile',
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

/*
usar no html dps
 <form>
  Telephone:
  <input type="tel" name="phone" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}">
</form> 

*/
</style>
