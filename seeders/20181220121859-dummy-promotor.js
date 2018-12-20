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
   let promotor = [{
    PromotorName : 'raja',
    Email : 're@gmail.com',
    Password : '1234567890',
    Secret : '1sgh',
    createdAt : new Date (),
    updatedAt : new Date ()
   }]
   return queryInterface.bulkInsert('Promotors',promotor, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('Promotors', null, {});
  }
};
