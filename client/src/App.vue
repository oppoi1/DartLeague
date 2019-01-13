<template>
  <div id="app">
    <v-app>
      <Navigation/>
      <main>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </main>
      <Footer/>
    </v-app>
  </div>
</template>

<script>
import Navigation from './components/static/Navigation.vue'
import Footer from './components/static/Footer.vue'

export default {
  name: 'app',
  components: {
    Navigation,
    Footer
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
