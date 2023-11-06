'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('blog_posts', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      title: {
        type:Sequelize.STRING
      },
      content: {
        type: Sequelize.STRING
      },
      userId: {
        field: 'user_id',
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'id'
        }
      },
      published: {
       type: Sequelize.DATE,
       default: Sequelize.DATE()
      },
      updated: {
        type: Sequelize.DATE,
        default: Sequelize.DATE()
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('blog_posts')
  }
};
