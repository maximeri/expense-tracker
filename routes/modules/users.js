const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const bcrypt = require('bcrypt')
const passport = require('passport')

//register
router.get('/register',(req,res)=>{
  res.render('register')
})

router.post('/register', async (req, res) => {
  const {name,email, password} = req.body
  await User.findOne({email})
  .then(user=>
    {
      if(!user) {
      bcrypt.genSalt(10)
      .then(salt => bcrypt.hash(req.body.password,salt))
      .then(hash => User.create({ name, email, password: hash})) 
      .then(() => res.redirect('/'))} else {
        console.log('User already exists.')
        res.redirect('register',{name,email,password})
        .catch(err => console.log(err))
      }
    }
  )
})

// login
router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login',
  passport.authenticate('local', { 
    successRedirect:'/',
    failureRedirect: '/users/login',
  })
);

// logout
router.get('/logout',(req,res)=>{
  req.logout()
  res.redirect('/users/login')
})

module.exports = router