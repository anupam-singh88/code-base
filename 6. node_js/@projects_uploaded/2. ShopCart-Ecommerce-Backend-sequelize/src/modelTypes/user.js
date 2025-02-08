const { DataTypes } = require('sequelize');
const db = require('../config/db_config');
const Cart = require('./cart');
const Order = require('./order');

const User = db.define('user', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8, 255],
            isAlphanumeric: true
        }
    }
});

// Associations
User.hasOne(Cart, { foreignKey: 'userId' }); // User has one Cart
User.hasMany(Order, { foreignKey: 'userId' }); // User has many Orders

module.exports = User;

/*
const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcrypt');
const db = require('../config/db_config');

class User extends Model {
    // Instance method to compare password
    async comparePassword(password) {
        try {
            return await bcrypt.compare(password, this.password);
        } catch (error) {
            console.error('Error comparing password:', error);
            return false;
        }
    }
}

// Define the User model
User.init({
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8, 255]
            // Removed isAlphanumeric to allow special characters for stronger passwords
        }
    }
}, {
    sequelize: db,
    modelName: 'User',
    tableName: 'users',
    hooks: {
        beforeCreate: async (user) => {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            user.password = hashedPassword;
        },
        beforeUpdate: async (user) => {
            if (user.changed('password')) {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                user.password = hashedPassword;
            }
        }
    }
});

module.exports = User;

*/