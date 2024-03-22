const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Problem extends Model {
    static associate({ Skill, Order }) {
      this.hasMany(Order, { foreignKey: "problemId" });
      this.belongsTo(Skill, { foreignKey: "skillId" });
    }
  }
  Problem.init(
    {
      name: DataTypes.STRING,
      problemTime: DataTypes.INTEGER,
      skillId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Problem",
    }
  );
  return Problem;
};
