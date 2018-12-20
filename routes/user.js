const Model = require('../models')
const express = require('express')
const router = express.Router()
const randomSecret = require('../helpers/randomSecret')


router.get('/login', function(req, res) {
  res.render('userlogin.ejs')
})

router.get('/signup', function(req, res) {
  let msg = ''
  res.render('userRegister.ejs', {msg})
})

router.post('/signup', function(req, res) {
  let msg = ''
  
  let newUser = {
    firstName : req.body.firstname,
    lastName : req.body.lastname,
    userName : req.body.username,
    email : req.body.email,
    phoneNumber : req.body.phone,
    password : req.body.password,
    secret : randomSecret()
  }
  Model.User
    .create(newUser)
    .then(function(user) {
      msg = 'thankyou for signing up'
      res.render('userRegister.ejs', {msg})
    })
    .catch(function(err) {
      res.send(err)
    })
})



module.exports = router