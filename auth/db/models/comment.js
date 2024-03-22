const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate({ User, Master }) {
      this.belongsTo(User, { foreignKey: "userId" });
      this.belongsTo(Master, { foreignKey: "masterId" });
    }
  }
  Comment.init(
    {
      text: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      masterId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
