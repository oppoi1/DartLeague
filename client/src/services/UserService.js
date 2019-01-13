import Api from 'axios'

export default {
  getUser(credentials) {
    return Api({
      url: `http://localhost:3001/graphql`,
      method: 'post',
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