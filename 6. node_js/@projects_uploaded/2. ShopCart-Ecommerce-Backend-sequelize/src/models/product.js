const { DataTypes } = require('sequelize');
const db = require('../config/db_config');

const Product = db.define('product', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3, 255]  // Optional: Add length validation to ensure proper title size
        }
    },
    description: {
        type: DataTypes.TEXT,  // Changed to TEXT if you expect longer descriptions
        allowNull: false,
        validate: {
            len: [10, 2000]  // Optional: Validate description length
        }
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),  // Changed to DECIMAL to handle prices with cents
        allowNull: false,
        validate: {
            isDecimal: true  // Ensure price is a decimal value
        }
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isUrl: true  // Ensure the image field is a valid URL
        }
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'categories',  // Reference to the category model
            key: 'id' //
        },
        onDelete: 'CASCADE'  // Optional: cascade deletion of products when a category is deleted
    }
}, {
    timestamps: true  // Ensure timestamps (createdAt, updatedAt) are enabled
});

module.exports = Product;
