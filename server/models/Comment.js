const { Model, DataTypes } = require("sequelize")
const sequelize = require("../config/connection")

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    comment_text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id"
      }
    },
    comment_date:{
      type: DataTypes.DATE,
      allowNull: false,
    },
    comment_time:{
      type: DataTypes.TIME,
      allowNull: false
    },
    update_date:{
      type: DataTypes.DATE
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "post",
        key: "id"
      }
    },
  },
  {
  sequelize,
  timestamps: true,
  freezeTableName: true,
  underscored: true,
  modelName: "comment"
  }
  )
  
  module.exports = Comment