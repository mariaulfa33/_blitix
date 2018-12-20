const express = require('express')
const router = express.Router()
const Model = require('../models')
const encrypt = require('../helpers/encrypt')
const randomSecreten =  require('../helpers/randomSecreten')

router.get('/register',function(req,res){
    res.render('promotor.ejs')
})

router.post('/register',function(req,res){
    let secret = randomSecreten()
    let obj = {
            PromotorName : req.body.promotor_name,
            Email : req.body.email,
            Password : req.body.password,
            Secret : secret
    }
   // res.send(obj)
    Model.Promotor.create(obj)
    .then(data => {
        //res.send(data)
       res.send('/promotors/alreadyregistered')
    })
    .catch(err => {
        res.send(err)
    })
})

router.get('/login',function(req,res){
    res.render('promotorslogin.ejs')
})
router.post('/login', function(req,res){
    Model.Promotor.findOne({where: {Email : req.body.Email}})
    .then(data => {
        if(data.Password == encrypt(req.body.Password,data.Secret) ){
            res.render('frontpage.ejs')
        }
    })
    .catch(err => {
        res.redirect(err)
    })
})

router.post('/create',function(req,res) {
  //  res.send(req.body)
    let obj = {
                Event_name : req.body.acara,
                Capacity :  Number(req.body.capacity)
    }
    Model.Event.create(obj)
    .then(event => {
        res.send(event)
    })
})


module.exports = router