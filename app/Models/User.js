const Sequelize = require("sequelize");
const db = require("../../config/database");

const User = db.define("users", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    uniqueKey: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    uniqueKey: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  reg_no: {
    type: Sequelize.INTEGER,
    allowNull: false,
    uniqueKey: true
  },
  programme: {
    type: Sequelize.STRING
  },
  position: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = User;
