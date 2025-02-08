'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    return queryInterface.bulkInsert('categories', [
      {
        name: 'Electronics',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Clothing',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Shoes',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Books',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Furniture',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Food',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Health & Beauty',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sports',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Toys',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Automotive',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('categories', null, {});
  }
};
