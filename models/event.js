'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    Event_name: DataTypes.STRING,
    capacity : { type :DataTypes.INTEGER,
                allowNull : false },
    eventDate : DataTypes.STRING,
    PromotorId : DataTypes.INTEGER,
    waitingList : DataTypes.INTEGER
  }, {});
  Event.associate = function(models) {
    Event.belongsTo(models.Promotor)
    Event.belongsToMany(models.User, { through: models.Transaction })
    Event.hasMany(models.Transaction)
    
    // associations can be defined here
  };
  return Event;
};