import Api from 'axios'
import * as CONFIG from '../config/config'

export default {
  register(credentials) {
    return Api({
      url: CONFIG.url,
      method: CONFIG.method,
      data: {
        query: 
        `
        mutation {
          signUp (userInput: {
            email: "${credentials.name}",
            password: "${credentials.password}",
            firstName: "dave",
            lastName: "wanne"
          })
          {
          id
          email
          }
        }
        `
      }
    })
  },
  login(credentials) {
    return Api({
      url: CONFIG.url,
      method: CONFIG.method,
      data: {
        query: 
        `
        query {
          login(
            email: "${credentials.name}",
            password: "${credentials.password}"
          ) {
            token
            userId
          }
        }
        `
      }
    })
  }
}