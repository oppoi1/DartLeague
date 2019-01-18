import Api from 'axios'
import * as CONFIG from '../config/config'

export default {
  getAllLeagues() {
    return Api({
      url: CONFIG.url,
      method: CONFIG.method,
      data: {
        query: 
          `
          query {
            getAllLeagues {
              id,
              cParticipants,
              name,
              game,
              tableId
            }
          }
          `
      }
    })
  },
  getLeagues(credentials) {
    return Api({
      url: CONFIG.url,
      method: CONFIG.method,
      data: {
        query: 
        `
        query {
          getLeague(id: ${credentials}) {
            id,
            cParticipants,
            name,
            tableId
          }
        }
        `
      }
    })
  },
  createLeague(credentials) {
    return Api({
      url: CONFIG.url,
      method: CONFIG.method,
      data: {
        query: 
        `
        mutation {
          createLeague (leagueInput:{
            cParticipants: ${credentials.cParticipants},
            name: ${credentials.name},
            game: ${credentials.game}
          }) 
          {
            id,
            cParticipants,
            name,
            tableId
          }
        }
        `
      }
    })
  },
  joinLeauge(credentials) {
    // tableId and lastName expected
    return Api({
      url: CONFIG.url,
      method: CONFIG.method,
      data: {
        query: 
        `
        query {
          joinLeague (joinData:{
            userId: ${credentials.userId},
            tableId: ${credentials.tableId}
          })
          {
            tableId,
            player,
            win,
            loss,
            cSpiele,
            createdAt
          }
        }
        `
      }
    })
  },
  getStandings(credentials) {
    //eslint-disable-next-line
    return Api({
      url: CONFIG.url,
      method: CONFIG.method,
      data: {
        query: 
        `
        query {
          getStandings(id: ${credentials.tableId}) {
            id,
            player,
            win,
            loss,
            cSpiele,
            createdAt
          }
        }
        `
      }
    })
  }
}