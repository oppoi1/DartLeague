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
            status,
            createdAt
          }
        }
        `
      }
    })
  }
}