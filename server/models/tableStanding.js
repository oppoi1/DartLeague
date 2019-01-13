import Sequelize from 'sequelize'
import sequelize from '../util/db'

const TableStanding = sequelize.define('tableStanding', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  player: Sequelize.STRING,
  win: Sequelize.INTEGER,
  loss: Sequelize.INTEGER,
  cSpiele: Sequelize.INTEGER
})

export default TableStanding 