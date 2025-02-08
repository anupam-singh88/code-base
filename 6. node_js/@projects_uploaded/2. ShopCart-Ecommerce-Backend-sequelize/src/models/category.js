const { DataTypes } = require('sequelize');
const db = require('../config/db_config');

const Category = db.define('category', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: [3, 255]  // Added length validation to ensure the name is within a reasonable range
        }
    },
    description: {
        type: DataTypes.TEXT,  // Changed to TEXT if you expect longer descriptions
        allowNull: false,
        validate: {
            len: [10, 1000]  // Optional: length validation to ensure appropriate description size
        }
    }
}, {
    timestamps: true  // Enable this if you want createdAt and updatedAt fields
});

module.exports = Category;
