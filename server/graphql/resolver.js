import User from '../models/user'
import League from '../models/league'
import TableStandings from '../models/tableStanding'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import validator from 'validator'

// query example
/*
mutation {
  signUp (userInput: {
    email: "ppoi@wow.com"
    password:"13371337",
    firstName: "dave",
    lastName: "wanne"
  })
  {
  id
  email
  }
}


**new**:
Relationship to addresses
example:
return User.create({
  email: '...',
  password: '...',
  firstName: '...',
  lastName: '...'
  addresses: {
    type: 'home',
    line_1: 'Bahnhofstr'
    city: 'Soest'
    state: 'NRW',
    zip: '33042'
  }
})
which saves a user and an address!

maybe useful for later if we get a full signup formular
http://docs.sequelizejs.com/manual/tutorial/associations.html#creating-elements-of-a-belongsto-has-many-or-hasone-association
Title: Creating elements of a "BelongsTo", "Has Many" or "HasOne" association
*/

module.exports = {
  signUp: async function({userInput, req}) {
    console.log(`userinput ${userInput.email}`)
    const errors = []
    // check if Email and PW follow the given rules
    if(!validator.isEmail(userInput.email)) {
      errors.push({message: 'Email is invalid.'})
    }
    if(validator.isEmpty(userInput.password) || !validator.isLength(userInput.password, {min: 6})) {
      errors.push({message: 'Password is not long enough. Password must use at least 6 letters.'})
    }
    // if Email/PW not valid throw error
    if(errors.length > 0) {
      console.log(`errors ${errors}`)
      const error = new Error(errors[0])
      error.data = errors
      error.code = 422
      throw error
    }
    // if no error check if User already exists
    const existingUser = await User.findOne({where: {email: userInput.email}})
    if(existingUser) {
      console.log(`User exists ${userInput.email}`)
      const error = new Error('User already exists.')
      error.code = 422
      throw error
    }
    // hash pw and save User
    const hashedPw = await bcrypt.hash(userInput.password, 12) // hash with 12 length
    const user = new User({
      email: userInput.email,
      password: hashedPw,
      firstName: userInput.firstName,
      lastName: userInput.lastName
    })
    const createdUser = await user.save()
    return createdUser
  },

  /**
   * async login
   * check email and pw
   * generate jwt and return it
   */

   //query example

  /*
   query {
    login(
      email: "ppoi@wow.com",
      password: "13371337"
    ) {
      token
      userId
    }
  }
  */
  login: async function({email, password}) {
    // find User by Email
    const user = await User.findOne({where: {email: email}})
    if(!user) {
      console.log(user)
      const error = new Error('Email or Password wrong.')
      error.code = 401
      throw error
    }
    // check pw
    const validPw = await bcrypt.compare(password, user.password)
    if(!validPw) {
      const error = new Error('Email or Password wrong...')
      error.code = 401
      throw error
    }
    // create jwt
    const token = jwt.sign({
      userId: user.id,
      email: user.email
    }, process.env.secret, {expiresIn: '24h'})
    console.log(`User logged in!`)
    return {
      token: token, userId: user.id
    }
  },
  user: async function(args, req) {
    // find user by id and return it
    console.log(args.id)
    const user = await User.findByPk(args.id)
    if(!user) {
      const error = new Error('No user found.')
      error.code = 404
      throw error
    }
    console.log(user.id)
    return user
  },
  /**
   * Create Table and League in DB
   */
/*
  mutation {
    createLeague (leagueInput:{
      cParticipants: 10,
      name: "Premier League",
      game: "dart"
    }) 
    {
      id,
      cParticipants,
      name,
      tableId
    }
  }
*/
  createLeague: async function({leagueInput, req}) {
    console.log(leagueInput)
    const errors = []
    if(validator.isEmpty(leagueInput.name)) {
      errors.push({message: `No name given.`})
    }

    // maybe more validation needed later on?
    if(errors.length > 0) {
      console.log(`errors ${errors}`)
      const error = new Error(errors[0])
      error.data = errors
      error.code = 422
      throw error
    }

    const existingLeague = await League.findOne({where: {name: leagueInput.name}})
    if(existingLeague) {
      console.log(`League exists already. ${leagueInput.name}`)
      const error = new Error('League exists already.')
      error.code = 422
      throw error
    }

    // creates and saves League and Table in one step
    return League.create({
      cParticipants: leagueInput.cParticipants,
      name: leagueInput.name.toLowerCase(),
      game: leagueInput.game.toLowerCase(),
      table: {
        name: leagueInput.name.toLowerCase()
      }
    },
    {
      include: [{
        association: League.Table
      }]
    })
  },

  /*
query {
  getLeague(id: "1") {
    id,
    cParticipants,
    name,
    game,
    tableId
  }
}
*/
  getLeague: async function(args, req) {
    console.log(args.id)
    const errors = []
    if(!args.id) {
      errors.push({message: `No id given.`})
    }
    // can only check strings?
    // if(validator.isEmpty(args.id)) {
    //   errors.push({message: `No id given.`})
    // }

    if(errors.length > 0) {
      console.log(`error: ${errors[0]}`)
      const error = new Error()
      error.data = errors
      error.code = 422
      throw error
    }
    const league = await League.findByPk(args.id)
    if(!league) {
      const error = new Error(`League not found with id ${args.id}`)
      error.code = 404
      throw error
    }
    return league
  },


/*
query {
  getAllLeagues {
    id,
    cParticipants,
    name,
    game,
    tableId
  }
}
*/
  getAllLeagues: async function(req) {
    const leagues = await League.findAll()
    if(!leagues) {
      const error = new Error(`No league found.`)
      error.code = 404
      throw error
    }
    return leagues
  },


  /*
query {
  joinLeague (joinData:{
    userId: 1,
    tableId: 1
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

  */

  // user join league
  joinLeague: async function({joinData, req}) {
    // tableId and userId expected
    console.log(joinData)
    const errors = []
    // if(validator.isEmpty(joinData.userId)) {
    //   errors.push({message: 'No last name given.'})
    // }

    if(errors.length > 0) {
      const error = new Error('Something went wrong')
      error.code = 422
      throw error
    }

    // check tabble
    const existingLeague = await League.findOne({where: {tableId: joinData.tableId}})
    if(!existingLeague) {
      const error = new Error(`Couldn't find league.`)
      error.code = 404
      throw error
    }

    const existingUser = await TableStandings.findOne({where: {player: joinData.userId, tableId: joinData.tableId}})
    if(existingUser) {
      console.log(`Error User is already in League`)
      const error = new Error(`You are already in that league.`)
      error.code = 402
      throw error
    }

    return TableStandings.create({
      player: joinData.userId, tableId: joinData.tableId
    })

    // return TableStandings
    // // const tsTanding = TableStandings
    // .findOrCreate({where: {player: joinData.userId}, 
    //   defaults: {
    //     player: joinData.userId, tableId: joinData.tableId, win: '0', loss: '0', cSpiele: '0'
    //   }})
    // // .spread((tableStanding, created) => {
    //   console.log(tableStanding.get({
    //     plain: true
    //   }))
    //   console.log(created)
    // })
  }
}