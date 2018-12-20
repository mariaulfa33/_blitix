'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    Event_name: DataTypes.STRING,
    Capacity : { type :DataTypes.INTEGER,
                allowNull : false },
    eventDate : DataTypes.STRING,
    PromotorId : DataTypes.INTEGER,
    price : DataTypes.INTEGER

  }, {});
  Event.associate = function(models) {
    Event.belongsTo(models.Promotor)
  };
  return Event;
};