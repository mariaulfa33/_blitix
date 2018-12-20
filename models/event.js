'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    Event_name: DataTypes.STRING,
    Capacity : { type :DataTypes.INTEGER,
                allowNull : false },

    eventDate : DataTypes.STRING,
    PromotorId : DataTypes.INTEGER,
    waitingList : DataTypes.INTEGER
  }, {});
  Event.associate = function(models) {
    Event.hasMany(models.Promotor)
    Event.belongsToMany(models.User, { through: models.transaction })
    Event.hasMany(models.transaction) 
  };

  Event.getWaitingList = function(eventId) {
    console.log(eventId)
      Event.findOne({where: {id : eventId, waitingList:null}})
        .then(function(waitingList) {
          return waitingList
        })
        .catch(function(err) {
          throw err
        })
  }
  return Event;
};