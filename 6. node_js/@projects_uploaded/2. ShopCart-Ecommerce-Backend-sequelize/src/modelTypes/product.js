const { DataTypes } = require('sequelize');
const db = require('../config/db_config');
const Category = require('./category');
const OrderProducts = require('./order_products');
const CartProducts = require('./cart_products');

const Product = db.define('product', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'categories',
            key: 'id'
        }
    }
});

// Associations
Product.belongsTo(Category, { foreignKey: 'categoryId' }); // Product belongs to Category
Product.belongsToMany(Order, { through: OrderProducts }); // Product has many Orders through OrderProducts
Product.belongsToMany(Cart, { through: CartProducts }); // Product has many Carts through CartProducts

module.exports = Product;
