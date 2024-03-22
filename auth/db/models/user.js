const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Order, Comment }) {
      this.hasMany(Order, { foreignKey: "userId" });
      this.hasMany(Comment, { foreignKey: "userId" });
    }
  }
  User.init(
    {
      orderCount: DataTypes.INTEGER,
      confirmationCode: DataTypes.INTEGER,
      endSubscibe: DataTypes.DATE,
      userCard: DataTypes.STRING,
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      hashpass: DataTypes.STRING,
      role: DataTypes.STRING,
      img: DataTypes.STRING,
      address: DataTypes.STRING,
      telephone: DataTypes.STRING,
      subscribeLevl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
