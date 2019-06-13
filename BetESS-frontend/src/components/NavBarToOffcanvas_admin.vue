<template>

  <nav class="navbar navbar-expand-md fixed-top navbar-dark" style="background-color: #000000;">  
        <a class="navbar-brand" href="/#/admin">
        <img src="@/assets/logo-full.png" width="110" height="50" alt="">
    </a>
    <router-link class="navbar-brand" :to="{ name: 'admin' }" @click.native="offoffcanvas() + currentUpdate('')"></router-link>

    <div class="navbar-collapse offcanvas-collapse" v-bind:class="{ open: collapse }" id="navbarsExampleDefault">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item" v-bind:class="{ active: sportsCurrent }">
          <router-link class="nav-link" :to="{ name: 'sports' }" @click.native="toggleoffcanvas() + currentUpdate('sports')">
           Sports
            <span class="sr-only">(current)</span>
          </router-link>
        </li>
        <li class="nav-item" v-bind:class="{ active: leaguesCurrent }">
          <router-link class="nav-link" :to="{ name: 'leagues' }" @click.native="toggleoffcanvas() + currentUpdate('leagues')">
            Leagues
            <span class="sr-only">(current)</span>
          </router-link>
        </li>
        <li class="nav-item" v-bind:class="{ active: teamsCurrent }">
          <router-link class="nav-link" :to="{ name: 'teams' }" @click.native="toggleoffcanvas() + currentUpdate('teams')">
            Teams
            <span class="sr-only">(current)</span>
          </router-link>
        </li>
        <li class="nav-item" v-bind:class="{ active: betsCurrent }">
          <router-link class="nav-link" :to="{ name: 'bets' }" @click.native="toggleoffcanvas() + currentUpdate('bets')">
            Bets
            <span class="sr-only">(current)</span>
          </router-link>
        </li>
        <li class="nav-item" v-bind:class="{ active: eventsCurrent }">
          <router-link class="nav-link" :to="{ name: 'events' }" @click.native="toggleoffcanvas() + currentUpdate('events')">
            Events
            <span class="sr-only">(current)</span>
          </router-link>
        </li>
      </ul>

      <button class="btn btn-outline-warning my-2 my-sm-0" type="submit" style="margin:10px;">Logout</button>
    </div>
  </nav>

</template>

<script>
export default {
  name: 'NavBarToOffcanvas',
  data () {
    return {
      collapse: false,
      sportsCurrent: false,
      leaguesCurrent: false,
      teamsCurrent: false,
      betsCurrent: false,
      eventsCurrent: false
    }
  },

  methods: {
    toggleoffcanvas: function () {
      this.collapse = !this.collapse
      return this.collapse
    },
    offoffcanvas: function () {
      this.collapse = false
      return this.collapse
    },
    currentUpdate: function (page) {
      this.sportsCurrent = false
      this.leaguesCurrent = false
      this.teamsCurrent = false
      this.betsCurrent = false
      this.eventsCurrent = false

      if (page === 'sports') {
        this.sportsCurrent = true
      } else if (page === 'leagues') {
        this.leaguesCurrent = true
      } else if (page === 'teams') {
        this.teamsCurrent = true
      } else if (page === 'bets') {
        this.betsCurrent = true
      } else if (page === 'events') {
        this.eventsCurrent = true
      }
    }
  }
}
</script>

<style>
li {
    list-style-type: none;
}

</style>