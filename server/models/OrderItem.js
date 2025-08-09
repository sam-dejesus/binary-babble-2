const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class OrderItem extends Model {}

OrderItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "order",
        key: "id"
      },
      onDelete: "CASCADE"
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "product",
        key: "id"
      },
      onDelete: "CASCADE"
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        min: 1
      }
    },
    price_at_purchase: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "order_item"
  }
);

module.exports = OrderItem;
