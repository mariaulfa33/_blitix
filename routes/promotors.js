const express = require('express')
const router = express.Router()
const Model = require('../models')
const encrypt = require('../helpers/encrypt')
const randomSecret = require('../helpers/randomSecret')
const session = require('express-session');

router.post('/register',function(req,res){
    let obj = {
        PromotorName: req.body.promotor_name,
    Email: req.body.email,
    Password: req.body.password,
    secret: randomSecret()
    }
    console.log(obj)
    Model.Promotor.create(obj)
    .then(data => {
       console.log('=====DATA:', data)
        res.redirect('/promotors/login')
    })
    .catch(err => {
        console.log(err)
        res.send(err)
       // res.redirect('/promotors/register/?err="register failed, pleased check your name and password"')
    })
})

router.get('/login',function(req,res){
    res.render('promotorslogin.ejs')
})
router.post('/login', function(req,res){
   //res.send(req.body)
    Model.Promotor.findOne({where : {Email : req.body.Email},include: [{model: Model.Event}]})
        .then(function(data) {
            res.render('frontpage.ejs' ,{promotors : data})
        })
        .catch(function(err){
            res.send(err)
        })
})


router.post('/dashboard/:id',function(req,res) {
    let obj = {
                Event_name : req.body.acara,
                capacity :  Number(req.body.capacity),
                eventDate : req.body.eventdate,
                PromotorId : Number(req.params.id),
                createdAt : new Date,
                updatedAt : new Date,
                price : req.body.price     
            }
    Model.Event.create(obj)
    .then(events => {
       return Model.Promotor.findOne({include : [{model:Model.Event}], where : {id : req.params.id}})
    })
    .then(data => {
        res.render('mainmenu.ejs', { data})
    }) 
    .catch(err => {
        res.send(err)
    })
    
})

module.exports = router