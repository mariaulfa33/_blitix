const Model = require('../models')
const express = require('express')
const router = express.Router()
const randomSecret = require('../helpers/randomSecret')
const encrypt = require('../helpers/encrypt')

router.get('/event', function(req, res) {
})

router.get('/', function(req, res) {
  res.render('userPage.ejs')
})

router.get('/login', function(req, res) {
  let msg = req.query.msg || null
  res.render('userlogin.ejs', {msg})
})

router.post('/login', function(req, res) {
  let msg = req.query.msg || null
  console.log(req.body.username)
  Model.User.findOne({where: {userName : req.body.username}})
    .then(function(user) {
      console.log(user)
      if(user.password == encrypt(req.body.password, user.secret)) {
        req.session.User = {name: user.userName, id:user.id}
        res.send(req.session.User)
      }else {
        res.redirect('/user/login?msg=password')
      }
    })
    .catch(function(err) {
      console.log(err)
      res.redirect('/user/login?msg=username salah')
    })
})

router.get('/signup', function(req, res) {
  let msg = req.query.msg
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
      res.render('userlogin.ejs', {msg})
    })
    .catch(function(err) {
      res.redirect(`/user/signup/?msg=${err}`)
    })
})





module.exports = router