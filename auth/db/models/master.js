const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Master extends Model {
    static associate({ MasterOrder, MasterSkill, Order }) {
      this.hasMany(MasterOrder, { foreignKey: "masterId" });
      this.hasMany(MasterSkill, { foreignKey: "masterId" });
      this.hasMany(Order, { foreignKey: "masterId" });
    }
  }
  Master.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      hashpass: DataTypes.STRING,
      telephone: DataTypes.STRING,
      img: DataTypes.STRING,
      experience: DataTypes.STRING,
      raiting: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Master",
    }
  );
  return Master;
};
