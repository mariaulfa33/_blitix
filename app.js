
const express = require('express')
const app = express()
const session = require('express-session')
const port = 3000
const promotors = require('./routes/promotors.js')
const user = require('./routes/user')
const public = require('./routes/public')

app.set('view engine', 'ejs');

app.use(session({
  secret: 'blitix',
}))
app.use(express.urlencoded({extended: false}))

app.use('/', public)

app.use('/user', user)

app.use('/promotors', promotors)


app.listen(port, function(){
    console.log(`listen to ${port}`)
})
