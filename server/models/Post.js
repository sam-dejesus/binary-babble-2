const { Model, DataTypes } = require("sequelize")
const sequelize = require("../config/connection")

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    post_date:{
      type: DataTypes.DATE,
      allowNull: false,
    },
    post_time:{
      type: DataTypes.TIME,
      allowNull: false
    },
    update_date:{
      type: DataTypes.DATE
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id"
      }
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "post"
  }
)

module.exports = Post