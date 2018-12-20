'use strict';
module.exports = (sequelize, DataTypes) => {
  const transaction = sequelize.define('transaction', {
    id : {type :DataTypes.INTEGER, autoIncrement : true, primaryKey : true},
    EventId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
   });
  transaction.associate = function(models) {
    // associations can be defined here
    transaction.belongsTo(models.User)
    transaction.belongsTo(models.Event)
  };

  transaction.getLimitSeat = function(eventId) {
    return new Promise (function(resolve, reject) {
      let seat = 0;
      transaction
       .findAll({
          where: {EventId : eventId},
          attributes: ['EventId', [sequelize.fn('COUNT', sequelize.col('transaction.EventId')), 'ticket']],
          group: ['EventId']
        })
        .then(trans => {
          seat = Number(trans[0].dataValues.ticket);
          return trans[0].getEvent()  
        })
        .then(event => {
          let hasil = event.dataValues.Capacity - seat
          resolve(hasil)
        })
        .catch(err => {
          reject(err)
        })
    })
  }


  return transaction;
};
