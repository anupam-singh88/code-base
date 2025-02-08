
// models/profile.js
module.exports = (sequelize, DataTypes) => {
    const Profile = sequelize.define('Profile', {
        bio: DataTypes.TEXT,
        userId: DataTypes.INTEGER
    });

    Profile.associate = models => {
        Profile.belongsTo(models.User, { foreignKey: 'userId' });
    };

    return Profile;
};
