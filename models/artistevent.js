'use strict';
module.exports = (sequelize, DataTypes) => {
  const ArtistEvent = sequelize.define('ArtistEvent', {
    ArtistId: DataTypes.INTEGER
  }, {});
  ArtistEvent.associate = function(models) {
    // associations can be defined here
  };
  return ArtistEvent;
};