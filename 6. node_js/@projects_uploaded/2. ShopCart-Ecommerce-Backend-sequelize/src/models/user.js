const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const db = require('../config/db_config');

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
            len: [8, 255]
            // Removed isAlphanumeric to allow special characters for stronger passwords
        }
    }
}, {
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
    },
    tableName: 'users' // Corrected typo
});

// Instance method to compare password
User.prototype.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        console.error('Error comparing password:', error);
        return false;
    }
};

module.exports = User;
