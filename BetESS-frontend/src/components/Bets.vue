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
                <th>User id</th>
              </tr>

              
              <tr v-for="bet in $store.state.bets.bets" :key="bet.bet_id">
                
                <td>{{getBetHomeTeamName(bet.bet_id)}} - {{getBetAwayTeamName(bet.bet_id)}}</td>
                <td>{{getBetSportName( bet.bet_id )}}</td>  
                <td>{{getBetLeagueName ( bet.bet_id )}}</td>
                <td>{{bet.amount}}</td>
                <td>{{bet.result}}</td>
                <td class="text-warning">{{bet.paid ? "Yes" : "No"}}</td>
                <td>{{bet.user_id}}</td>

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
    return {

    }

  },
  created () {
    this.$store.dispatch('sports/getSports').then((response) => {
      // console.log(JSON.stringify(this.$store.state.sports))
      //console.log(JSON.stringify(response))
      this.$store.dispatch('leagues/getLeagues').then((response) => {
        // console.log(JSON.stringify(this.$store.state.leagues))
        //console.log(JSON.stringify(response))
        this.$store.dispatch('teams/getTeams').then((response) => {
          // console.log(JSON.stringify(this.$store.state.teams))
          //console.log(JSON.stringify(response))
          this.$store.dispatch('events/getEvents').then((response) => {
            // console.log(JSON.stringify(this.$store.state.events))
            //console.log(JSON.stringify(response))
            this.$store.dispatch('bets/getBets', {
              role: 'admin'
            }).then((response) => {
              // console.log(JSON.stringify(this.$store.state.bets))
              // console.log('hsbdchw' + JSON.stringify(response))

            })
          })
        })
      })

    })
  },
  methods: {

    getBetHomeTeamName ( id ) {
      let event_id, team_home_name, team_home_id
      console.log(this.$store.state.bets.bets)
      event_id = this.$store.state.bets.bets[id - 1].event_id
      team_home_id = this.$store.state.events.events[event_id - 1].team_home_id
      team_home_name = this.$store.state.teams.teams[team_home_id - 1].name
      console.log(team_home_name)
      return team_home_name
    },
    getBetAwayTeamName ( id ) {
      let event_id, team_home, team_away_name, team_away_id
      event_id = this.$store.state.bets.bets[id - 1].event_id
      team_away_id = this.$store.state.events.events[event_id - 1].team_away_id
      team_away_name = this.$store.state.teams.teams[team_away_id - 1].name
      console.log(team_away_name)
      return team_away_name
    },
    getBetSportName ( id ) {
      let event_id, sport_id, sport_name
      event_id = this.$store.state.bets.bets[id - 1].event_id
      sport_id = this.$store.state.events.events[event_id - 1].sport_id
      sport_name = this.$store.state.sports.sports[sport_id - 1].name

      return sport_name
    },
    getBetLeagueName ( id ) {
      let event_id, league_id, league_name
      event_id = this.$store.state.bets.bets[id - 1].event_id
      league_id = this.$store.state.events.events[event_id - 1].league_id
      league_name = this.$store.state.leagues.leagues[league_id - 1].name

      return league_name
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
