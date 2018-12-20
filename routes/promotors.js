const express = require('express')
const router = express.Router()
const Model = require('../models')
const encrypt = require('../helpers/encrypt')
const randomSecreten =  require('../helpers/randomSecreten')
var session = require('express-session');

router.get('/register',function(req,res){
    res.render('promotor.ejs' ,{msg : req.query})
})

router.post('/register',function(req,res){
    let secret = randomSecreten()
    let obj = {
            PromotorName : req.body.promotor_name,
            Email : req.body.email,
            Password : req.body.password,
            Secret : secret
    }

    Model.Promotor.create(obj)
    .then(data => {
       res.redirect('/promotors/login')
    })
    .catch(err => {
        res.redirect('/promotors/register/?err="login failed, pleased check your name and password"')
    })
})

router.get('/login',function(req,res)
    res.render('promotorslogin.ejs')
})
router.post('/login', function(req,res){

    Model.Promotor.findOne({where: {Email : req.body.Email}, include : [{model : Model.Event}]})
    .then(data => {
        if(data.Password == encrypt(req.body.Password,data.Secret) ){
           res.render('frontpage.ejs',{promotors : data})
        }
    })
    .catch(err => {
        res.redirect(err)
    })
})

router.post('/dashboard/:id',function(req,res, next) {
    if(req.session.user){
        next()
    } else {
        res.redirect('promotors/login')
    }
},function(req,res) {
    let obj = {
                Event_name : req.body.acara,
                Capacity :  Number(req.body.capacity),
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