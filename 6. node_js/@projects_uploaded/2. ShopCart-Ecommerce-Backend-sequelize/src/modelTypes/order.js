const { DataTypes } = require('sequelize');
const db = require('../config/db_config');
const User = require('./user');
const Product = require('./product');
const OrderProducts = require('./order_products');

const Order = db.define('order', {
    status: {
        type: DataTypes.ENUM('pending', 'successful', 'cancelled'),
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    }
});

// Associations
Order.belongsTo(User, { foreignKey: 'userId' }); // Order belongs to User
Order.belongsToMany(Product, { through: OrderProducts }); // Order has many Products through OrderProducts

module.exports = Order;
