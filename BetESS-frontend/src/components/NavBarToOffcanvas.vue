<template>

  <nav class="navbar navbar-expand-md fixed-top navbar-dark bg-dark">
    <button class="navbar-toggler p-0 border-0" type="button" @click="toggleoffcanvas">
      <span class="navbar-toggler-icon"></span>
    </button>
    <router-link class="navbar-brand" :to="{ name: 'home' }" @click.native="offoffcanvas() + currentUpdate('')">BetESS</router-link>
    <img src="@/assets/logo-vue.png" width="30" height="30" alt="">
  
    <div class="navbar-collapse offcanvas-collapse" v-bind:class="{ open: collapse }" id="navbarsExampleDefault">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item" v-bind:class="{ active: betCurrent }">
          <router-link class="nav-link" :to="{ name: 'bet' }" @click.native="toggleoffcanvas() + currentUpdate('bet')">
           Bet
            <span class="sr-only">(current)</span>
          </router-link>
        </li>
        <li class="nav-item" v-bind:class="{ active: mybetsCurrent }">
          <router-link class="nav-link" :to="{ name: 'mybets' }" @click.native="toggleoffcanvas() + currentUpdate('mybets')">
            My Bets
            <span class="sr-only">(current)</span>
          </router-link>
        </li>
        <li class="nav-item" v-bind:class="{ active: notificationsCurrent }">
          <router-link class="nav-link" :to="{ name: 'notifications' }" @click.native="toggleoffcanvas() + currentUpdate('notifications')">
            Notifications
            <span class="sr-only">(current)</span>
          </router-link>
        </li>
        <b-nav-item-dropdown id="credits-dropdown" text="credits" v-bind:class="{ active: creditsCurrent }">
          <b-dropdown-item :to="{ name: 'mycredits' }" @click.native="currentUpdate('credits') + toggleoffcanvas()">
            My Credits
          </b-dropdown-item>
          <b-dropdown-item :to="{ name: 'deposit' }" @click.native="currentUpdate('credits') + toggleoffcanvas()">
            Deposit
          </b-dropdown-item>
          <b-dropdown-item :to="{ name: 'draw' }" @click.native="currentUpdate('credits') + toggleoffcanvas()">
            Draw
          </b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown id="profile-dropdown" text="profile" v-bind:class="{ active: profileCurrent }">
          <b-dropdown-item :to="{ name: 'myprofile' }" @click.native="currentUpdate('profile') + toggleoffcanvas()">
            My Profile
          </b-dropdown-item>
          <b-dropdown-item :to="{ name: 'editprofile' }" @click.native="currentUpdate('profile') + toggleoffcanvas()">
            Edit Profile
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </ul>
    </div>
  </nav>

</template>

<script>
export default {
  name: 'NavBarToOffcanvas',
  data () {
    return {
      collapse: false,
      betCurrent: false,
      mybetsCurrent: false,
      notificationsCurrent: false,
      creditsCurrent: false,
      profileCurrent: false
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
      this.betCurrent = false
      this.mybetsCurrent = false
      this.notificationsCurrent = false
      this.creditsCurrent = false
      this.profileCurrent = false

      if (page === 'bet') {
        this.betCurrent = true
      } else if (page === 'mybets') {
        this.mybetsCurrent = true
      } else if (page === 'notifications') {
        this.notificationsCurrent = true
      } else if (page === 'credits') {
        this.creditsCurrent = true
      } else if (page === 'profile') {
        this.profileCurrent = true
      }
    }
  }
}
</script>

<style>
</style>