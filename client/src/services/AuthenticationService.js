import Api from 'axios'

export default {
  register(credentials) {
    return Api({
      url: `http://localhost:3001/graphql`,
      method: 'post',
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
      url: `http://localhost:3001/graphql`,
      method: 'post',
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