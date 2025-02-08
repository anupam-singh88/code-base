const { DataTypes } = require('sequelize');
const db = require('../config/db_config');

const Order = db.define('order', {
    status: {
        type: DataTypes.ENUM({
            values: ['pending', 'successful', 'cancelled']  // Corrected typo in 'successful'
        }),
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',  // Ensure this references the correct table
            key: 'id'
        },
        onDelete: 'CASCADE',  // Optional: cascade deletion of orders when a user is deleted
        onUpdate: 'CASCADE'   // Optional: update orders when userId changes
    }
}, {
    timestamps: true  // Ensure timestamps (createdAt, updatedAt) are enabled
});

module.exports = Order;
