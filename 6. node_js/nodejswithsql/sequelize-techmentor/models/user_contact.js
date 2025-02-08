module.exports = (sequelize, DataTypes, User, Contact) => {
    const userContacts = sequelize.define('user_contact', {
        UserId: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'id'

            }
        },
        contacstId: {
            type: DataTypes.INTEGER,
            references: {
                model: Contact,
                key: 'id'
            }
        }
    }, {
        // Other model options go here
        // tableName: "users",
        timestamps: false,
        createdAt: false,
        // updatedAt: "uAt"
        // freezeTableName: true,
        // underscored: true,
        // We need to pass the connection instance
        // to the defining model

        sequelize,
        modelName: 'user_contact',
    })
    return userContacts;

}

