const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate({ MasterOrder, User, Problem, Master }) {
      this.hasMany(MasterOrder, { foreignKey: "orderId" });
      this.belongsTo(User, { foreignKey: "userId" });
      this.belongsTo(Problem, { foreignKey: "problemId" });
      this.belongsTo(Master, { foreignKey: "masterId" });
    }
  }
  Order.init(
    {
      status: DataTypes.STRING,
      dateOpen: DataTypes.DATE,
      dateExp: DataTypes.DATE,
      priority: DataTypes.BOOLEAN,
      userId: DataTypes.INTEGER,
      problemId: DataTypes.INTEGER,
      masterId: DataTypes.INTEGER,
      problemImg: DataTypes.STRING,
      comment: DataTypes.STRING,
      userAccept: DataTypes.BOOLEAN,
      masterAccept: DataTypes.BOOLEAN
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
