<template>
  <div>

    <NavbarToOffcanvas v-if="['calendario'].indexOf($route.name) < 0" ></NavbarToOffcanvas>
    <div class="container-full">
        <div style="width: 25%; float:left">
            <div class="wrapper">
              <form>

                <div class="group">
                  <input type="number" required="required" min="1"/><span class="highlight"></span><span class="bar"></span>
                  <label>1º Insert the amount to bet</label>
                </div>

                <div class="group">
                  <label>2º Choose the odd from the desired event</label>
                </div>

                <br/>

                <div class="btn-box">
                  <button class="btn btn-submit" type="submit">Submit</button>
                </div>

              </form>
            </div>
          </div>

          <div style="width: 75%; float:right" id="events">

            <div class="row">
              <div class="col-sm-4 mb-3 mb-md-0">
                <div class="card border-warning">
                  <div class="card-body">
                    <h5 class="card-title">FCPorto - SLBenfica</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Soccer, Primeira Liga</h6>
                    <p class="card-text mb-2 text-muted">Possible Gains: 20 ESScoins</p>
                   <div class="btn-group" role="group" aria-label="Basic example">
                      <button type="button" class="btn btn-warning">Odd1</button>
                      <button type="button" class="btn btn-warning">Odd2</button>
                      <button type="button" class="btn btn-warning">Odd3</button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-sm-4">
                <div class="card border-warning">
                  <div class="card-body">
                    <h5 class="card-title">GS Warriors - TOR Raptors</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Basketball, EUA - NBA</h6>
                    <p class="card-text mb-2 text-muted">Possible Gains: 10 ESScoins</p>
                   <div class="btn-group" role="group" aria-label="Basic example">
                      <button type="button" class="btn btn-warning">Odd1</button>
                      <button type="button" class="btn btn-warning">Odd2</button>
                      <button type="button" class="btn btn-warning">Odd3</button>
                    </div>
                  </div>
                </div>
              </div>
          
              <div class="col-sm-4">
                <div class="card border-warning">
                  <div class="card-body">
                    <h5 class="card-title">ChelseaFC - ArsenalFC</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Soccer, Premier League</h6>
                    <p class="card-text mb-2 text-muted">Possible Gains: 12 ESScoins</p> 
                    <div class="btn-group" role="group" aria-label="Basic example">
                      <button type="button" class="btn btn-warning">Odd1</button>
                      <button type="button" class="btn btn-warning">Odd2</button>
                      <button type="button" class="btn btn-warning">Odd3</button>
                    </div>
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
                   <div class="btn-group" role="group" aria-label="Basic example">
                      <button type="button" class="btn btn-warning">Odd1</button>
                      <button type="button" class="btn btn-warning">Odd2</button>
                      <button type="button" class="btn btn-warning">Odd3</button>
                    </div>
                  </div>
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
  name: 'bet',
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
  padding-top: 10px;
}

#events {
  padding: 15px;
}

.card-body {
  color: black
}

.col-sm-4 {
  padding: 7px;
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

/* ------------------------------------- */ 

.select-css {
    display: block;
    font-size: 16px;
    font-family: sans-serif;
    font-weight: 700;
    color: #444;
    line-height: 1.3;
    padding: .6em 1.4em .5em .8em;
    width: 100%;
    max-width: 100%; 
    box-sizing: border-box;
    margin: 0;
    border: 1px solid #aaa;
    box-shadow: 0 1px 0 1px rgba(0,0,0,.04);
    border-radius: .5em;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-color: #fff;
    background-image: url('../assets/dropdown.png'),
      linear-gradient(to bottom, #ffffff 0%,#e5e5e5 100%);
    background-repeat: no-repeat, repeat;
    background-position: right .7em top 50%, 0 0;
    background-size: .65em auto, 100%;
}
.select-css::-ms-expand {
    display: none;
}
.select-css:hover {
    border-color: #888;
}

.select-css option {
    font-weight:normal;
}

/* ------------------------------------- */ 





</style>
