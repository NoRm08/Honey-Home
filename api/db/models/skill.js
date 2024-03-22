const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Skill extends Model {
    static associate({ Problem, MasterSkill }) {
      this.hasMany(Problem, { foreignKey: "skillId" });
      this.hasMany(MasterSkill, { foreignKey: "skillId" });
    }
  }
  Skill.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Skill",
    }
  );
  return Skill;
};
