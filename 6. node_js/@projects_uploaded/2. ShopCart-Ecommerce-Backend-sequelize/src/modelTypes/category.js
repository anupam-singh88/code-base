const { DataTypes } = require('sequelize');
const db = require('../config/db_config');
const Product = require('./product');

const Category = db.define('category', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// Associations
Category.hasMany(Product, { foreignKey: 'categoryId' }); // Category has many Products

module.exports = Category;
