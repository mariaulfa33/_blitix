'use strict';

let obj = [ { Event_name : "taylor swift concert",
              Capacity : 10,
              price: 500000,
              PromotorId : 2 ,
              eventDate : '2018-12-29',
              createdAt : new Date,
              updatedAt : new Date},
              { Event_name : "zeed concert",
              Capacity : 4,
              price: 500000,
              PromotorId : 2 ,
              eventDate : '2018-12-27',
              createdAt : new Date,
              updatedAt : new Date},
              { Event_name : "musik untuk rakyat",
              Capacity : 10,
              price: 30000,
              PromotorId : 1 ,
              eventDate : '2018-12-30',
              createdAt : new Date,
              updatedAt : new Date},
              { Event_name : "road to soundrenaline",
              Capacity : 1000,
              price: 500000,
              PromotorId : 2 ,
              eventDate : '2018-12-29',
              createdAt : new Date,
              updatedAt : new Date},
              { Event_name : "coldplay live in jakarta",
              Capacity : 50000,
              price: 500000,
              PromotorId : 3 ,
              eventDate : '2018-12-22',
              createdAt : new Date,
              updatedAt : new Date}]

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
   return queryInterface.bulkInsert('Events', obj , {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('Events', null, {});
  }
};
