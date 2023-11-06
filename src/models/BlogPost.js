const blogPostsTableSchems = (sequelize, DataTypes) => {
    const BlogPost = sequelize.define('BlogPost', {
      id: {
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      published: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      },
      userId: DataTypes.INTEGER,
    },
    {
      tableName: 'blog_posts',
      underscored: true,
      timestamps: false
    })
    BlogPost.associate = (models) => {
        BlogPost.belongsTo(models.User, {
            foreingKey: 'userId', as: 'user'
        })
    }
    return BlogPost;
  }
  
  module.exports = blogPostsTableSchems;