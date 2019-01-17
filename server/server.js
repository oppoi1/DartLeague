import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import graphqlHttp from 'express-graphql'
import graphqlSchema from './graphql/schema'
import graphqlResolver from './graphql/resolver'
import path from 'path'
import fs from 'fs'
import multer from 'multer'
import sequelize from './util/db'
import https from 'https'
import User from './models/user'
import Team from './models/team'
import League from './models/league'
import Table from './models/table'
import TableStanding from './models/tableStanding'
import TableHistory from './models/tableHistory'
import Addresses from './models/address'
// todo: logging, quite a lot logging!

const app = express()

app.use(bodyParser.urlencoded({extended: true})) // get form data
app.use(bodyParser.json()) // parse json data from incoming requests
// todo: use multer
app.use('/images', express.static(path.join(__dirname, 'images'))) // open up images to public

// allow cors middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*') // * wildcard, later when host is known change to host
  res.setHeader('Access-Control-ALlow-Methods', 'GET, POST, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization') // allow authorization in header
  if(req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }
  next()
})

// todo: check if logged in

//check graphql queries
app.use('/graphql', (req, res, next) => {
  console.log(`query: ${JSON.stringify(req.body)}`)
  next()
})

// graphql api endpoint
app.use('/graphql', graphqlHttp({
  schema: graphqlSchema,
  rootValue: graphqlResolver,
  graphiql: true,
  formatError(err) { // error handling
    if(!err.originalError) {
      return err
    }
    const data = err.originalError.data
    const message = err.message || 'An error occurred'
    const code = err.originalError.code || 500
    return { message: message, status: code, data: data }
  }
}))

// express error handler
// todo: lead to 500 page
app.use((error, req, res, next) => {
  console.log(error)
  const status = error.statusCode || 500
  const message = error.message
  const data = error.data
  res.status(status).json({
    message: message,
    data: data
  })
})

User.hasMany(Team)
User.Adresses = User.hasMany(Addresses) // to create one or more addresses when creating user
League.Table = League.belongsTo(Table) // to use it as include when creating class object
TableStanding.Table = TableStanding.belongsTo(Table) // necessary?
// TableStanding.belongsTo(Table)
TableHistory.belongsTo(Table)

sequelize.sync({force: false})
.then(result => {
  app.listen(process.env.port || 8081)
  console.log(`Magic happens on port ${process.env.port}`)
})
.catch(err => console.log(err))