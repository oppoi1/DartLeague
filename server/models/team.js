import Sequelize from "sequelize";
import sequelize from "../util/db";

const Team = sequelize.define('team', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  }
})

export default Team