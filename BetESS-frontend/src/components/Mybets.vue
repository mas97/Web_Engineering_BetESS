<template>
  <div>
    <NavbarToOffcanvas v-if="['calendario'].indexOf($route.name) < 0" ></NavbarToOffcanvas>
    
    <div class="container-full">

      <h3 style="text-align: left;"> Your Current Bets </h3>
      <hr/>

    <!-- Aqui mostra as bets de eventos que ainda n acabaram. -->
    <!-- Bets de eventos terminados vão para as notificações. -->

      <div v-for="bet in $store.state.bets.bets" :key="bet.bet_id" class="row">
        <div class="col-sm-4">
          <div class="card border-warning">
            <div class="card-body">
              <h5 class="card-title">{{$store.state.teams.teams[$store.state.events.events[bet.event_id - 1].team_home_id - 1].name}} - {{$store.state.teams.teams[$store.state.events.events[bet.event_id - 1].team_away_id - 1].name}}</h5>
              <h6 class="card-subtitle mb-2 text-muted">{{$store.state.sports.sports[$store.state.events.events[bet.event_id - 1].sport_id - 1].name}}, {{$store.state.leagues.leagues[$store.state.events.events[bet.event_id - 1].league_id - 1].name}}</h6>
              <a href="#!" v-on:click="cashout()" class="btn btn-outline-warning my-2 my-sm-0">Cashout</a>
            </div>
          </div>
        </div>
      </div>
<!-- 
        <div class="col-sm-4">
          <div class="card border-warning">
            <div class="card-body">
              <h5 class="card-title">GS Warriors - TOR Raptors</h5>
              <h6 class="card-subtitle mb-2 text-muted">Basketball, EUA - NBA</h6>
              <p class="card-text mb-2 text-muted"><small>Possible Gains: 10 ESScoins</small></p>
              <a href="#!" class="btn btn-outline-warning my-2 my-sm-0">Cashout</a>
            </div>
          </div>
        </div>
    
        <div class="col-sm-4">
          <div class="card border-warning">
            <div class="card-body">
              <h5 class="card-title">ChelseaFC - ArsenalFC</h5>
              <h6 class="card-subtitle mb-2 text-muted">Soccer, Premier League</h6>
              <p class="card-text mb-2 text-muted"><small>Possible Gains: 12 ESScoins</small></p> 
              <a href="#!" class="btn btn-outline-warning my-2 my-sm-0">Cashout</a>
            </div>
          </div>
        </div>      

        <div class="col-sm-4">
          <div class="card border-warning">
            <div class="card-body">
              <h5 class="card-title">EvertonFC - ManchesterUFC</h5>
              <h6 class="card-subtitle mb-2 text-muted">Soccer, Premier League</h6>
              <p class="card-text mb-2 text-muted"><small>Possible Gains: 222 ESScoins</small></p>
              <p class="card-text mb-2" style="color:orange;"><small>**** Premium ****</small></p>
              <a href="#!" class="btn btn-outline-warning my-2 my-sm-0">Cashout</a>
            </div>
          </div>
        </div>
      </div> -->

    </div>
  </div>

</template>

<script>
import NavbarToOffcanvas from '../components/NavBarToOffcanvas'
export default {
  name: 'mybets',
  data () {
    return {

    }
  },
  created () {
    this.$store.dispatch('bets/getBets', {
      role: 'user'
    }).then((response) => {
      //console.log(JSON.stringify(this.$store.state.sports))
      //console.log(JSON.stringify(response))
    })
    this.$store.dispatch('events/getEvents').then((response) => {
      //console.log(JSON.stringify(this.$store.state.events))
      console.log('hsbdchw' + JSON.stringify(response))
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

  },
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
  overflow: auto;
}

hr { display: block; height: 1px;
    border: 0; border-top: 1px solid #ccc;
    margin: 1em 0; padding: 0; }


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
