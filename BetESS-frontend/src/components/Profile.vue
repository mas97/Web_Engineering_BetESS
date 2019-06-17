<template>
  <div>
    
    <NavbarToOffcanvas v-if="['calendario'].indexOf($route.name) < 0" ></NavbarToOffcanvas>
    <div class="container-full">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">  

      <h3 style="text-align: left;"> Your Profile </h3>
      <hr/>

      <article class="cssui-usercard">
        <div class="cssui-usercard__body">

          <header class="cssui-usercard__header">
            <img src="../assets/avatar.png" class="cssui-usercard__avatar" alt="Avatar">
            <div class="cssui-usercard__header-info">
              <h3 class="cssui-usercard__name">a<span class="cssui-usercard__name-label"></span></h3>
              <span class="cssui-usercard__post">BetESS Member - a</span>
            </div>
          </header>
          <div class="cssui-usercard__content">
            <div class="cssui-slider">

              <div class="cssui-slider__slides">

                <!-- first slide -->

                <div class="cssui-slider__slide">
                  <div class="cssui-usercard__stats">
                    <div class="cssui-stats cssui-usercard__stats-item">
                      <i class="cssui-icon icon-earth"></i>
                      <div class="cssui-stats__info cssui-usercard__stats-info">
                        <span class="cssui-stats__name cssui-usercard__stats-name">Username</span>
                        <span class="cssui-stats__value"><small>a</small></span>
                      </div>
                    </div>

                    
                    <div class="cssui-stats cssui-usercard__stats-item">
                      <i class="cssui-icon icon-location"></i>
                      <div class="cssui-stats__info cssui-usercard__stats-info">
                        <span class="cssui-stats__name cssui-usercard__stats-name">Email</span>
                        <span class="cssui-stats__value"><small>a</small></span>
                      </div>

                    </div>
                    <div class="cssui-stats cssui-usercard__stats-item">
                      <i class="cssui-icon icon-calendar"></i>
                      <div class="cssui-stats__info cssui-usercard__stats-info">
                        <span class="cssui-stats__name cssui-usercard__stats-name">Phone number<button style="font-size:15px" @click="pn = !pn"><i class="fa fa-pencil"></i></button></span>
                          <span v-if="pn" class="cssui-stats__value"><small>a</small></span>
                          <div v-else>
                            
                            <input v-model="new_phone" style="width: 120px; height: 45px; border: 2px solid orange; border-radius: 5px;"/>
                            <button class="btn-xs" v-on:click="upd_phone(), pn = true"><i class="fa fa-check"></i></button>
                          </div>
                      </div>
                    </div>  

                    <div class="cssui-stats cssui-usercard__stats-item">
                      <i class="cssui-icon icon-man-woman"></i> 
                      <div class="cssui-stats__info cssui-usercard__stats-info">
                        <span class="cssui-stats__name cssui-usercard__stats-name">Password<button style="font-size:15px" @click="pwd = !pwd"><i class="fa fa-pencil"></i></button></span>
                        <span v-if="pwd" class="cssui-stats__value"><small>**********</small></span>
                          <div v-else>
                            <input v-model="new_pwd" style="width: 120px; height: 45px; border: 2px solid orange; border-radius: 5px;"/>
                            <button type="button" class="btn-xs" v-on:click="upd_pwd(),pwd = true"><i class="fa fa-check"></i></button>
                          </div>
                      </div>
                    </div> 

                    <div class="cssui-stats cssui-usercard__stats-item">
                      <i class="cssui-icon icon-man-woman"></i> 
                      <div class="cssui-stats__info cssui-usercard__stats-info">
                        <span class="cssui-stats__name cssui-usercard__stats-name">Balance</span>
                        <span class="cssui-stats__value"><small>a</small></span>
                      </div>
                    </div>

                    <!-- botão upgrade SE nao premim, visto SE premium -->
                    <!-- SE premium, apagar texto -->
                    <div class="cssui-stats cssui-usercard__stats-item">
                      <i class="cssui-icon icon-man-woman"></i> 
                      <div class="cssui-stats__info cssui-usercard__stats-info">
                        <span class="cssui-stats__name cssui-usercard__stats-name">Premium?</span>
                        
                        
                        <div>
                          <mdb-btn class="btn btn-outline-warning my-2 my-sm-0" @click.native="modal = true">Upgrade</mdb-btn>
                          <mdb-modal removeBackdrop side position="top-right" :show="modal" @close="modal = false">
                              <mdb-modal-header>
                                  <mdb-modal-title>Upgrade to Premium</mdb-modal-title>
                              </mdb-modal-header>
                              <mdb-modal-body>Are you sure you want to upgrade? </mdb-modal-body>
                              <mdb-modal-footer>
                                  <mdb-btn color="secondary" @click.native="modal = false">Close</mdb-btn>
                                  <mdb-btn class="btn btn-warning my-2 my-sm-0" style="margin:10px;" v-on:click="upd_premium(); modal = false;">Save changes</mdb-btn>
                              </mdb-modal-footer>
                          </mdb-modal>
                        </div>                           
                        
                        
                        
                        <!-- <button type="button" class="btn btn-warning my-2 my-sm-0" v-on:click="upd_premium()" style="margin:10px;">Upgrade</button> -->
                        <h6 style="color:gray;"><small> * being a premium user gives you access to unique events and opportunities, by the simple amount of 50 ESScoins</small></h6>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>




    </div>
  </div>
</template>

