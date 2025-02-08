// models/user.js
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        name: DataTypes.STRING,
        email: DataTypes.STRING
    });

    User.associate = models => {
        User.hasOne(models.Profile, { foreignKey: 'userId' });
        User.hasMany(models.Post, { foreignKey: 'userId' });
    };

    return User;
};
