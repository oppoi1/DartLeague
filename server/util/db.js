import Sequelize from 'sequelize'

const sequelize = new Sequelize(
  process.env.database,
  process.env.user,
  process.env.password, 
  {
    dialect: 'mysql',
    host: process.env.host,
    timezone: 'Europe/Berlin'
  }
)

export default sequelize