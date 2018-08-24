<template>
<main>
  <div class="container">
    <div class="jumbotron">
      <div v-if="this.picCheck==undefined" style="text-align:center">
        <i class="material-icons md-48">account_circle</i>
      </div>
      <div v-else style="text-align:center">
        <img class="round img" :src="imgURL"></img>
      </div>
      <h1 align="center">{{displayname}}</h1>
      <h4 class="section-head">Bio</h4>
      <p class="content">{{bio}}</p>
      <router-link to="/editprofile">
        <button class="btn btn-primary btn-lg btn-block col-md-3">Update</button>
      </router-link>
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
      displayname: null,
      bio: null,
      imgURL: null,
      picCheck: null
    }
  },
  async created() {
    this.picCheck = this.user.profilePic
    if (this.picCheck == undefined) {
      this.bio = this.user.bio
      this.displayname = this.user.displayName
    } else {
      this.bio = this.user.bio
      this.displayname = this.user.displayName
      this.imgURL = this.user.profilePic[0]
    }
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
  padding-left: 12px
}
</style>
