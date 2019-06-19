<template>
  <div>
    <NavbarToOffcanvas v-if="['calendario'].indexOf($route.name) < 0" ></NavbarToOffcanvas>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <div class="container-full">
      
      <h3 style="text-align: left;"> Credits Management </h3>
      <hr/>

        <div class="row" style="background-color: white; border-style:solid; border-color: orange; margin-bottom:10px; margin-left:6px; margin-right:6px;">
          <div class="col-md" style="border-right: 3px solid gray">
            <div class="container" style="padding: 16px; border-style: none;">
              <h3 style="text-align: left; color: gray"> Draw </h3>
              <br/>
              <div class="group"> <!-- se desse, punhamos o max para o saldo q ele tivesse -->
                <input type="number" v-model="draw_amount" required="required" min="1"/><span class="highlight"></span><span class="bar"></span>
                <label>Insert the amount to draw:</label>
              </div>
            </div>
          <h6 style="color:gray;"><small>* The amount will be returned to your bank account.</small></h6>


            <div>
              <mdb-btn class="btn btn-outline-warning my-2 my-sm-0" style="float:right; margin-bottom:5px; margin-right:-10px; margin-top: 15px;" @click.native="modalDraw = true">Submit</mdb-btn>
              <mdb-modal removeBackdrop side position="top-right" :show="modalDraw" @close="modalDraw = false">
                  <mdb-modal-header style="color:gray;">
                      <mdb-modal-title>Draw</mdb-modal-title>
                  </mdb-modal-header>
                  <mdb-modal-body style="color:gray;">Are you sure you want to draw this amount to your bank account?</mdb-modal-body>
                  <mdb-modal-footer>
                      <mdb-btn color="secondary" @click.native="modalDraw = false">Close</mdb-btn>
                      <mdb-btn class="btn btn-warning my-2 my-sm-0" v-on:click="draw(); modalDraw = false;">Save changes</mdb-btn>
                  </mdb-modal-footer>
              </mdb-modal>
            </div>  
          <!-- <button type="button" v-on:click="draw()" class="btn btn-submit" style="float:right; margin-bottom:5px; margin-right:-10px; margin-top: 15px;">Submit</button> -->
          </div>


          <div class="col-md">
            <div class="container" style="padding: 16px; border-style: none;">
              <h3 style="text-align: left; color: gray"> Deposit </h3>
              <br/>
              <div class="group"> 
                <input type="number" v-model="deposit_amount" required="required" min="1"/><span class="highlight"></span><span class="bar"></span>
                <label>Insert the amount to deposit:</label>
              </div>
            </div>
          <h6 style="color:gray;"><small>* The amount will be withdrawn from your bank account.</small></h6>
          
          
            <div>
              <mdb-btn class="btn btn-outline-warning my-2 my-sm-0" style="float:right; margin-bottom:5px; margin-right:-10px; margin-top: 15px;" @click.native="modal = true">Submit</mdb-btn>
              <mdb-modal removeBackdrop side position="top-right" :show="modal" @close="modal = false">
                  <mdb-modal-header style="color:gray;">
                      <mdb-modal-title>Deposit</mdb-modal-title>
                  </mdb-modal-header>
                  <mdb-modal-body style="color:gray;">Are you sure you want to deposit this amount to BetESS?</mdb-modal-body>
                  <mdb-modal-footer>
                      <mdb-btn color="secondary" @click.native="modal = false">Close</mdb-btn>
                      <mdb-btn class="btn btn-warning my-2 my-sm-0" v-on:click="deposit(), modal = false;">Save changes</mdb-btn>
                  </mdb-modal-footer>
              </mdb-modal>
            </div>            
          
          
          <!-- <button type="button" class="btn btn-submit" style="float:right; margin-bottom:5px; margin-right:-10px; margin-top: 15px;">Submit</button> -->
          </div>         
        </div>

        <div class="group">
          <label>Current Balance: {{$store.state.login.user.balance}}</label>
        </div>
    </div>
  </div>
</template>


<script>
import { mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter, mdbBtn } from 'mdbvue';
import NavbarToOffcanvas from '../components/NavBarToOffcanvas'
export default {
  name: 'credits',
  data () {
    return {
      modal: false,
      modalDraw: false,
      draw_amount: '',
      deposit_amount: ''
    }
  },
  created () {
    this.$store.dispatch('login/getUser').then((response) => {
      // console.log(JSON.stringify(response))
    })
  },
  methods: {
    draw () {
      this.$store.dispatch('login/draw', {
         balance: this.draw_amount
      }).then((response) => {
        console.log(response)
      })
    },
    deposit () {
      this.$store.dispatch('login/deposit', {
         balance: this.deposit_amount
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

.alignleft {
	float: left;
}
.alignright {
	float: right;
}

.card-body {
  color: black
}

.col-sm-4 {
  padding: 7px;
}

.border-warning {
    border-width:3px !important;
}

*,
:before,
:after {
  box-sizing: border-box;
}

body {
  background: #424242;
}

form {
  width: 320px;
  margin: 45px auto;
}
form h1 {
  font-size: 3em;
  font-weight: 300;
  text-align: center;
  color: orange;
}
form h5 {
  text-align: center;
  text-transform: uppercase;
  color: #c6c6c6;
}

.group {
  position: relative;
  margin: 0px 0;
}

textarea {
  resize: none;
}

input,
textarea {
  background: none;
  color: black;
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 320px;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid #c6c6c6;
}
input:focus,
textarea:focus {
  outline: none;
}
input:focus ~ label, input:valid ~ label,
textarea:focus ~ label,
textarea:valid ~ label {
  top: -14px;
  font-size: 12px;
  color: orange;
}
input:focus ~ .bar:before,
textarea:focus ~ .bar:before {
  width: 320px;
}

input[type="password"] {
  letter-spacing: 0.3em;
}

label {
  color: #6b6b6b;
  font-size: 16px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 300ms ease all;
}

.bar {
  position: relative;
  display: block;
  width: 320px;
}
.bar:before {
  content: '';
  height: 2px;
  width: 0;
  bottom: 0px;
  position: absolute;
  background: orange;
  transition: 300ms ease all;
  left: 0%;
}
</style>
