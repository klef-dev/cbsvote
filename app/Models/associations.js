module.exports = () => {
  const User = require("./User");
  const Nominee = require("./Nominee");
  const Vote = require("./Vote");

  User.hasMany(Vote, { as: "Votes", foreignKey: "reg_no" });
  Nominee.hasMany(Vote, { as: "Votes", foreignKey: "nominee_id" });
  Vote.belongsTo(Nominee, { as: "Nominee", foreignKey: "nominee_id" });
  Vote.belongsTo(User, { as: "User", foreignKey: "reg_no" });
};
