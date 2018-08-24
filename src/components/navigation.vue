<template>
<nav class="navbar navbar-expand-md navbar-light bg-light navbar-fixed">
  <div class="container">
    <a class="navbar-brand">
      <router-link to="/">Vue ImageCapture</router-link>
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
        <li>
          <a class="nav-link">
            <router-link :to="{ path: '/app'}">App</router-link>
          </a>
        </li>
        <li v-if="user">
          <a class="nav-link">
            <router-link :to="{ path: '/profile'}">My Profile</router-link>
          </a>
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
    async login() {
      this.$router.push('/login')
    }
  },
  data() {
    return {}
  }
}
</script>
