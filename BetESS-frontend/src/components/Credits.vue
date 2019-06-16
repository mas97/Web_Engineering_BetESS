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
          <button type="button" v-on:click="draw()" class="btn btn-submit" style="float:right; margin-bottom:5px; margin-right:-10px; margin-top: 15px;">Submit</button>
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
          <button type="button" class="btn btn-submit" style="float:right; margin-bottom:5px; margin-right:-10px; margin-top: 15px;">Submit</button>
          </div> 
        
        </div>

        <div class="group">
          <label>Current Balance: {{$store.state.login.user.balance}}</label>
        </div>

        <!-- JÁ FECHAM SOZINHOS, O BUTTON FAZ-LOS DESAPARECER -->
        <!-- Era fixe pô-los sempre no canto superior direito em baixo do login -->
        <div class="alert alert-success alert-dismissible fade show" role="alert">
          <strong>Holy guacamole!</strong> You should check in on some of those fields below.
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div class="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>Holy guacamole!</strong> You should check in on some of those fields below.
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>        




    </div>
  </div>
</template>

<script>
import NavbarToOffcanvas from '../components/NavBarToOffcanvas'
export default {
  name: 'credits',
  data () {
    return {
      draw_amount: 0,
      deposit_amount: 0
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
    NavbarToOffcanvas
  }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.btn {
  background: #fff;
  color: #959595;
  border: none;
  padding: 10px 20px;
  border-radius: 3px;
  letter-spacing: 0.06em;
  text-decoration: none;
  outline: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.btn:hover {
  color: #8b8b8b;
  box-shadow: 0 7px 14px rgba(0, 0, 0, 0.18), 0 5px 5px rgba(0, 0, 0, 0.12);
}
.btn.btn-link {
  background: #2196F3;
  color: #d3eafd;
}
.btn.btn-link:hover {
  background: #0d8aee;
  color: #deeffd;
}
.btn.btn-submit {
  background: white;
  color: orange;
  border: solid orange; 
  border-width: 1px 1px 1px 1px;
  float: right;
}
.btn.btn-submit:hover {
  background: orange;
  color: black;
}
.btn.btn-cancel {
  background: #eee;
}
.btn.btn-cancel:hover {
  background: #e1e1e1;
  color: #8b8b8b;
}

.btn-box {
  text-align: center;
  margin: 50px 0;
}



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
