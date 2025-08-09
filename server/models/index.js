const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");
const Cart = require("./Cart");
const CartItem = require("./CartItem");
const Product = require("./Product");
const Order = require("./Order");
const OrderItem = require("./OrderItem");

// User Inputs
User.hasMany(Post, { foreignKey: "user_id" });
Post.belongsTo(User, { foreignKey: "user_id" });
Comment.belongsTo(User, { foreignKey: "user_id" });
Comment.belongsTo(Post, { foreignKey: "post_id", onDelete: "CASCADE" });
Post.hasMany(Comment, { foreignKey: "post_id", onDelete: "CASCADE", hooks: true });
User.hasMany(Comment, { foreignKey: "user_id" });

// Shopping 
User.hasMany(Cart, { foreignKey: "user_id", onDelete: "CASCADE" });
Cart.belongsTo(User, { foreignKey: "user_id" });

Cart.hasMany(CartItem, { foreignKey: "cart_id", onDelete: "CASCADE" });
CartItem.belongsTo(Cart, { foreignKey: "cart_id" });

Product.hasMany(CartItem, { foreignKey: "product_id", onDelete: "CASCADE" });
CartItem.belongsTo(Product, { foreignKey: "product_id" });

// Orders
User.hasMany(Order, { foreignKey: "user_id", onDelete: "CASCADE" });
Order.belongsTo(User, { foreignKey: "user_id" });

Order.hasMany(OrderItem, { foreignKey: "order_id", onDelete: "CASCADE" });
OrderItem.belongsTo(Order, { foreignKey: "order_id" });

Product.hasMany(OrderItem, { foreignKey: "product_id", onDelete: "CASCADE" });
OrderItem.belongsTo(Product, { foreignKey: "product_id" });

module.exports = {
  User,
  Post,
  Comment,
  Cart,
  CartItem,
  Product,
  Order,
  OrderItem
};
