import Sequelize from 'sequelize'
import sequelize from '../util/db'

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  status: {
    type: Sequelize.STRING,
    default: 'test'
  },
  resetToken: Sequelize.STRING,
  resetTokenExpiration: Sequelize.DATE
})

export default User