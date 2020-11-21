const Sequelize = require("sequelize");
const db = require("../../config/database");
const Nominee = db.define("nominees", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: Sequelize.STRING(65),
    allowNull: false
  },
  category: {
    type: Sequelize.STRING(65),
    allowNull: false
  },
  image: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  vote: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    defaultValue: 0
  }
});

module.exports = Nominee;
