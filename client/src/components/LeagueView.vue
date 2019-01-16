<template>
<v-layout row wrap>
  <v-flex xs-7>
    <div> -->
      <div>
      Name: {{league.name}}
      </div>
      <div>
      tID: {{league.tableId}}
      </div>
      <div>
      LiD: {{league.id}}
      </div>
    </div>
  </v-flex>
</v-layout>
</template>

<script>
import LeagueService from '../services/LeagueService'

export default {
  data() {
    return {
      league: {},
      error: null
    }
  },
  async mounted() {
    const league = this.$store.state.route.params.tId
     try {
        const response = (await LeagueService.getLeagues(league)).data
      if(response.data.errors) {
        this.error = response.data.errors[0].message
      }
        this.league = response.data.getLeague
      } catch(error) {
        this.error = error.response.data.errors[0].message
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
