const { DataTypes } = require('sequelize');
const db = require('../config/db_config');
const User = require('./user');
const Product = require('./product');
const CartProducts = require('./cart_products');

const Cart = db.define('cart', {
    // Define fields here, e.g., totalAmount
});

// Associations
Cart.belongsTo(User, { foreignKey: 'userId' }); // Cart belongs to User
Cart.belongsToMany(Product, { through: CartProducts }); // Cart has many Products through CartProducts

module.exports = Cart;
