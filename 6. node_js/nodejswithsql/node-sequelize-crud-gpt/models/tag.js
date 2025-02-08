// models/tag.js
module.exports = (sequelize, DataTypes) => {
    const Tag = sequelize.define('Tag', {
        name: DataTypes.STRING
    });

    Tag.associate = models => {
        Tag.belongsToMany(models.Post, { through: 'PostTags', foreignKey: 'tagId' });
    };

    return Tag;
};
