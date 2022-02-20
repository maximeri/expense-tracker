const express =require('express')
const {engine} = require('express-handlebars')
const app = express()
const PORT = 3000
const bodyParser = require('body-parser')
const routes = require('./routes')
require('./config/mongoose')

app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', './views');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)


app.listen(PORT, ()=>{
  console.log(`App is running on localhost:${PORT}`)
})
