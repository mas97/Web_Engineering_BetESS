<template>
  <nav class="navbar navbar-expand-md fixed-top navbar-dark" style="background-color: #000000;">  
        <a class="navbar-brand" href="/#/user">
        <img src="@/assets/logo-full.png" width="110" height="50" alt="">
    </a>
    <router-link class="navbar-brand" :to="{ name: 'user' }" @click.native="offoffcanvas() + currentUpdate('')"></router-link>

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
        <li class="nav-item" v-bind:class="{ active: creditsCurrent }">
          <router-link class="nav-link" :to="{ name: 'credits' }" @click.native="toggleoffcanvas() + currentUpdate('credits')">
            Credits
            <span class="sr-only">(current)</span>
          </router-link>
        </li>
        <li class="nav-item" v-bind:class="{ active: profileCurrent }">
          <router-link class="nav-link" :to="{ name: 'profile' }" @click.native="toggleoffcanvas() + currentUpdate('profile')">
            Profile
            <span class="sr-only">(current)</span>
          </router-link>
        </li>
      </ul>

      <li class="nav-item">
        <a class="nav-link" href="#/notifications" style="color: gray">Notifications <span class="sr-only">(current)</span></a>
      </li>

      <br/>

      <button :to="{ name: 'user' }" v-on:click="logout()" v-if="this.$store.state.login.accesstoken != ''" class="btn btn-outline-warning my-2 my-sm-0" type="submit" style="margin:10px;">Logout</button>
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
    logout () {
      this.$store.dispatch('login/resetToken').then(() => {
        // logout com sucesso
      }).catch((error) => {
        console.log(error)
      })
    },
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
li {
    list-style-type: none;
}
</style>