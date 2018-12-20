'use strict';
const encrypt = require('../helpers/encrypt')
const sequelize = require('sequelize')
const Op = sequelize.Op
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    userName: {type : DataTypes.STRING, 
      validate : {
        isUnique : function (value) {
          console.log(this)
           return User
            .findOne({where: {userName : value, id: {[Op.ne]:this.id}}})
            .then(data => {
                  if(data != null) {
                    throw new Error ('sorry, Username is taker')
                  }  
            })
            .catch(function(err) {
              throw err
            })
          }       
      }},
    email : {type : DataTypes.STRING, 
      validate : {
        isEmail: true,
        isUnique : function (value) {
           return User
            .findOne({where: {email : value, id: {[Op.ne]:this.id}}})
            .then(data => {
                  if(data != null) {
                    throw new Error ('Email already exists!')
                  }  
            })
            .catch(function(err) {
              throw err
            })
          }       
      }},
    password: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    secret: DataTypes.STRING
  }, {
    hooks : {
      beforeCreate : (value) => {
        value.password = encrypt(value.password, value.secret)
      }
    }
  });
  User.associate = function(models) {
    User.belongsToMany(models.Event, { through: models.transaction });
    User.hasMany(models.transaction)

  };


  return User;
};