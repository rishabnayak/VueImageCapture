<template>
<main>
  <div class="container">
    <div class="jumbotron">
      <h4 class="mb-3">User Profile</h4>
      <h6 class="mb-3">All Fields are Required</h6>
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
        <div class="row">
          <div class="col-md-4 mb-3">
            <label for="city">City</label>
            <input type="text" class="form-control" id="city" v-model="city">
          </div>
          <div class="col-md-4 mb-3">
            <label for="state">State</label>
            <input type="text" class="form-control" id="state" v-model="stt">
          </div>
          <div class="col-md-4 mb-3">
            <label for="country">Country</label>
            <input type="text" class="form-control" id="country" v-model="country">
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 mb-3">
            <label for="number">Phone Number</label>
            <input type="text" class="form-control" id="number" v-model="number">
          </div>
          <div class="col-md-4 mb-3">
            <label for="affiliation">Current Affiliation</label>
            <input type="text" class="form-control" id="affiliation" placeholder="University/College/Company" v-model="affiliation">
          </div>
        </div>
        <h6 class="mb-3">Disabilities</h6>
        <p v-for="disability in disabilities" :key="disability.id">
          <span class="members">{{ disability }}</span>
        </p>
        <div class="row">
          <div class="col-md-auto">
            <label for="member">Disability</label>
            <div class="input-group">
              <input type="text" class="form-control" id="tag" onpaste="return false" v-model="disability" @input="checkDisability()">
              <button :disabled="disabilityempty||disabilityregd" class="btn" @click.prevent="addDisability()">Add</button>
              <div class="availability">
                <i v-if="disabilityempty" class="material-icons red">close</i>
                <i v-else-if="disabilityregd" class="material-icons red">close</i>
                <i v-else-if="disabilitysuccess" class="material-icons green">check</i>
              </div>
            </div>
            <p v-if="disabilityempty" class="red availability">Enter a Disability</p>
            <p v-else-if="disabilityregd" class="red availability">Disability already added!</p>
            <p v-else-if="disabilitysuccess" class="green availability">Add Disability!</p>
          </div>
        </div>
        <br>
        <h6 class="mb-3">Skills</h6>
        <p v-for="skill in skills" :key="skill.id">
          <span class="members">{{ skill }}</span>
        </p>
        <div class="row">
          <div class="col-md-auto">
            <label for="member">Skill</label>
            <div class="input-group">
              <input type="text" class="form-control" id="tag" onpaste="return false" v-model="skill" @input="checkSkill()">
              <button :disabled="skillempty||skillregd" class="btn" @click.prevent="addSkill()">Add</button>
              <div class="availability">
                <i v-if="skillempty" class="material-icons red">close</i>
                <i v-else-if="skillregd" class="material-icons red">close</i>
                <i v-else-if="skillsuccess" class="material-icons green">check</i>
              </div>
            </div>
            <p v-if="skillempty" class="red availability">Enter a Skill</p>
            <p v-else-if="skillregd" class="red availability">Skill already added!</p>
            <p v-else-if="skillsuccess" class="green availability">Add Skill!</p>
          </div>
        </div>
        <hr class="mb-4">
      </form>
      <button :disabled="unavailable||unameempty||fieldempty" class="btn btn-primary btn-lg btn-block col-md-3" type="submit" @click="updateProfile()&&checkAvailability()">Update</button>
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
      const ref = db.collection('users').doc(this.user.uid)
      await ref.update({
        bio: this.bio,
        city: this.city,
        stt: this.stt,
        country: this.country,
        number: this.number,
        affiliation: this.affiliation,
        uname: this.uname,
        tags: [this.city, this.stt, this.country, this.affiliation, this.uname, ...this.disabilities, ...this.skills]
      })
      this.$router.push({
        name: "profile",
        params: {
          uname: this.uname
        }
      })
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
    },
    async checkDisability() {
      let check = this.disabilities.find(disability => disability == this.disability)
      if (this.disability == null || this.disability == "") {
        this.disabilityempty = true
      } else if (check == undefined) {
        this.disabilityempty = false
        this.disabilityregd = false
        this.disabilitysuccess = true
      } else if (check != undefined) {
        this.disabilityempty = false
        this.disabilityregd = true
        this.disabilitysuccess = false
      }
    },
    async addDisability() {
      const ref = db.collection('users').doc(this.user.uid)
      this.disabilities = this.user.disabilities
      if (this.disabilitysuccess) {
        this.disabilities.push(
          this.disability
        )
        await ref.update({
          disabilities: this.disabilities
        })
        this.disability = null
        this.disabilitysuccess = null
      } else {
        return
      }
    },
    async checkSkill() {
      let check = this.skills.find(skill => skill == this.skill)
      if (this.skill == null || this.skill == "") {
        this.skillempty = true
      } else if (check == undefined) {
        this.skillempty = false
        this.skillregd = false
        this.skillsuccess = true
      } else if (check != undefined) {
        this.skillempty = false
        this.skillregd = true
        this.skillsuccess = false
      }
    },
    async addSkill() {
      const ref = db.collection('users').doc(this.user.uid)
      this.skills = this.user.skills
      if (this.skillsuccess) {
        this.skills.push(
          this.skill
        )
        await ref.update({
          skills: this.skills
        })
        this.skill = null
        this.skillsuccess = null
      } else {
        return
      }
    }
  },
  data() {
    return {
      bio: null,
      city: null,
      stt: null,
      country: null,
      number: null,
      affiliation: null,
      uname: null,
      available: null,
      unavailable: null,
      unameempty: null,
      imageText: null,
      image: null,
      storagePath: null,
      picStat: null,
      fileName: null,
      disabilities: null,
      disability: null,
      disabilityempty: null,
      disabilityregd: null,
      disabilitysuccess: null,
      skills: null,
      skill: null,
      skillempty: null,
      skillregd: null,
      skillsuccess: null,
      fieldempty: null
    }
  },
  mounted: function() {
    this.checkAvailability()
  },
  async created() {
    this.imageText = 'Click/Drag to Upload Profile Picture'
    this.bio = this.user.bio
    this.city = this.user.city
    this.stt = this.user.stt
    this.country = this.user.country
    this.number = this.user.number
    this.affiliation = this.user.affiliation
    this.uname = this.user.uname
    this.disabilities = this.user.disabilities
    this.skills = this.user.skills
    this.picStat = this.user.profilePic
    if (this.bio == undefined || this.city == undefined || this.stt == undefined || this.country == undefined || this.number == undefined || this.affiliation == undefined) {
      this.fieldempty = true
    }
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
