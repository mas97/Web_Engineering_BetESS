<template>
  <div>

    <NavbarToOffcanvas v-if="['calendario'].indexOf($route.name) < 0" ></NavbarToOffcanvas>
    <div class="container-full">
      <div class="row">
          <div class="col-4">
            <div class="wrapper">
              <form>

                <div class="group">
                  <input type="number" required="required" min="1"/><span class="highlight"></span><span class="bar"></span>
                  <label>Insert the amount to bet</label>
                </div>

                <div class="group">
                <label> Choose the result:</label>
                <br/>
                <br/>
                <select class="select-css">
                  <option value="winhome">Win Home</option>
                  <option value="winAway">Win Away</option>
                  <option value="draw">Draw</option>
                </select>
                </div>


                <div class="btn-box">
                  <button class="btn btn-submit" type="submit">Submit</button>
                </div>

              </form>
            </div>
          </div>

          <div class="col-8">

            <div class="container-full">
              <h2>Responsive Tables Using LI <small>Triggers on 767px</small></h2>
              <ul class="responsive-table">
                <li class="table-header">
                  <div class="col col-1">Job Id</div>
                  <div class="col col-2">Customer Name</div>
                  <div class="col col-3">Amount Due</div>
                  <div class="col col-4">Payment Status</div>
                </li>
                <li class="table-row">
                  <div class="col col-1" data-label="Job Id">42235</div>
                  <div class="col col-2" data-label="Customer Name">John Doe</div>
                  <div class="col col-3" data-label="Amount">$350</div>
                  <div class="col col-4" data-label="Payment Status">Pending</div>
                </li>
                <li class="table-row">
                  <div class="col col-1" data-label="Job Id">42442</div>
                  <div class="col col-2" data-label="Customer Name">Jennifer Smith</div>
                  <div class="col col-3" data-label="Amount">$220</div>
                  <div class="col col-4" data-label="Payment Status">Pending</div>
                </li>
                <li class="table-row">
                  <div class="col col-1" data-label="Job Id">42257</div>
                  <div class="col col-2" data-label="Customer Name">John Smith</div>
                  <div class="col col-3" data-label="Amount">$341</div>
                  <div class="col col-4" data-label="Payment Status">Pending</div>
                </li>
                <li class="table-row">
                  <div class="col col-1" data-label="Job Id">42311</div>
                  <div class="col col-2" data-label="Customer Name">John Carpenter</div>
                  <div class="col col-3" data-label="Amount">$115</div>
                  <div class="col col-4" data-label="Payment Status">Pending</div>
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
  height: 95vh;
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


.container {
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 10px;
  padding-right: 10px;
}

h2 {
  font-size: 26px;
  margin: 20px 0;
  text-align: center;
}
h2 small {
  font-size: 0.5em;
}

.responsive-table li {
  border-radius: 3px;
  padding: 25px 30px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
}
.responsive-table .table-header {
  background-color: #95A5A6;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}
.responsive-table .table-row {
  background-color: #ffffff;
  box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
}
.responsive-table .col-1 {
  flex-basis: 10%;
}
.responsive-table .col-2 {
  flex-basis: 40%;
}
.responsive-table .col-3 {
  flex-basis: 25%;
}
.responsive-table .col-4 {
  flex-basis: 25%;
}
@media all and (max-width: 767px) {
  .responsive-table .table-header {
    display: none;
  }
  .responsive-table li {
    display: block;
  }
  .responsive-table .col {
    flex-basis: 100%;
  }
  .responsive-table .col {
    display: flex;
    padding: 10px 0;
  }
  .responsive-table .col:before {
    color: #6C7A89;
    padding-right: 10px;
    content: attr(data-label);
    flex-basis: 50%;
    text-align: right;
  }
}


</style>
