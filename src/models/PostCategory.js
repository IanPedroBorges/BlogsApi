const postCategoryTableSchems = (sequelize, DataTypes) => {
    const PostCategory = sequelize.define('PostCategory', {
      postId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER
    },
    {
      tableName: 'posts_categories',
      underscored: true,
      timestamps: false
    })

    PostCategory.associate = models => {
        models.BlogPost.belongsToMany(models.Category, {
            as: 'categories',
            through: PostCategory,
            foreignKey: 'postId',
            otherKey: 'categoryId'
        });
        models.Category.belongsToMany(models.BlogPost, {
            as: 'blogpost',
            through: PostCategory,
            foreignKey: 'categoryId',
            otherKey: 'postId'
        })
    };
    return PostCategory;
  }
  
  module.exports = postCategoryTableSchems;