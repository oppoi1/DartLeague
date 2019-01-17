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
  win: {
    type: Sequelize.INTEGER,
    defaultValue: '0'
  },
    loss: {
      type: Sequelize.INTEGER,
      defaultValue: '0'
    },
  cSpiele: {
    type: Sequelize.INTEGER,
    defaultValue: '0'
  },
})

export default TableStanding 