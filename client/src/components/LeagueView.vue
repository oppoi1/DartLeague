<template>
<v-layout row wrap>
  <v-flex xs-7>
    <div class="error--text">
      {{error}}
    </div>
    <div class="success">
      {{success}}
    </div>
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
      <div>
        user Id: {{user}}
      </div>
      <v-btn class="test" @click="joinLeague(user, league.tableId)">Join</v-btn>
      <v-btn class="test" @click="getStandings(league.tableId)">Standings</v-btn>
      <div>
        Standings
        <div>
          {{ standings }}
        </div>
        <div v-for="standing in standings" :key="standing">
          {{ standing.id }} - {{ standing.player }} - stats: {{ standing.win }}:{{ standing.loss }} 
        </div>
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
      user: 0,
      standings: {},
      error: null,
      success: null,
    }
  },
  async mounted() {
    const league = this.$store.state.route.params.tId
    this.user = this.$store.state.user

    try {
      const response = (await LeagueService.getLeagues(league)).data
    if(response.data.errors) {
      this.error = response.data.errors[0].message
    }
      this.league = response.data.getLeague
    } catch(error) {
      this.error = error.response.data.errors[0].message
    }
  },
  methods: {
    async joinLeague(userId, tableId) {
      const response = await LeagueService.joinLeauge({
        userId: userId,
        tableId: tableId
      })
      if(response.data.errors) {
        this.error = response.data.errors[0].message
        return
      }
      this.success = 'Successfully entered!'
    },
    async getStandings(tableId) {
      const response = await LeagueService.getStandings({
        tableId: tableId
      })
      if(response.data.errors) {
        this.error = response.data.errors[0].message
      return
      }
      this.standings = response.data.data.getStandings
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
