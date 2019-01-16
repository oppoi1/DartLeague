<template>
<v-layout row wrap>
  <v-flex xs-7>
    <div v-for="league in leagues" :key="league"> -->
      <div>
      <v-btn :to="{name: 'leagueView', params: {tId: league.id}}">
        {{league.id}}
      </v-btn>
      </div>
      <div>
      Name:{{league.name}}
      </div>
      <div>
      Participants:{{league.cParticipants}}
      </div>
      <div>
      Game:{{league.game}}
      </div>
      <div>
      Table:{{league.tableId}}
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
      leagues: [],
      error: null
    }
  },
  async mounted() {
     try {
        const response = (await LeagueService.getAllLeagues()).data
      if(response.data.errors) {
        this.error = response.data.errors[0].message
      }
        this.leagues = response.data.getAllLeagues
      } catch(error) {
        this.error = error.response.data.errors[0].message
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