<script>
import { mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter, mdbBtn } from 'mdbvue';
import NavbarToOffcanvas from '../components/NavBarToOffcanvas'
export default {
  name: 'profile',
  data() {
    return {
        modal: false,
        /* Vars apenas para controlo de botoes dinamicos */
        pn: true,
        pwd: true,
        /* Vars de input (novo número de telefone e nova password) */
        new_phone: '',
        new_pwd: ''
    }
  },
  created () {
    this.$store.dispatch('login/getUser').then((response) => {
      // console.log(JSON.stringify(response))
    })
  },
  methods: {
    upd_pwd () {
      this.$store.dispatch('login/upd_pwd', {
         password: this.new_pwd
      }).then((response) => {
        console.log(response)
      })
    },
    upd_phone () {
      this.$store.dispatch('login/upd_phone', {
         phoneno: this.new_phone
      }).then((response) => {
        console.log(response)
      })
    },
    upd_premium() {
      this.$store.dispatch('login/upd_premium', {

      }).then((response) => {
        console.log(response)
      })
    }
  },
  components: {
    NavbarToOffcanvas,
    mdbModal,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbModalFooter,
    mdbBtn
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
  overflow: auto;
}

hr { display: block; height: 1px;
    border: 0; border-top: 1px solid #ccc;
    margin: 1em 0; padding: 0; }



/* ------------ user card ------------ */

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

.cssui-usercard{
  box-sizing: border-box;
  display: flex;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
  flex-direction: column;
  background-color: #fff;  
  margin: 2rem auto 1rem;
  position: relative;
  z-index: 5;
}

@media screen and (min-width: 641px){

  .cssui-usercard{
    width: 38rem;
  }
}

@media screen and (max-width: 640px){

  .cssui-usercard{
    width: 90%;
  }
}

.cssui-usercard__body{
  padding-bottom: 2rem;
  flex-grow: 2;
  color: #000;
}

.cssui-usercard__header{
  padding: 3rem 5% 2rem;
  display: flex;
  align-items: center;
  background-image: linear-gradient(to bottom, rgb(192, 189, 189), gray);
  color: #fff;  
}

.cssui-usercard__avatar{
  border-radius: 50%;
  border: 4px solid #fff;
  box-sizing: border-box;
  margin-right: 4%;
  width: 10rem;
  height: 10rem;
}

.cssui-usercard__name{
  font-size: 3.5rem;
  font-weight: 300;
  margin-top: 0;  
  margin-bottom: 0;  
}

.cssui-usercard__name-label{
  font-weight: 700;
}

.cssui-usercard__post{
  display: block;
}

.cssui-usercard__title{
  padding: 0 5% 1.5rem;
  margin-top: 0;
  margin-bottom: 3rem;
  font-size: 2.4rem;
  font-weight: 300;
  color: #fff;  
  background-color: orange;  
}

.cssui-stats{
  box-sizing: border-box;
  font-size: 1.4rem;
}

.cssui-stats__name, .cssui-stats__value{
  display: block;
  word-break: break-all;
}

.cssui-stats__value{
  text-decoration: none;
  color: inherit;
  margin-top: .2em;
}

.cssui-usercard__stats{
  padding-right: 4%;
  padding-left: 4%;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
}

.cssui-usercard__stats-item{
  width: 48%;
  margin-top: 3rem;
}

.cssui-usercard__stats-item:first-child,
.cssui-usercard__stats-item:nth-child(2){
  margin-top: 0;
}

.cssui-usercard__stats-info{
  margin-top: .7rem;
}

.cssui-usercard__stats-name{
  font-weight: 700;
  font-size: 1.6rem;
}


.cssui-icon{
  width: 2em;
  height: 2em;
  display: inline-block;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: contain;
}

.cssui-social{
  display: inline-block;
  vertical-align: middle;
  position: relative;
  overflow: hidden;
}

.cssui-social__name{
  position: absolute;
  left: -9999px;
}

.cssui-usercard__social{
  margin-right: 1.6rem;
  font-size: .8rem;
}

.cssui-usercard__social:last-child{
  margin-right: 0;
}

.cssui-slider{
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  height: 37rem;
}

.cssui-slider__slides{
  height: 100%;
  transform: translate3d(0, 0, 0);
  transition: transform .4s;  
}

.cssui-slider__slide{
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;  
}

.cssui-slider__slide:nth-of-type(1){
  left: 0;
}

.cssui-slider__slide:nth-of-type(2){
  left: 100%;
}

.cssui-slider__slide:nth-of-type(3){
  left: 200%;
}

.cssui-usercard__switch{
  position: absolute;
  top: 0;
  left: -9999px;
}

.cssui-slider__switch:nth-of-type(1):checked ~ .cssui-slider__slides{
  transform: translate3d(0%, 0, 0);
}

.cssui-slider__switch:nth-of-type(2):checked ~ .cssui-slider__slides{
  transform: translate3d(-100%, 0, 0);
}

.cssui-slider__switch:nth-of-type(3):checked ~ .cssui-slider__slides{
  transform: translate3d(-200%, 0, 0);
}

.cssui-usercard__switch:checked + .cssui-slider__control:before{
  transform: scale(0.7) translateZ(0);
}


/*
* demo styles
*/

@media screen and (min-width: 981px){

  html{
    font-size: 62.5%;
  }
}

@media screen and (min-width: 641px) and (max-width: 980px){

  html{
    font-size: 9px;
  }
}

@media screen and (max-width: 640px){

  html{
    font-size: 8px;
  }
}

body{
  font-family: "Roboto", "Arial", sans-serif;
  font-size: 1.6rem;
  color: #fff;
  margin: 0;
  min-height: 100vh;
  overflow-x: hidden;
  background-image: linear-gradient(29deg, #512DA8 50%, #673AB7 50%);
}

a{
  color: inherit;
  text-decoration: none;
}



.melnik909{
  margin-left: 2rem;
}

button {
  border: none;
  background-color: transparent;
}

</style>
