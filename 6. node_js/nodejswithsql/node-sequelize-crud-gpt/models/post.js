
// models/post.js
module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        title: DataTypes.STRING,
        content: DataTypes.TEXT,
        userId: DataTypes.INTEGER
    });

    Post.associate = models => {
        Post.belongsTo(models.User, { foreignKey: 'userId' });
        Post.belongsToMany(models.Tag, { through: 'PostTags', foreignKey: 'postId' });
    };

    return Post;
};

