<template>
<v-layout row wrap>
  <v-flex xs7 offset-xs3>
    <panel title="Login">
      <div class="danger-alert" v-html="error"></div>
      <v-text-field
        label="name"
        v-model="name"
      ></v-text-field>
        <v-text-field
        type="password"
        label="Password"
        v-model="password"
      ></v-text-field>
      <v-btn class="teal darken-3" dark @click="login">Login</v-btn>
    </panel>
  </v-flex>
</v-layout>
</template>

<script>
import AuthenticationService from '../../services/AuthenticationService';
export default {
  data() {
    return {
      name: '',
      password: '',
      error: '',
      response: ''
    };
  },
  methods: {
    async login() {
      const response = await AuthenticationService.login({
        name: this.name,
        password: this.password
      });
      if(response.data.errors) {
        this.error = response.data.errors[0].message
      }
      this.$store.dispatch('setToken', response.data.data.login.token);
      this.$store.dispatch('setUser', response.data.data.login.userId);
      this.$router.push('/');
    }
  }
};
</script>
<style scoped>
.danger-alert {
  color: red;
}
</style>
