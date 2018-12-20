'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    Event_name: DataTypes.STRING,
    Capacity : { type :DataTypes.INTEGER,
                allowNull : false }

  }, {});
  Event.associate = function(models) {
    // associations can be defined here
  };
  return Event;
};