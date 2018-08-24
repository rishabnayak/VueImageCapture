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
      <h4 class="section-head">City</h4>
      <p class="content">{{city}}</p>
      <h4 class="section-head">State</h4>
      <p class="content">{{stt}}</p>
      <h4 class="section-head">Country</h4>
      <p class="content">{{country}}</p>
      <h4 class="section-head">Phone Number</h4>
      <p class="content">{{number}}</p>
      <h4 class="section-head">Current Affiliation</h4>
      <p class="content">{{affiliation}}</p>
      <router-link to="/editprofile">
        <button v-if="userCheck" class="btn btn-primary btn-lg btn-block col-md-3">Update</button>
      </router-link>
    </div>
    <div class="jumbotron">
      <h3>User Projects</h3>
      <br>
      <masonry :cols="{default: 3, 991: 2, 767: 1}" :gutter="{default: '30px', 767: '15px'}">
        <div v-for="project in projects" :key="project.id" class="card mb-4 box-shadow">
          <div class="card-header">
            <h2 class="my-0 font-weight-normal">{{project.data().name}}</h2></div>
          <div class="card-body">
            <h4 class="card-title">Short Introduction</h4>
            <p>{{project.data().intro}}</p>
            <h4>Members</h4>
            <p v-for="member in project.data().members" :key="member.id">
              <router-link :to="{ name: 'profile', params: {uname:member} }"><span>{{ member }}</span></router-link>
            </p>
            <router-link :to="{ name: 'project', params: {name:project.data().name} }">
              <button v-if="project.data().members.find(item => item == user.uname)" class="btn btn-lg btn-block btn-primary">View</button>
            </router-link>
          </div>
        </div>
      </masonry>
    </div>
  </div>
  <hr class="featurette-divider">

  <footer class="container">
    <p class="float-right"><a href="#">Back to top</a></p>
    <p>© 2018 Prantae</p>
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
      uname: this.$route.params.uname,
      displayname: null,
      bio: null,
      city: null,
      stt: null,
      country: null,
      number: null,
      affiliation: null,
      userCheck: null,
      imgURL: null,
      picCheck: null,
      projects: null
    }
  },
  async created() {
    let finduser = await db.collection('users').where("uname", "==", this.uname).get()
    this.picCheck = finduser.docs[0].data().profilePic
    if (finduser.empty) {
      this.$router.push({
        name: "allusers"
      })
    } else if (this.picCheck == undefined) {
      this.bio = finduser.docs[0].data().bio
      this.city = finduser.docs[0].data().city
      this.stt = finduser.docs[0].data().stt
      this.country = finduser.docs[0].data().country
      this.number = finduser.docs[0].data().number
      this.affiliation = finduser.docs[0].data().affiliation
      this.displayname = finduser.docs[0].data().displayName
      let projectsGet = await db.collection('projects').where("members", "array-contains", this.user.uname).get()
      this.projects = projectsGet.docs
      if (this.$route.params.uname == this.user.uname) {
        this.userCheck = true
      } else {
        this.userCheck = false
      }
    } else {
      this.bio = finduser.docs[0].data().bio
      this.city = finduser.docs[0].data().city
      this.stt = finduser.docs[0].data().stt
      this.country = finduser.docs[0].data().country
      this.number = finduser.docs[0].data().number
      this.affiliation = finduser.docs[0].data().affiliation
      this.displayname = finduser.docs[0].data().displayName
      this.imgURL = finduser.docs[0].data().profilePic[0]
      let projectsGet = await db.collection('projects').where("members", "array-contains", this.user.uname).get()
      this.projects = projectsGet.docs
      if (this.$route.params.uname == this.user.uname) {
        this.userCheck = true
      } else {
        this.userCheck = false
      }
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
