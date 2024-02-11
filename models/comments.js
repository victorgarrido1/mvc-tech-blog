// Import necessary modules from Sequelize
const { Model, DataTypes } = require("sequelize");

// Import the Sequelize connection instance from the 'connection.js' file located in the 'config' directory
const sequelize = require("../config/connection");

class Comment extends Model {}

// Initialize the Comment model with its attributes and configuration options
Comment.init(
  {
    // Define the 'id' attribute as the primary key with auto-increment
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Define the 'comment_description' attribute as a string
    comment_description: {
      type: DataTypes.STRING,
    },
    
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    // Define the 'blog_id' attribute as an integer with a foreign key constraint referencing the 'id' column of the 'user' model
    blog_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    // Configure the model to use the Sequelize instance 'sequelize'
    sequelize,
    // Disable timestamps (createdAt and updatedAt columns)
    timestamps: false,
    // Freeze the table name to prevent it from being pluralized
    freezeTableName: true,
    // Use underscores in column names (e.g., 'blog_id' instead of 'blogId')
    underscored: true,
    // Set the model name to 'comment'
    modelName: "comment",
  }
);

// Export the Comment model so that it can be used in other parts of the application
module.exports = Comment;
