<template>
  <div>
    <NavbarToOffcanvas v-if="['calendario'].indexOf($route.name) < 0" ></NavbarToOffcanvas>
    
    <div class="container-full">
      <br/>

      <div class="row">
        <div class="col-sm-4 mb-3 mb-md-0">
          <div class="card border-warning">
            <div class="card-body">
              <h5 class="card-title">FCPorto - SLBenfica</h5>
              <h6 class="card-subtitle mb-2 text-muted">Soccer, Primeira Liga</h6>
              <p class="card-text mb-2 text-muted">Possible Gains: 20 ESScoins</p>
              <a href="#!" class="btn btn-outline-warning my-2 my-sm-0">Cashout</a>
            </div>
          </div>
        </div>

        <div class="col-sm-4">
          <div class="card border-warning">
            <div class="card-body">
              <h5 class="card-title">GS Warriors - TOR Raptors</h5>
              <h6 class="card-subtitle mb-2 text-muted">Basketball, EUA - NBA</h6>
              <p class="card-text mb-2 text-muted">Possible Gains: 10 ESScoins</p>
              <a href="#!" class="btn btn-outline-warning my-2 my-sm-0">Cashout</a>
            </div>
          </div>
        </div>
    
        <div class="col-sm-4">
          <div class="card border-warning">
            <div class="card-body">
              <h5 class="card-title">ChelseaFC - ArsenalFC</h5>
              <h6 class="card-subtitle mb-2 text-muted">Soccer, Premier League</h6>
              <p class="card-text mb-2 text-muted">Possible Gains: 12 ESScoins</p> 
              <a href="#!" class="btn btn-outline-warning my-2 my-sm-0">Cashout</a>
            </div>
          </div>
        </div>      
      
      </div>

      <div class="row">
        <div class="col-sm-4">
          <div class="card border-warning">
            <div class="card-body">
              <h5 class="card-title">EvertonFC - ManchesterUFC</h5>
              <h6 class="card-subtitle mb-2 text-muted">Soccer, Premier League</h6>
              <p class="card-text mb-2 text-muted">Possible Gains: 222 ESScoins</p> 
              <a href="#!" class="btn btn-outline-warning my-2 my-sm-0">Cashout</a>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>

</template>

<script>
import NavbarToOffcanvas from '../components/NavBarToOffcanvas'
export default {
  name: 'mybets',
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
  height: 92vh;
  padding: 15px;
}

.card-body {
  color: black
}

.border-warning {
    border-width:3px !important;
}

.col-sm-4 {
  padding: 7px;
}
</style>
