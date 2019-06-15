<template>

  <div>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <NavbarToOffcanvasAdmin v-if="['calendario'].indexOf($route.name) < 0" ></NavbarToOffcanvasAdmin>
    
    <div class="container-full">



        <div style="width: 25%; float:left">
            <div class="wrapper">
              <form>
              <h3 style="text-align: left;"> Create Event: </h3>

                <div class="group">
                  <b-dropdown id="dropdown-1" size="sm" text="Select League" class="m-md-2">
                    <b-dropdown-item>First Action</b-dropdown-item>
                    <b-dropdown-item>Second Action</b-dropdown-item>
                    <b-dropdown-item>Third Action</b-dropdown-item>
                  </b-dropdown>

                  <b-dropdown id="dropdown-1" size="sm" text="Select Sport" class="m-md-2">
                    <b-dropdown-item>First Action</b-dropdown-item>
                    <b-dropdown-item>Second Action</b-dropdown-item>
                    <b-dropdown-item>Third Action</b-dropdown-item>
                  </b-dropdown>
                </div>

                <div class="group">
                  <input type="number" required="required" min="1"/><span class="highlight"></span><span class="bar"></span>
                  <label>Insert Odd Home</label>
                </div>  
          
                <div class="group">
                  <input type="number" required="required" min="1"/><span class="highlight"></span><span class="bar"></span>
                  <label>Insert Odd Away</label>
                </div> 

                <div class="group">
                  <input type="number" required="required" min="1"/><span class="highlight"></span><span class="bar"></span>
                  <label>Insert Odd Draw</label>
                </div>                 

                <div class="group">
                  <b-dropdown id="dropdown-1" size="sm" text="Home Team" class="m-md-2">
                    <b-dropdown-item>First Action</b-dropdown-item>
                    <b-dropdown-item>Second Action</b-dropdown-item>
                    <b-dropdown-item>Third Action</b-dropdown-item>
                  </b-dropdown>
                  <b-dropdown id="dropdown-1" size="sm" text="Away Team" class="m-md-2">
                    <b-dropdown-item>First Action</b-dropdown-item>
                    <b-dropdown-item>Second Action</b-dropdown-item>
                    <b-dropdown-item>Third Action</b-dropdown-item>
                  </b-dropdown>
                </div>

                <div class="group" id="listResults">
                  <div class="col-xs-2 text-center">
                    <div class="checkbox checkbox-circle checkbox-yellow" style="margin-left: 35%;">
                      <input id="checkbox3" type="checkbox" checked>
                      <label>Premium?</label>
                    </div>
                  </div>
                </div>


                <div class="btn-box">
                  <button class="btn btn-submit" type="submit">Create Event</button>
                </div>

              </form>
            </div>
          </div>


      
        <div style="width: 75%; float:right;" id="events">
          <h3 style="text-align: left; padding-top: 3.5px;"> Events' Management </h3>
          <hr id="hr"/>

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
                      <!-- aqui ficava fixe um if not premium disable button-->
                      <p class="text-warning" style="padding-top: 15px;"><small>Premium</small></p>
                      <button class="btn"><i class="fa fa-times"></i> Delete</button>
                      
                      <!-- PÔR AQUI UM IF RESULT!= NO RESULT disable close button e delete button -->
                      <!-- Ou seja, result já é tipo Win Home, pq evento já foi fechado -->
                      
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
  
  </div>
</template>

<script>
import NavbarToOffcanvasAdmin from '../components/NavBarToOffcanvasAdmin'
export default {
  name: 'events',
  data() {
    return {
        close: false,
        closen: false
    }
  },
  components: {
    NavbarToOffcanvasAdmin
  }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

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



.container-full { 
  background-color: black;
  margin: 0 auto;
  height: 100%;
  width: 100%;
  background-size: cover;
  overflow: hidden;
  height: 100vh;
  padding-top: 5%;
  overflow: auto;
}

#hr { display: block; height: 1px;
    border: 0; border-top: 1px solid #ccc;
    margin: 1em 0; padding: 0; }


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

#events {
  padding: 15px;
  margin: auto;
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
  margin: 18px auto;
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
  margin: 45px 0;
}

textarea {
  resize: none;
}

input,
textarea {
  background: none;
  color: #c6c6c6;
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
  background: black;
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

.list-group{
    min-height: 400px;
    background-color: white;
    max-height: 400px;
    margin-bottom: 10px;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
}

#listResults .checkbox * {
  cursor: pointer;
}
#listResults .checkbox {
  padding-left: 20px;
  width: 20px;
  height: 20px;
  margin-top: 1px;
}

#listResults .checkbox label {
  display: inline-block;
  vertical-align: middle;
  position: relative;
  padding-left: 5px;
}

#listResults .checkbox label::before {
  content: "";
  display: inline-block;
  position: absolute;
  width: 20px;
  height: 20px;
  left: 0;
  margin-left: -20px;
  border: 1px solid #555;
  border-radius: 3px;
  background-color: #fff;
  -webkit-transition: border 0.15s ease-in-out, color 0.15s ease-in-out;
  -o-transition: border 0.15s ease-in-out, color 0.15s ease-in-out;
  transition: border 0.15s ease-in-out, color 0.15s ease-in-out;
}

#listResults .checkbox label::after {
  display: inline-block;
  position: absolute;
  width: 20px;
  height: 20px;
  left: 0;
  top: 2px;
  margin-left: -21px;
  padding-left: 3px;
  padding-top: 1px;
  font-size: 11px;
  color: #555555;
}

#listResults .checkbox input[type="checkbox"]{
  opacity: 0;
  z-index: 1;
  width: 20px;
  height: 20px;
}


#listResults .checkbox input[type="checkbox"]:checked + label::after{
  font-family: "FontAwesome";
  content: "\f00c";
}

#listResults .checkbox.checkbox-circle label::before {
  border-radius: 50%;
}

#listResults .checkbox.checkbox-inline {
  margin-top: 0;
}

#listResults .checkbox-red    input[type="checkbox"]:checked + label::after,
#listResults .checkbox-yellow input[type="checkbox"]:checked + label::after,
#listResults .checkbox-green  input[type="checkbox"]:checked + label::after,
#listResults .checkbox-blue   input[type="checkbox"]:checked + label::after,
#listResults .checkbox-black  input[type="checkbox"]:checked + label::after
{color: #fff;}

#listResults .checkbox-yellow input[type="checkbox"] + label::before
{background-color: #face00;  border-color: #face00;}

</style>
