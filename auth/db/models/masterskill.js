const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class MasterSkill extends Model {
    static associate({ Master, Skill }) {
      this.belongsTo(Master, { foreignKey: "masterId" });
      this.belongsTo(Skill, { foreignKey: "skillId" });
    }
  }
  MasterSkill.init(
    {
      masterId: DataTypes.INTEGER,
      skillId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "MasterSkill",
    }
  );
  return MasterSkill;
};
