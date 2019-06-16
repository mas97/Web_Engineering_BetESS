<template>

  <div>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <NavbarToOffcanvas v-if="['calendario'].indexOf($route.name) < 0" ></NavbarToOffcanvas>
    
    <div class="container-full">
      <h3 style="text-align: left;"> Your Notifications </h3>
      <hr/>
      


      <div class="container">
        <div class="row">
          <div class="col-12 col-sm-8 col-lg-5" style="min-width: 100%;">
            <ul class="list-group">
              
              <li 
              v-if="$store.state.notifications.notifications[login.user.user_id] > 0"
              v-for="notification in $store.state.notifications.notifications[login.user.user_id]" :key="notification.notification_id"  
              class="list-group-item d-flex justify-content-between align-items-center" 
              style="color: gray">
                  <div class="image-parent">
                    <figure>
                      <img src="../assets/envelope-closed.png" class="img-fluid" alt="env">
                    </figure>
                </div>
                {{$store.state.events.events[notification.event_id - 1].teams.teams[event.team_home_id - 1].name}} - {{$store.state.events.events[notification.event_id - 1].teams.teams[event.team_away_id - 1].name}}
                <small>{{$store.state.events.events[bet.event_id - 1].sports.sports[event.sport_id - 1].name}}, {{$store.state.events.events[bet.event_id - 1].leagues.leagues[event.league_id - 1].name}}</small>

                <p class="text-success" style="padding-top: 15px;"><small>Balance: {{notification.balancebet}}</small></p>
                <!-- if bet status read ? seen : mark as seen [para o texto] depois disable ao botão-->
                <button class="btn"><i class="fa fa-check"></i> {{(notification.status == "notSeen") ? "mark as seen" : "seen"}}</button>
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
  name: 'notifications',
  data() {

  },
  created () {
    this.$store.dispatch('notifications/getNotifications').then((response) => {
      //console.log(JSON.stringify(this.$store.state.events))
      console.log('hsbdchw' + JSON.stringify(response))
    })
    this.$store.dispatch('events/getEvents').then((response) => {
      //console.log(JSON.stringify(this.$store.state.events))
      //console.log('hsbdchw' + JSON.stringify(response))
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
  components: {
    NavbarToOffcanvas
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
  padding-left: 18%;
  padding-right: 18%;
}

body{
  padding: 2rem 0rem;
}
.image-parent {
  max-width: 40px;
}
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

.list-group{
    min-height: 400px;
    background-color: white;
    max-height: 400px;
    margin-bottom: 10px;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
}
</style>
