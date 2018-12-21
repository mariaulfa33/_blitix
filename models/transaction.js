'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    EventId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {});
  Transaction.associate = function(models) {
    Transaction.belongsTo(models.User)
    Transaction.belongsTo(models.Event)
    // associations can be defined here
  };

  Transaction.getLimitSeat = function(eventId) {
    return new Promise (function(resolve, reject) {
      let seat = 0;
      Transaction
       .findAll({
          where: {EventId : eventId},
          attributes: ['EventId', [sequelize.fn('COUNT', sequelize.col('Transaction.EventId')), 'ticket']],
          group: ['EventId']
        })
        .then(trans => {
          seat = Number(trans[0].dataValues.ticket);
          return trans[0].getEvent()  
        })
        .then(event => {
          console.log(event)
          let hasil = event.dataValues.capacity - seat
          resolve(hasil)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  return Transaction;
};