const { DataTypes } = require('sequelize');
const db = require('../config/db_config');

const Cart = db.define('cart', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',  // Ensure thisa matches the correct User model
            key: 'id'
        },
        onDelete: 'CASCADE',  // Optional: cascade delete when the user is deleted
        onUpdate: 'CASCADE'   // Optional: update cart when user ID is changed
    },
}, {
    timestamps: true, // Enable timestamps (createdAt, updatedAt) to track cart creation and updates
    tableName: 'carts'  // Define the table name
});

// You might also want to define associations here, if necessary
Cart.associate = (models) => {
    Cart.belongsTo(models.User, { foreignKey: 'userId' });  // Cart belongs to a User
    Cart.belongsToMany(models.Product, { through: models.CartProducts });  // Cart has many Products through CartProducts
};

module.exports = Cart;
