const User = require('./user');
const Blog = require('./blog');
const Comments = require('./comments');

User.hasMany(Post, {
    foreignKey: 'userId',
    onDelete: "cascade"
});

Post.belongsTo(User, {
    foreignKey: 'userId',
});

Comments.belongsTo(User, {
    foreignKey: 'userId',
});

Comments.belongsTo(Post, {
    foreignKey: 'postId',
});

User.hasMany(Comments, {
    foreignKey: 'userId',
});

Post.hasMany(Comments, {
    foreignKey: 'postId',
});

module.exports = { User, Blog, Comments };
