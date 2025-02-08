const Sequelize = require('sequelize');

const sequelize = new Sequelize('learn', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql',
    // storage: 'database.sqlite',
    // logging: false
});

module.exports = sequelize;