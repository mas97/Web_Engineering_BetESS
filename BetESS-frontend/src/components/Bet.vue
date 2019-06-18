<template>
  <div>

    <NavbarToOffcanvas v-if="['calendario'].indexOf($route.name) < 0" ></NavbarToOffcanvas>
    <div class="container-full">
        <div style="width: 25%; float:left;">
            <div class="wrapper">
              <form>
                <hr/>
                <div class="group">
                  <input v-model="bet_amount" type="number" required="required" min="1"/><span class="highlight"></span><span class="bar"></span>
                  <label>1º Insert the amount to bet</label>
                </div>

                <div class="group">
                  <label>2º Choose the odd from the desired event</label>
                </div>

                <br/>

                <div class="btn-box">
                  <button type="button" class="btn btn-submit" v-on:click="postBet()">Submit</button>
                </div>

              </form>
            </div>
          </div>

          <div style="width: 75%; float:right" id="events">
            <h3 style="text-align: left; padding-top: 3.5px;"> Available Events </h3>
            <hr id="hr"/>

            <div class="row">
              <div v-for="event in events_info" :key="event.event_id" class="col-sm-4">
                <div class="card border-warning">
                  <div class="card-body">
                    <h5 class="card-title">{{$store.state.teams.teams[event.team_home_id - 1].name}} - {{$store.state.teams.teams[event.team_away_id - 1].name}}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">{{$store.state.sports.sports[event.sport_id - 1].name}}, {{$store.state.leagues.leagues[event.league_id - 1].name}}</h6>
                    <p v-if="event.premium" class="card-text mb-2" style="color:orange;"><small>**** Premium ****</small></p> 
                   <div class="btn-group" role="group" aria-label="Basic example">
                      <button type="button" v-on:click="result_selected = 'winHome'; event_id_selected = event.event_id" class="btn btn-warning">{{event.oddHome}}</button>
                      <button type="button" v-on:click="result_selected = 'draw'; event_id_selected = event.event_id" class="btn btn-warning">{{event.oddDraw}}</button>
                      <button type="button" v-on:click="result_selected = 'winAway'; event_id_selected = event.event_id;" class="btn btn-warning">{{event.oddAway}}</button>
                      
                    </div>
                  </div>
                </div>
              </div>

              <!-- <div class="col-sm-4">
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
                    <p class="card-text mb-2" style="color:orange;"><small>**** Premium ****</small></p> 
                   <div class="btn-group" role="group" aria-label="Basic example">
                      <button type="button" class="btn btn-warning">Odd1</button>
                      <button type="button" class="btn btn-warning">Odd2</button>
                      <button type="button" class="btn btn-warning">Odd3</button>
                    </div>
                  </div>
                </div>
              </div> -->
            </div>

          </div>
        </div>
  </div>
</template>

<script>
import NavbarToOffcanvas from '../components/NavBarToOffcanvas'
export default {
  name: 'bet',
  data () {
    return {
      bet_amount: '',
      result_selected: '',
      event_id_selected: '',
      events_info: []
    }
  },
  created () {
    this.$store.dispatch('events/getEvents').then((response) => {
      //console.log(JSON.stringify(this.$store.state.events))
      console.log('hsbdchw' + JSON.stringify(response))
      let i, len
      for (i = 0, len = response.length; i < len; i++) { 
        if (response[i].status !== 'closed') {
          this.events_info.push(response[i])
        }
      }
    })
    this.$store.dispatch('teams/getTeams').then((response) => {
      //console.log(JSON.stringify(this.$store.state.teams))
      //console.log(JSON.stringify(response))
      console.log(this.$store.state.login.premium)
    })
    this.$store.dispatch('leagues/getLeagues').then((response) => {
      //console.log(JSON.stringify(this.$store.state.leagues))
      //console.log(JSON.stringify(response))
    })
    this.$store.dispatch('sports/getSports').then((response) => {
      //console.log(JSON.stringify(this.$store.state.sports))
      //console.log(JSON.stringify(response))
    })
  }, 
  methods: {
    postBet () {
      this.$store.dispatch('bets/postBet', {
        amount: this.bet_amount,
        event_id: this.event_id_selected,
        result: this.result_selected
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

#hr { display: block; height: 1px;
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
  padding-top: 5%;
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


</style>
