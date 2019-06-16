<template>

  <div>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <NavbarToOffcanvasAdmin v-if="['calendario'].indexOf($route.name) < 0" ></NavbarToOffcanvasAdmin>
    
    <div class="container-full">
      <h3 style="text-align: left;"> User's Bets </h3>
      <hr/>


      <div class="container">
        <div class="row">
          <div class="col-12 col-sm-8 col-lg-5" style="min-width: 100%;">

            <table style="overflow-x:auto; background-color:white;">
              <tr>
                <th>Event</th>
                <th>Sport</th>
                <th>League</th>
                <th>Bet Amount</th>
                <th>Expected Result</th>
                <th>Paid</th>
                <th>User</th>
              </tr>

              
              <tr v-if="$store.state.bets.bets.length > 0 && $store.state.events.events && $store.state.teams.teams && $store.state.sports.sports && $store.state.leagues.leagues"
                  v-for="bet in $store.state.bets.bets" :key="bet.bet_id">
                
                <td>{{$store.state.events.events[bet.event_id - 1].teams.teams[event.team_home_id - 1].name}} - {{$store.state.events.events[bet.event_id - 1].teams.teams[event.team_away_id - 1].name}}</td>
                <td>{{$store.state.events.events[bet.event_id - 1].sports.sports[event.sport_id - 1].name}}</td>  
                <td>{{$store.state.events.events[bet.event_id - 1].leagues.leagues[event.league_id - 1].name}}</td>
                <td>{{bet.amount}}</td>
                <td>{{bet.result}}</td>
                <td class="text-warning">{{bet.paid ? "Yes" : "No"}}</td>
                <td>{{$store.state.login.user.username}}</td>

              </tr>
            </table>

          </div>
        </div>
      </div>

    </div>
  
  </div>
</template>

<script>
import NavbarToOffcanvasAdmin from '../components/NavBarToOffcanvasAdmin'
export default {
  name: 'bets',
  data () {

  },
  created () {
    this.$store.dispatch('bets/getBets').then((response) => {
      //console.log(JSON.stringify(this.$store.state.events))
      console.log('hsbdchw' + JSON.stringify(response))
    })
    this.$store.dispatch('events/getEvents').then((response) => {
      //console.log(JSON.stringify(this.$store.state.events))
      c//onsole.log(JSON.stringify(response))
    })
    this.$store.dispatch('teams/getTeams').then((response) => {
      //console.log(JSON.stringify(this.$store.state.teams))
      //console.log(JSON.stringify(response))
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

th, td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid darkgray;
}

table {
  width: 100%;
}

th {
  height: 50px;
  border-bottom: 3px solid orange;
  color: black;
}

td {
  color: rgb(107, 106, 106);
}
</style>
