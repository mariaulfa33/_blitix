const Model = require('../models')
const express = require('express')
const Nexmo = require('nexmo');
const tix = require('../helpers/getTicketNumber')
const router = express.Router()
const randomSecret = require('../helpers/randomSecret')
const encrypt = require('../helpers/encrypt')

const nexmo = new Nexmo({
  apiKey: '8169445b',
  apiSecret: 'SWoomK4ihyMUOKe8'
})


router.get('/home', function(req,res) {
  let id = 6
  Model.User.findByPk(id, {include : {model : Model.Event}})
    .then(function(user) {
      res.render('userHome.ejs', {user})
    })
})

router.get('/buyticket', function(req,res) {
  Model.Event.findAll()
    .then(function(events) {
      res.render('buyticket.ejs', {events})
    })
    .catch(function(err) {
      res.send(err)
    })
})


router.post('/buyticket/', function(req,res) {
  let event = req.body.event
  let id = 9
  let msg = null
  Model.transaction.getLimitSeat(event)
    .then(trans => {
        if(trans > 0) {
          msg = `You just buy Ticket via BliTix. see you on top!`
          let obj = {
            EventId : event,
            UserId : id
          }
          return Model.transaction.create(obj)
        } else {
          let waitinglist = Model.Event.getWaitingList(event)
          if(waitinglist !== null) {
            msg = `Your are now registered in our Waiting list.  We'll let you know if you'll get the tikcets.`
            return Model.Event.update({waitingList : id}, {where : {id : event}})
          }
        }
    })
    .then(function(data) {
      console.log(data)
      let ticketBooking = tix()
      const from = 'Nexmo'
      const to = '6281382283988'
      const text = `Hi! ${msg}. This is your BookingID : ${ticketBooking}. `
      console.log('=============')
      res.send(msg)
    })
    .catch(err => {
       res.send(err)
    })
})

router.post('/cancel/:showid/:transId', function(req,res) {
  let showid = Number(req.params.showid)
  let idTrans = Number(req.params.transId)
  let waitingId = null
  
  Model.transaction.destroy({where : {id : idTrans}})
    .then(function(){
      console.log(showid)
      return Model.Event.findByPk(showid)
    })
    .then(function(event) {
      console.log(event)
      if(event.waitingList !== null) {
        waitingId = event.waitingList
        return Model.transaction.create({EventId : showid, UserId:event.waitingList})
      }else {
        res.redirect('/user/home')
      }
    })
    .then(function(buyer) {
      return Model.User.findByPk(waitingId)
    })
    .then(function(data) {
      return Model.Event.update({waitingList: null}, {where : {id : showid}})
    })
    .then(function(data) {
      console.log('sampai sini')
      res.redirect('/user/home')
    })
    .catch(function(err) {
      console.log(err)
      res.send(err)
    })

})


module.exports = router