
// const { DataTypes } = require('sequelize');
// const { sequelize } = require('./index');
module.exports = (DataTypes, Model, sequelize) => {

    const Contact = sequelize.define('Contact', {
        // Model attributes are defined here
        permanendAddress: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "nothing"
        },
        currentAddress: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: DataTypes.INTEGER

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
            modelName: 'Contact',
        })
    return Contact;
}

// module.exports = Contact;