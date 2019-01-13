import Sequelize from 'sequelize'
import sequelize from '../util/db'

const TableHistory = sequelize.define('tableHistory', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  // table standing ID FK
  playerHome: Sequelize.STRING, // FK?
  playerOut: Sequelize.STRING, // fk?
  result: Sequelize.STRING
})

export default TableHistory