const Sequelize = require("sequelize");
const db = require("../../config/database");
const Category = db.define("categories", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  total: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    defaultValue: 0
  }
});

module.exports = Category;
