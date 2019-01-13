import Sequelize from 'sequelize'
import sequelize from '../util/db'

const League = sequelize.define('league', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  cParticipans: Sequelize.INTEGER,
  name: Sequelize.STRING
})
// fk: table ID

export default League