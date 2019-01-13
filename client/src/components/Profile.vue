<template>
<v-layout row wrap>
  <v-flex xs-7 offset-xs3>
    {{ user.lastName }} - {{ user.id }}
    <v-img :src="`http://shackmanlab.org/wp-content/uploads/2013/07/person-placeholder.jpg`" max-height="150px" max-width="150px" aspect-ratio="1" class="grey lighten-2"></v-img>
    <p>Name: {{ capitalize(user.firstName) }} {{ capitalize(user.lastName) }}</p>
    <p>
    Member: {{ user.createdAt }}
    </p>
    <p>
    {{user}}
    </p>
    <p>

    </p>


  </v-flex>
</v-layout>
</template>

<script>
import UserService from '../services/UserService.js'
export default {
  data() {
    return {
      user: {},
      register: ''
    }
  },
  async mounted () {
    const userId = this.$store.state.route.params.userId
    try {
      this.user = (await UserService.getUser(userId)).data.data.user
    } catch (error) {
      // eslint-disable-next-line
      console.log(error)
    }
  },
  methods: {
    capitalize (string) {
      if (typeof string !== 'string') return ''
      return string.charAt(0).toUpperCase() + string.slice(1)
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
p:first-letter {
  text-transform: capitalize
}
</style>
