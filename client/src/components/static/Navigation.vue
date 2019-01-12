<template>
  <v-toolbar fixec class="teal darken-3" dark>
    <v-toolbar-title class="mr-4">
      DartLeague
    </v-toolbar-title>
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
.navigation {
  float: left;
}
</style>

