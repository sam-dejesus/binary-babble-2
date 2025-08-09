const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Order extends Model {}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id"
      },
      onDelete: "CASCADE"
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "pending"
    },
    total_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "order"
  }
);

module.exports = Order;
