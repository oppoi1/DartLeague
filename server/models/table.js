import Sequelize from 'sequelize'
import sequelize from '../util/db'

const Table = sequelize.define('table', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  name: Sequelize.STRING,
})

export default Table