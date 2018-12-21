'use strict';
const sequelize = require('sequelize');
const Op = sequelize.Op
const encrypt = require('../helpers/encrypt')
module.exports = (sequelize, DataTypes) => {
  const Promotor = sequelize.define('Promotor', {
    PromotorName: DataTypes.STRING,
    Email: DataTypes.STRING,
    Password: DataTypes.STRING,
    secret: DataTypes.STRING
  },{
    hooks : {
      beforeCreate : (value) => {
        value.Password = encrypt(value.Password, value.secret)
      }
  }
});
  Promotor.associate = function(models) {
     Promotor.hasMany(models.Event)
   // Promotor.belongsTo(models.Event)
  };
  return Promotor;
};