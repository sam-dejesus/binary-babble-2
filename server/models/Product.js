const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Product extends Model {}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    stock_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    is_digital: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    digital_url: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    license_type: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "product"
  }
);

module.exports = Product;
