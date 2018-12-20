
const express = require('express')
const app = express()
const session = require('express-session')
const port = 3000
const promotors = require('./routes/promotors.js')
const user = require('./routes/user')

var session = require('express-session');

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}))

app.use(session({
    secret: 'blitix',
  }))

const Model = require('./models')

// app.get('/test', function(req, res) {
//     Model.transaction.getLimitSeat(2)
//      .then(trans => {
//          console.log(trans)
//         //  res.send(trans)
//      })
//      .catch(err => {
//         //  console.log('ERR: ', err)
//         //  res.send(err)
//      })
// })

app.get('/', function(req, res) {
res.render('home.ejs')
})
// app.use('/home', home)




app.use('/user', user)


app.listen(port, function(){
    console.log(`listen to ${port}`)
})
