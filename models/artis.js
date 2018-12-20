'use strict';
module.exports = (sequelize, DataTypes) => {
  const Artis = sequelize.define('Artis', {
    Artist_name: DataTypes.STRING,
    genre: DataTypes.STRING
  }, {});
  Artis.associate = function(models) {
    // associations can be defined here
  };
  return Artis;
};