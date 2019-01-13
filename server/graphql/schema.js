import { buildSchema } from "graphql";


/**
 * Schema quite similar to Sequelize schemas
 * One API endpoint to transfer all
 * Todo: Forum posts, comments under matches in a league...
 */
module.exports = buildSchema(`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    status: String!
    createdAt: String!
  }
  
  type AuthData {
    token: String!
    userId: String!
  }

  input userData {
    email: String!
    firstName: String!
    lastName: String!
    password: String!
  }

  type RootQuery {
    login(email: String!, password: String!): AuthData
    user(id: ID!): User!
  }

  type RootMutation {
    signUp(userInput: userData): User!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`)