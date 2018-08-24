<template>
<nav class="navbar navbar-expand-md navbar-light bg-light navbar-fixed">
  <div class="container">
    <a class="navbar-brand">
      <router-link to="/">Bhav.AT</router-link>
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
    <div class="collapse navbar-collapse" id="navbarResponsive">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item active">
          <a class="nav-link">
            <router-link to="/">Home</router-link>
            <span class="sr-only">(current)</span>
          </a>
        </li>
        <!--<li class="nav-item">
              <a class="nav-link"><router-link :to="{ name: 'cities'}">Cities</router-link></a>
            </li>
            <li class="nav-item">
              <a class="nav-link"><router-link :to="{ name: 'workshops'}">Workshops</router-link></a>
            </li>-->
        <li class="nav-item">
          <a class="nav-link">
            <router-link :to="{ name: 'allusers'}">Users</router-link>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link">
            <router-link :to="{ name: 'allprojects'}">Projects</router-link>
          </a>
        </li>
        <!--<li class="nav-item">
              <a class="nav-link"><router-link :to="{ name: 'news'}">News</router-link></a>
            </li>-->
        <!--<li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" id="dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><router-link :to="{ name: 'about'}">About</router-link></a>
              <div class="dropdown-menu" aria-labelledby="dropdown">
                <a class="nav-link"><router-link :to="{ name: 'connect'}">Connect</router-link></a>
                <a class="nav-link"><router-link :to="{ name: 'testimonials'}">Testimonials</router-link></a>
              </div>
            </li>-->
        <li v-if="user" class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">User Area</a>
          <div class="dropdown-menu" aria-labelledby="dropdown">
            <a class="nav-link">
              <router-link :to="{ name: 'myprojects'}">My Projects</router-link>
            </a>
            <a class="nav-link">
              <router-link :to="{ name: 'allchats'}">Chat</router-link>
            </a>
            <a class="nav-link">
              <router-link :to="{ path: profilelink()}">My Profile</router-link>
            </a>
          </div>
        </li>
      </ul>
      <a v-if="user" class="nav-link btn btn-outline" @click="signOut()">Logout</a>
      <a v-else class="nav-link btn btn-outline" @click="login()">Login</a>
    </div>
  </div>
</nav>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/init.js'
export default {
  name: 'navigation',
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  methods: {
    async signOut() {
      await this.$store.dispatch('logOut')
      this.$router.push('/')
    },
    profilelink: function() {
      return "/profile/" + this.user.uname
    },
    async login() {
      this.$router.push('/login')
    }
  },
  data() {
    return {}
  }
}
</script>
