const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class MasterOrder extends Model {
    static associate({ Order, Master }) {
      this.belongsTo(Order, { foreignKey: "orderId" });
      this.belongsTo(Master, { foreignKey: "masterId" });
    }
  }
  MasterOrder.init(
    {
      orderId: DataTypes.INTEGER,
      masterId: DataTypes.INTEGER,
      date: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "MasterOrder",
    }
  );
  return MasterOrder;
};
