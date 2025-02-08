const sequelize = require('../config/database');
const Task = require('./task');

const models = { Task };

sequelize.sync({ alter: true })
    .then(() => {
        console.log('Database & tables created!');
    });

module.exports = models;
