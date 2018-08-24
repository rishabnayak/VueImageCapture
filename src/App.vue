<template>
<div id="app">
  <navigation/>
  <router-view/>
</div>
</template>

<script>
import navigation from '@/components/navigation'
import store from '@/store/store.js'
export default {
  name: 'App',
  store,
  components: {
    navigation
  },
  data() {
    return {}
  }
}
</script>
