const Sequelize = require("sequelize");
const db = require("../../config/database");
const Nominee = require("./Nominee");
const User = require("./User");

const Vote = db.define("votes", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nominee_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Nominee,
      key: "id"
    }
  },
  reg_no: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: "reg_no"
    }
  },
  category: {
    type: Sequelize.STRING(65),
    allowNull: false
  }
});

module.exports = Vote;
