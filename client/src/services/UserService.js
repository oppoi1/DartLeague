import Api from 'axios'
import * as CONFIG from '../config/config'

export default {
  getUser(credentials) {
    return Api({
      url: CONFIG.url,
      method: CONFIG.method,
      data: {
        query: 
        `
        query {
          user(id: "${credentials}") {
            id,
            firstName,
            lastName,
            email,
            group,
            createdAt
          }
        }
        `
      }
    })
  },
  userInLeague(credentials) {
    return Api({
      url: CONFIG.url,
      method: CONFIG.method,
      data: {
        query: 
        `
        query {
          userInLeague(joinData:{
            tableId: ${credentials.tableId},
            userId: ${credentials.userId}
          }),
          {
            id,
            player,
            win,
            loss,
            active
          }
        }
        `
      }
    })
  }
}