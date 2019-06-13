<template>

  <div>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <NavbarToOffcanvas v-if="['calendario'].indexOf($route.name) < 0" ></NavbarToOffcanvas>
    
    <div class="container-full">
      <h3 style="text-align: left;"> Your notifications </h3>
      <hr/>
      


      <div class="container">
        <div class="row">
          <div class="col-12 col-sm-8 col-lg-5" style="min-width: 100%;">
            <ul class="list-group">
              <li class="list-group-item d-flex justify-content-between align-items-center" style="color: gray">
                  <div class="image-parent">
                    <figure>
                      <img src="../assets/envelope-closed.png" class="img-fluid" alt="quixote">
                      <figcaption><small>2 min</small></figcaption>
                    </figure>
                </div>
                FCPorto - SLBenfica
                <small>Soccer, Primeira Liga</small>
                <p class="text-success" style="padding-top: 15px;"><small>Balance: 360</small></p>
                <button class="btn"><i class="fa fa-check"></i> mark as seen</button>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center" style="color: gray">
                  <div class="image-parent">
                    <figure>
                      <img src="../assets/envelope-closed.png" class="img-fluid" alt="quixote">
                      <figcaption><small>5 h</small></figcaption>
                    </figure>
                </div>
                GS Warriors - TOR Raptors
                <small>Basketball, EUA - NBA</small>
                <p class="text-success" style="padding-top: 15px;"><small>Balance: 320</small></p>
                <button class="btn"><i class="fa fa-check"></i> mark as seen</button>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center disabled" style="color: gray">
                  <div class="image-parent">
                    <figure>
                      <img src="../assets/envelope-open.png" class="img-fluid" alt="quixote">
                      <figcaption><small>3 dias</small></figcaption>
                    </figure>
                </div>
                GS Warriors - TOR Raptors
                <small>Basketball, EUA - NBA</small>
                <p class="text-danger" style="padding-top: 15px;"><small>Balance: 250</small></p>
                <button class="btn"><i class="fa fa-check"></i> seen</button>
              </li>
            </ul>
          </div>
        </div>
      </div>

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
  height: 100vh;
  padding-top: 8%;
  padding-left: 18%;
  padding-right: 18%;
}

hr { display: block; height: 1px;
    border: 0; border-top: 1px solid #ccc;
    margin: 1em 0; padding: 0; }

body{
  padding: 2rem 0rem;
}
.image-parent {
  max-width: 40px;
}
 /* Style buttons */
.btn {
  background-color: gray; /* Blue background */
  border: none; /* Remove borders */
  color: white; /* White text */
  padding: 12px 16px; /* Some padding */
  font-size: 16px; /* Set a font size */
  cursor: pointer; /* Mouse pointer on hover */
}

/* Darker background on mouse-over */
.btn:hover {
  background-color: orange !important;
} 

.list-group{
    min-height: 400px;
    background-color: white;
    max-height: 400px;
    margin-bottom: 10px;
    ooverflow: auto;
    -webkit-overflow-scrolling: touch;
}
</style>
