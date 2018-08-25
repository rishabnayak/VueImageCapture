<template>
<main class="content">
  <div class="container">
    <div class="jumbotron text-center">
      <video class="embed-responsive" ref="video" autoplay playsinline></video>
      <canvas ref="canvas" width="56" height="152" hidden></canvas>
      <br>
      <p>{{out}}</p>
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
      canvas: null,
      out: null,
      calibrated: null
    }
  },
  async mounted() {
    let ref = db.collection('users').doc(this.user.uid)
    var data = await ref.get()
    if (data.data().calibration == undefined) {
      this.$router.push({
        name: "calibration"
      })
    } else {
      this.calibrated = data.data().calibration
      this.video = this.$refs.video;
      this.canvas = this.$refs.canvas;
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
            var avg;
            var conc;
            var rafId;
            var CANVAS_WIDTH = this.canvas.width;
            var CANVAS_HEIGHT = this.canvas.height;
            var context;
            var fps = 1;
            var now;
            var then = performance.now();
            var interval = 1000 / fps;
            var delta;
            var context = this.canvas.getContext('2d');
            let _this = this

            function drawVideoFrame(time) {
              rafId = requestAnimationFrame(drawVideoFrame);
              now = performance.now();
              delta = now - then;
              if (delta > interval) {
                then = now - (delta % interval);
                context.drawImage(_this.video, 295.69, 187.09, CANVAS_WIDTH, CANVAS_HEIGHT, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
                var origData = context.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
                for (var i = 0; i < origData.data.length; i += 4) {
                  origData.data[i] = 0;
                  origData.data[i + 1] = 0;
                  origData.data[i + 3] = 0;
                }
                var sum = 0;
                for (var i = 0; i < origData.data.length; i++) {
                  sum = sum + origData.data[i];
                }
                avg = sum / (CANVAS_WIDTH * CANVAS_HEIGHT);
                conc = avg / _this.calibrated;
                var outconc = conc.toFixed(2);
                _this.out = "The concentration is " + outconc + "mg/L";
              }
            };
            rafId = requestAnimationFrame(drawVideoFrame);
          })
          .catch(function(error) {
            document.body.textContent = 'Could not access the camera. Error: ' + error.name;
          });
      }
    }
  }
}
</script>

<style>
.content {
  padding-top: 10px
}
</style>
