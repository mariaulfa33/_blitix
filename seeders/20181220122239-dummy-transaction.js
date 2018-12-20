'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    let transaction = [{
      EventId: 1,
    UserId: 7,
    createdAt : new Date (),
    updatedAt : new Date ()
    },
    {
      EventId: 1,
    UserId: 8,
    createdAt : new Date (),
    updatedAt : new Date ()
    },
    {
      EventId: 1,
    UserId: 9,
    createdAt : new Date (),
    updatedAt : new Date ()
    }]
   return queryInterface.bulkInsert('transactions', transaction, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('transactions', null, {});
  }
};
