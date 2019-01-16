<template>
  <v-toolbar fixec class="teal darken-3" dark>
    <v-toolbar-title class="mr-4">
      <v-btn to="/" flat dark>
        DartLeague
      </v-btn>
    </v-toolbar-title>
    <v-toolbar-items>
      <v-btn to="/dart/de" flat dark>Dart League</v-btn>
    </v-toolbar-items>
    <v-toolbar-items>
      <v-btn to="/login" flat dark v-if="!$store.state.isUserLoggedIn">
        Login
      </v-btn>
    </v-toolbar-items>
    <v-toolbar-items>
      <v-btn to="/register" flat dark v-if="!$store.state.isUserLoggedIn">
        Sign Up
      </v-btn>
    </v-toolbar-items>
    <v-toolbar-items>
      <v-btn @click="logout" flat dark v-if="$store.state.isUserLoggedIn">
        Logout
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  name: 'Navigation',
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'root'
      })
    }
  }
}
</script>
<style scoped>

</style>

