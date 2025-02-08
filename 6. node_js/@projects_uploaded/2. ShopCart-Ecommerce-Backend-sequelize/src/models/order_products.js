const { DataTypes } = require('sequelize');
const db = require('../config/db_config');

const OrderProducts = db.define('order_products', {
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'orders',
            key: 'id'
        },
        onDelete: 'CASCADE',  // Optional: cascade delete order products when an order is deleted
        onUpdate: 'CASCADE'   // Optional: update order products when an order's ID is changed
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'products',
            key: 'id'
        },
        onDelete: 'CASCADE',  // Optional: cascade delete order products when a product is deleted
        onUpdate: 'CASCADE'   // Optional: update order products when a product's ID is changed
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1  // Ensure quantity is at least 1
        }
    }
}, {
    timestamps: false  // No need for timestamps unless you specifically want them
});

module.exports = OrderProducts;
