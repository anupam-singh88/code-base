// const { DataTypes, Model } = require('sequelize');
// const { sequelize } = require('./index');

module.exports = (DataTypes, Model, sequelize) => {
    class User extends Model { }

    User.init({
        // Model attributes are defined here
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "singh"
        },
        lastName: {
            type: DataTypes.STRING
            // allowNull defaults to true
        }
    },
        {
            // Other model options go here
            // tableName: "users",
            // timestamps: false, bydefault true
            createdAt: true,
            // updatedAt: "uAt"
            // freezeTableName: true,
            // underscored: true,
            // We need to pass the connection instance
            // to the defining model

            sequelize,
            modelName: 'User',
        },

    );

    return User;
}














// const { DataTypes } = require('sequelize');
// const { sequelize } = require('./index')
// const User = sequelize.define('User', {
//     // Model attributes are defined here
//     firstName: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         defaultValue: "singh"
//     },
//     lastName: {
//         type: DataTypes.STRING
//         // allowNull defaults to true
//     }
// }, {
//     // Other model options go here
//     tableName: "users",
//     // timestamps: false, bydefault true
//     createdAt: false,
//     updatedAt: "uAt"
//     // freezeTableName: true,
//     // underscored: true,
//     // sequelize,
//     // We need to pass the connection instance

// });

// // `sequelize.define` also returns the model
// // console.log(User === sequelize.models.User); // true

// module.exports = User;
