<template>
<v-layout row wrap>
  <v-flex xs7 offset-xs3>
    <panel title="Register">
      <div class="danger-alert" v-html="error"></div>
      <form name="contract-tracker-form" autocomplete="off">
        <v-text-field
          label="name"
          v-model="name"
        ></v-text-field>
          <v-text-field
          type="password"
          label="Password"
          v-model="password"
          autocomplete="new-password"
        ></v-text-field>
      </form>
      <v-btn class="teal darken-3" dark @click="register">Register</v-btn>
    </panel>
  </v-flex>
</v-layout>
</template>

<script>
import AuthenticationService from '../../services/AuthenticationService.js'
export default {
  data() {
    return {
      name: '',
      password: '',
      error: null,
    };
  },
  methods: {
    async register() {
      try {
        const response = await AuthenticationService.register({
          name: this.name,
          password: this.password
        });
        this.error = response
        this.$store.dispatch('setToken', response.data.token);
        this.$store.dispatch('setUser', response.data.user);
        this.$router.push('/');        
      } catch (error) {
        this.error = error.response.data.errors[0].message;
      }
    }
  }
};
</script>
<style scoped>
.danger-alert {
  color: red;
}
</style>
