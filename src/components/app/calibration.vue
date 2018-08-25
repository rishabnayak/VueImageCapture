<template>
<main class="content">
  <div class="container">
    <div class="jumbotron text-center">
      <video class="embed-responsive" ref="video" autoplay plays-inline></video>
      <canvas ref="canvas1" width="32" height="32" hidden></canvas>
      <canvas ref="canvas2" width="32" height="32" hidden></canvas>
      <canvas ref="canvas3" width="32" height="32" hidden></canvas>
      <br>
      <button class="btn btn-primary" @click.prevent="capture">Calibrate</button>
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
  name: 'app',
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  data() {
    return {
      video: null,
      canvas1: null,
      canvas2: null,
      canvas3: null
    }
  },
  async mounted() {
    this.video = this.$refs.video;
    if (navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "environment",
            width: {
              exact: 640
            },
            height: {
              exact: 480
            }
          }
        }).then(stream => {
          this.video.srcObject = stream;
        })
        .catch(function(error) {
          document.body.textContent = 'Could not access the camera. Error: ' + error.name;
        });
    }
  },
  methods: {
    async capture() {
      this.canvas1 = this.$refs.canvas1;
      this.canvas2 = this.$refs.canvas2;
      this.canvas3 = this.$refs.canvas3;
      this.canvas1.getContext("2d").drawImage(this.video, 0, 0, this.canvas1.width, this.canvas1.height, 0, 0, this.canvas1.width, this.canvas1.height);
      this.canvas2.getContext("2d").drawImage(this.video, 0, 448, this.canvas1.width, this.canvas1.height, 0, 0, this.canvas2.width, this.canvas2.height);
      this.canvas3.getContext("2d").drawImage(this.video, 608, 0, this.canvas1.width, this.canvas1.height, 0, 0, this.canvas3.width, this.canvas3.height);
      var Data1 = this.canvas1.getContext("2d").getImageData(0, 0, this.canvas1.width, this.canvas1.height);
      for (var i = 0; i < Data1.data.length; i += 4) {
        Data1.data[i] = 0;
        Data1.data[i + 1] = 0;
        Data1.data[i + 3] = 0;
      }
      var sum1 = 0;
      for (var i = 0; i < Data1.data.length; i++) {
        sum1 = sum1 + Data1.data[i];
      }
      var avg1 = sum1 / (this.canvas1.width * this.canvas1.height)
      var Data2 = this.canvas2.getContext("2d").getImageData(0, 0, this.canvas2.width, this.canvas2.height);
      for (var i = 0; i < Data2.data.length; i += 4) {
        Data2.data[i] = 0;
        Data2.data[i + 2] = 0;
        Data2.data[i + 3] = 0;
      }
      var sum2 = 0;
      for (var i = 0; i < Data2.data.length; i++) {
        sum2 = sum2 + Data2.data[i];
      }
      var avg2 = sum2 / (this.canvas2.width * this.canvas2.height)
      var Data3 = this.canvas3.getContext("2d").getImageData(0, 0, this.canvas3.width, this.canvas3.height);
      for (var i = 0; i < Data3.data.length; i += 4) {
        Data3.data[i] = 0;
        Data3.data[i + 3] = 0;
        Data3.data[i + 3] = 0;
      }
      var sum3 = 0;
      for (var i = 0; i < Data3.data.length; i++) {
        sum3 = sum3 + Data3.data[i];
      }
      var avg3 = sum3 / (this.canvas3.width * this.canvas3.height)
      var m1 = (avg3 - avg1) / (300 - 30)
      var m2 = (avg3 - avg2) / (300 - 150)
      var m3 = (avg2 - avg1) / (150 - 30)
      var m = (m1 + m2 + m3) / 3
      let ref = db.collection('users').doc(this.user.uid)
      await ref.update({
        calibration: m
      })
      this.$router.push({
        name: "app"
      })
    }
  }
}
</script>

<style>
.content {
  padding-top: 10px
}
</style>
