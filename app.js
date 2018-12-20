const express = require ('express')
const user = require('./routes/user')
const app = express()
// const encrypt = require('./helpers/encrypt')

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:false}))



app.use('/user', user)




app.listen(3000, function(){
  console.log('PORT 3000 start...')
})