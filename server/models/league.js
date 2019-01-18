import Sequelize from 'sequelize'
import sequelize from '../util/db'

const League = sequelize.define('league', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  cParticipants: Sequelize.INTEGER, // only for tournaments
  name: Sequelize.STRING,
  game: Sequelize.STRING
})

export default League