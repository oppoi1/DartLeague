<template>
  <v-app>
    <Navigation/>>
    <main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </main>
    <Footer/>>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import Navigation from './components/static/Navigation'
import Footer from './components/static/Footer'

export default {
  name: 'App',
  components: {
    HelloWorld,
    Navigation,
    Footer
  },
  data () {
    return {
      //
    }
  }
}
</script>
