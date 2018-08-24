<template>
<main>
  <div class="container">
    <div class="jumbotron">
      <h4 class="mb-3">User Profile</h4>
      <h6 class="mb-3">All Text Fields are Required</h6>
      <form>
        <div class="container">
          <div v-if="this.picStat == undefined" class="uploader d-flex flex-column justify-content-center align-items-center rounded">
            <p>{{imageText}}</p>
            <input id="filePhoto" type="file" accept="image/*" @change="onFileChanged($event)">
          </div>
          <div v-else style="text-align:center">
            <img class="round img" :src="user.profilePic[0]"></img>
            <span class=" btn text-muted" @click="deleteProfilePic()">Remove</span>
          </div>
        </div>
        <div class="row">
          <div class="col-md-auto mb-3">
            <label for="username">Username</label>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">@</span>
              </div>
              <input type="text" class="form-control" id="username" onpaste="return false" v-model="uname" @input="checkAvailability()">
              <div class="availability">
                <i v-if="unameempty" class="material-icons red">close</i>
                <i v-else-if="available" class="material-icons green">check</i>
                <i v-else-if="unavailable" class="material-icons red">close</i>
              </div>
            </div>
            <p v-if="unameempty" class="red availability">Enter a Username</p>
            <p v-else-if="available" class="green availability">Username available!</p>
            <p v-else-if="unavailable" class="red availability">Username unavailable!</p>
          </div>
        </div>
        <div class="mb-3">
          <label for="bio">Short Introduction</label>
          <textarea class="form-control" rows="5" id="bio" v-model="bio"></textarea>
        </div>
        <hr class="mb-4">
      </form>
      <button :disabled="unavailable||unameempty" class="btn btn-primary btn-lg btn-block col-md-3" type="submit" @click="updateProfile()&&checkAvailability()">Update</button>
      <p v-if="fieldempty" class="red availability">Please fill in all data!</p>
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
  name: 'editprofile',
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  methods: {
    async updateProfile() {
      if (this.bio == undefined) {
        this.fieldempty = true
        return
      } else {
        const ref = db.collection('users').doc(this.user.uid)
        await ref.update({
          bio: this.bio,
          uname: this.uname
        })
        this.$router.push({
          name: "profile",
          params: {
            uname: this.uname
          }
        })
      }
    },
    async deleteProfilePic() {
      const ref = db.collection('users').doc(this.user.uid)
      const storage = firebase.storage().ref()
      const firestorageRef = storage.child(this.user.profilePic[1])
      firestorageRef.delete().then(function() {
        // File deleted successfully
      }).catch(function(error) {
        // Uh-oh, an error occurred!
      });
      await ref.update({
        profilePic: firebase.firestore.FieldValue.delete()
      });
      location.reload()
    },
    async onFileChanged(obj) {
      this.image = obj.target.files[0]
      this.imageText = "Uploading..."
      this.fileName = Date.now()
      this.storagePath = "profiles/" + this.user.uname + "/" + this.fileName
      const storage = firebase.storage().ref()
      const ref = storage.child(this.storagePath)
      await ref.put(this.image).then(snapshot => {
        this.imageText = obj.target.files[0].name + " Uploaded!"
        this.picStat = true
      })
      const url = await ref.getDownloadURL()
      const userRef = db.collection('users').doc(this.user.uid)
      await userRef.update({
        profilePic: [url, this.storagePath]
      })
      location.reload()
    },
    async checkAvailability() {
      if (this.uname == undefined) {
        this.unameempty = true
      } else {
        let checkname = await db.collection('users').where("uname", "==", this.uname).get()
        if (this.uname == null || this.uname == "") {
          this.unameempty = true
        } else if (checkname.empty || checkname.docs[0].data().uname == this.user.uname) {
          this.available = true
          this.unameempty = false
          this.unavailable = false
        } else {
          this.available = false
          this.unameempty = false
          this.unavailable = true
        }
      }
    }
  },
  data() {
    return {
      bio: null,
      uname: null,
      available: null,
      unavailable: null,
      unameempty: null,
      imageText: null,
      image: null,
      storagePath: null,
      picStat: null,
      fileName: null,
      fieldempty: null
    }
  },
  mounted: function() {
    this.checkAvailability()
  },
  async created() {
    this.imageText = 'Click/Drag to Upload Profile Picture'
    this.bio = this.user.bio
    this.uname = this.user.uname
    this.picStat = this.user.profilePic
  }
}
</script>

<style>
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

.uploader {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 300px;
  background: #f3f3f3;
  border: 2px;
}

#filePhoto {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

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

.green {
  color: green;
}

.red {
  color: red;
}
</style>
