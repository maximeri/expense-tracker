const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const User = require('../../models/user')
const bcrypt = require('bcrypt')

router.get('/register',(req,res)=>{
  res.render('register')
})

router.post('/register', async (req, res) => {
  
  const {name,email} = req.body
  await bcrypt.genSalt(10)
    .then(salt => bcrypt.hash(req.body.password,salt))
    .then(hash => User.create({ name, email, password: hash})) 
    .then(() => res.redirect('/'))
})

module.exports = router