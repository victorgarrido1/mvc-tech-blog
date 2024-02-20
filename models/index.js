const User = require('./user');
const Blog = require('./blog');
const Comments = require('./comments');

User.hasMany(Blog, {
    foreignKey: 'user_id', // Corrected from 'userId' to 'user_id'
    onDelete: "cascade"
});

Blog.belongsTo(User, {
    foreignKey: 'userId',
});

Comments.belongsTo(User, {
    foreignKey: 'userId',
});

Comments.belongsTo(Blog, {
    foreignKey: 'postId',
});

User.hasMany(Comments, {
    foreignKey: 'userId',
});

Blog.hasMany(Comments, {
    foreignKey: 'postId',
});

module.exports = { User, Blog, Comments };
