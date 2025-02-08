const { DataTypes } = require('sequelize');
const db = require('../config/db_config');

const CartProducts = db.define('cart_products', {
    cartId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Cart',  // Make sure this matches the correct Cart model
            key: 'id'
        },
        onDelete: 'CASCADE',  // Optional: cascade delete when a cart is deleted
        onUpdate: 'CASCADE'   // Optional: update cart products when cart ID is changed
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Product',  // Make sure this matches the correct Product model
            key: 'id'
        },
        onDelete: 'CASCADE',  // Optional: cascade delete when a product is deleted
        onUpdate: 'CASCADE'   // Optional: update cart products when product ID is changed
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
            min: 1  // Ensure the quantity is always at least 1
        }
    }
}, {
    timestamps: false  // Disable timestamps unless needed
});

module.exports = CartProducts;
