'use strict';
const sequelize = require('sequelize');
const Op = sequelize.Op
const encrypt = require('../helpers/encrypt')
module.exports = (sequelize, DataTypes) => {
  const Promotor = sequelize.define('Promotor', {
    PromotorName: DataTypes.STRING,
    Email: {type : DataTypes.STRING, 
        validate : {
          isEmail : true,
          isUnique : function (value) {
             return Promotor
              .findOne({where: {Email : value, id: {[Op.ne]:this.id}}})
              .then(data => {
                    if(data != null) {
                      throw new Error ('Email already exists!')
                    }  
              })
              .catch(function(err) {
                throw err
              })
            }       
        },
     
    },
    Password: DataTypes.STRING,
    Secret : DataTypes.STRING
  }, {
    hooks : {
      beforeCreate : (value) => {
        value.Password = encrypt(value.Password, value.Secret)
      }
  }
});
  Promotor.associate = function(models) {
    Promotor.hasMany(models.Event)
  };
  return Promotor;
};