const express = require('express')
const app = express()
const port = 3000
const promotors = require('./routes/promotors.js')

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}))


app.use('/promotors',promotors)

app.listen(port, function(){
    console.log(`listen to ${port}`)
})

