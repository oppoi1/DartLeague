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
      <div v-if="user">
        <v-btn class="test" @click="leaveLeague(user, league.tableId)">Leave</v-btn>
      </div>
      <div v-else>
         <v-btn class="test" @click="joinLeague(user, league.tableId)">Join</v-btn>
      </div>
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
      user: null,
      standings: {},
      error: null,
      success: null,
    }
  },
  async mounted() {
    // get table and userId from store
    const league = this.$store.state.route.params.tId
    this.user = this.$store.state.user

    try {
      // changed from const response = await LeagueService.getLeagues(league).data
      const { data: response } = await LeagueService.getLeagues(league)
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
    async leaveLeague(userId, tableId) {
      const response = await LeagueService.leaveLeague({
        userId: userId,
        tableId: tableId
      })
      if(response.data.errors) {
        this.error = response.data.errors[0].message
        return
      }
      this.success = 'Successfully left the league.'
    },
    async getStandings(tableId) {
      // deconstructuring data in new variable response
      const { data: response } = await LeagueService.getStandings({
        tableId: tableId
      })
      if(response.data.errors) {
        this.error = response.data.errors[0].message
      return
      }
      this.standings = response.data.getStandings
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
