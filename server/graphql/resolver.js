import User from '../models/user'
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
    // why am I using this
    const user = await User.findByPk(req.userId)
    if(!user) {
      const error = new Error('No user found.')
      error.code = 404
      throw error
    }
    return user
  }
}