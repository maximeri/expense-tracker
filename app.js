const express =require('express')
const {engine} = require('express-handlebars')
const app = express()
const PORT = process.env.PORT || 3000
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const usePassport = require('./config/passport')
const routes = require('./routes')
const session = require('express-session')
require('./config/mongoose')
const Handlebars = require("handlebars")
const flash = require('connect-flash')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

app.engine('.hbs', engine({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', './views');
module.exports = Handlebars.registerHelper("ifEqual", function (v1, v2) {
  if (v1 === v2)
    return true
});
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
usePassport(app)
app.use(flash())
app.use((req,res,next)=>{
  // const explainResLocals = { locals: { success_msg: "I'm successful" } }
  // console.log(explainResLocals.locals.success_msg)
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})
app.use(routes)

app.listen(PORT, ()=>{
  console.log(`App is running on localhost:${PORT}`)
})
