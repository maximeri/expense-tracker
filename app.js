const express =require('express')
const {engine} = require('express-handlebars')
const app = express()
const PORT = 3000
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const usePassport = require('./config/passport')
const routes = require('./routes')
const session = require('express-session')
require('./config/mongoose')
const Handlebars = require("handlebars")
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', './views');

module.exports = Handlebars.registerHelper("ifEqual", function (v1, v2) {
  if (v1 === v2)
    return true
});
app.use(session({
  secret: 'mySessionSecret',
  resave: false,
  saveUninitialized: true,
}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
usePassport(app)
app.use(routes)

app.listen(PORT, ()=>{
  console.log(`App is running on localhost:${PORT}`)
})
