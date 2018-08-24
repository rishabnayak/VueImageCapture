<template>
<main>
  <section class="jumbotron text-center">
    <div class="container">
      <h1 class="jumbotron-heading">All Users</h1>
    </div>
  </section>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <form>
          <label for="tagSearch">Tag Search</label>
          <div class="input-group add-on">
            <input type="text" class="form-control mr-1" id="tagSearch" placeholder="Search for User Tags" onpaste="return false" v-model="tagInput" @input="checkTag()">
            <div class="input-group-btn">
              <button class="btn btn-primary" @click.prevent="reset()">Reset</button>
            </div>
          </div>
          <p v-if="tagempty" class="red availability">Enter a Tag</p>
          <p v-else-if="tagfound == false" class="red availability">Tag not found!</p>
          <p v-else-if="tagfound" class="green availability">Tag Valid!</p>
        </form>
      </div>
    </div>
  </div>
  <div class="container">
    <masonry :cols="{default: 3, 991: 2, 767: 1}" :gutter="{default: '30px', 767: '15px'}">
      <div v-for="user in users" :key="user.id" class="card mb-4 box-shadow">
        <div class="card-header">
          <h2 class="my-0 font-weight-normal">{{user.data().displayName}}</h2><span>Username: {{user.data().uname}}</span></div>
        <div class="card-body">
          <h4 class="card-title" align="center">Short Introduction</h4>
          <p>{{user.data().bio}}</p>
          <div class="row justify-content-center align-items-center">
            <div class="col-auto">
              <router-link :to="{ name: 'profile', params: {uname:user.data().uname} }">
                <button class="btn btn-lg btn-block btn-primary">View Profile</button>
              </router-link>
            </div>
            <div class="col-auto">
              <router-link :to="{ name: 'chat', params: {uname:user.data().uname} }">
                <button class="btn btn-lg btn-block btn-primary">Chat</button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </masonry>
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
  name: 'allusers',
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  methods: {
    async checkTag() {
      let check = await db.collection('users').where("tags", "array-contains", this.tagInput).get()
      if (this.tagInput == null || this.tagInput == "") {
        this.tagempty = true
        let searchresults = await db.collection('users').get()
        this.users = searchresults.docs
      } else if (check.empty) {
        this.tagempty = false
        this.tagfound = false
        let searchresults = await db.collection('users').get()
        this.users = searchresults.docs
      } else if (check.empty == false) {
        this.tagempty = false
        this.tagfound = true
        let searchresults = await db.collection('users').where("tags", "array-contains", this.tagInput).get()
        this.users = searchresults.docs
      }
    },
    async reset() {
      let all = await db.collection('users').get()
      this.users = all.docs
      this.tagInput = null
      this.tagempty = null
      this.tagfound = null
    }
  },
  data() {
    return {
      users: null,
      tagempty: null,
      tagfound: null,
      tagInput: null
    }
  },
  async created() {
    let usersGet = await db.collection('users').get()
    this.users = usersGet.docs
  }
}
</script>

<style>
.container {
  padding-top: 40px;
  padding-bottom: 40px;
}

.material-icons.green {
  color: green;
}

.material-icons.red {
  color: red;
}

.availability {
  padding-top: 6px;
  padding-left: 3px;
}

.section-head {
  padding-left: 8px
}

.content {
  padding-left: 12px
}

.green {
  color: green;
}

.red {
  color: red;
}
</style>
