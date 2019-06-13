<template>

  <div>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <NavbarToOffcanvasAdmin v-if="['calendario'].indexOf($route.name) < 0" ></NavbarToOffcanvasAdmin>
    
    <div class="container-full">
      <h3 style="text-align: left;"> Events' Management </h3>
      <hr/>
      


      <div class="container">
        <div class="row">
          <div class="col-12 col-sm-8 col-lg-5" style="min-width: 100%;">
            <ul class="list-group">
              <li class="list-group-item d-flex justify-content-between align-items-center" style="color: gray">
                GS Warriors - TOR Raptors
                <small>Basketball, EUA - NBA</small>
                <button class="button button1" disabled>1.5</button>
                <button class="button button1" disabled>4.5</button>
                <button class="button button1" disabled>2.1</button>
                <p class="text-success" style="padding-top: 15px;"><small>Open</small></p>
                <p style="padding-top: 15px;"><small>No Result</small></p>
                <p class="text-warning" style="padding-top: 15px;"><small>Premium</small></p>
                <button class="btn"><i class="fa fa-times"></i> Delete</button>
                
                <!-- PÔR AQUI UM IF RESULT!= NO RESULT disable close button -->
                <button class="btn" @click="close = true"><i class="fa fa-times"></i> Close</button>
                <span v-if="close">
                  <input style="width: 120px; height: 45px; border: 2px solid orange; border-radius: 5px;"/>
                  <button id="buttonclose" class="btn-xs" v-on:click="close = false"><i class="fa fa-check"></i></button>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  
  </div>
</template>

<script>
import NavbarToOffcanvasAdmin from '../components/NavBarToOffcanvasAdmin'
export default {
  name: 'events',
  data() {
    return {
        close: false
    }
  },
  components: {
    NavbarToOffcanvasAdmin
  }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

hr { display: block; height: 1px;
    border: 0; border-top: 1px solid #ccc;
    margin: 1em 0; padding: 0; }


.container-full { 
  background-color: black;
  margin: 0 auto;
  height: 100%;
  width: 100%;
  background-size: cover;
  overflow: hidden;
  height: 100vh;
  padding-top: 8%;
  padding-left: 10%;
  padding-right: 10%;
}

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

.button {
  background-color: orange;
  border: none;
  color: white;
  padding: 12px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  margin: 3px 0.1px;
}

.button1 {border-radius: 12px;}

#buttonclose {
  border: none;
  background-color: transparent;  
}

.list-group{
    min-height: 400px;
    background-color: white;
    max-height: 400px;
    margin-bottom: 10px;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
}
</style>
