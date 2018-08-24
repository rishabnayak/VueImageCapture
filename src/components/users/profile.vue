<template>
<main class="content">
  <div class="container">
    <div class="jumbotron text-center">
      <h1 align="center">{{displayname}}</h1>
      <br>
      <br>
      <router-link :to="{ name: 'calibration'}"><button class="btn btn-primary">Recalibrate</button></router-link>
    </div>
  </div>
  <hr class="featurette-divider">

  <footer class="container">
    <p class="float-right"><a href="#">Back to top</a></p>
    <p>© 2018 Vue ImageCapture</p>
  </footer>
</main>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/init.js'
export default {
  name: 'profile',
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  data() {
    return {
      displayname: null
    }
  },
  async created() {
      this.displayname = this.user.displayName
  }
}
</script>

<style>
.material-icons.md-18 {
  font-size: 18px;
}

.material-icons.md-24 {
  font-size: 24px;
}

.material-icons.md-36 {
  font-size: 36px;
}

.material-icons.md-48 {
  font-size: 48px;
}

.round {
  border-radius: 50%;
  overflow: hidden;
  width: 150px;
  height: 150px;
}

.round img {
  display: block;
  /* Stretch
      height: 100%;
      width: 100%; */
  min-width: 100%;
  min-height: 100%;
}

h1 {
  color: #444;
}

.section-head {
  padding-left: 8px
}

.content {
  padding-top: 10px
}
</style>
