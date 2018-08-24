<template>
  <main role="main">
    <section class="jumbotron text-center">
        <div class="container">
          <h1 class="jumbotron-heading">Vue ImageCapture</h1>
          <p class="lead text-muted">Testing Web App</p>
        </div>
      </section>
        <div class="album py-5 bg-light">
              <div class="container">
                <div class="row">
                  <div class="col-md-4">
                    <div class="card mb-4 shadow-sm">
                      <img class="card-img-top" alt="Thumbnail" style="height: 225px; width: 100%; display: block;">
                      <div class="card-body">
                        <h4>Lorem Ipsum</h4>
                        <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="card mb-4 shadow-sm">
                      <img class="card-img-top" alt="Thumbnail" style="height: 225px; width: 100%; display: block;">
                      <div class="card-body">
                        <h4>Lorem Ipsum</h4>
                        <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="card mb-4 shadow-sm">
                      <img class="card-img-top" alt="Thumbnail" style="height: 225px; width: 100%; display: block;">
                      <div class="card-body">
                        <h4>Lorem Ipsum</h4>
                        <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                      </div>
                    </div>
                  </div>
                </div>
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
import firebaseui from 'firebaseui'
import db from '@/firebase/init.js'
export default {
  computed: {
    user () {
      return this.$store.state.user
    }
  }
}
</script>
