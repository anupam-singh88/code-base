const { Sequelize, DataTypes, Model } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('myfirstdb', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    // define: {
    //     timestamps: false
    // }
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

const db = {}
db.DataTypes = DataTypes;
db.Model = Model;
db.sequelize = sequelize;
db.Sequelize = Sequelize


db.User = require('./user')(DataTypes, Model, sequelize)
db.Contact = require('./contact')(DataTypes, Model, sequelize)
db.userContact = require('./user_contact')(sequelize, DataTypes, db.User, db.Contact)

// db.User.hasOne(db.Contact, {
//     foreignKey: 'user_id',
//     onDelete: 'CASCADE',
//     as: "contactDetails"
// });

// db.Contact.belongsTo(db.User, {
//     foreignKey: 'user_id',
//     onDelete: 'CASCADE',
//     as: "userDetails"
// });


// db.User.hasMany(db.Contact, {
//     foreignKey: 'user_id',
//     onDelete: 'CASCADE',
//     as: "contactDetails"
// });

// db.Contact.belongsTo(db.User, {
//     foreignKey: 'user_id',
//     onDelete: 'CASCADE',
//     as: "userDetails"
// });

db.User.belongsToMany(
    db.Contact,
    {
        through: db.userContact,
        // foreignKey: 'user_id',
    })

db.Contact.belongsToMany(
    db.User,
    {
        through: db.userContact,
        // through: 'user_contact',
        // foreignKey: 'user_id',
        // onDelete: 'CASCADE',
        // as: "userDetails"
    })

sequelize.sync({
    force: true
}).then(() => {
    console.log('All tables created');
}).catch((err) => {
    console.log(err);
})


module.exports = { db, connectDB, sequelize };
// module.exports = { connectDB, sequelize };