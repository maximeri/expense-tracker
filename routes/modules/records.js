const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const Record = require('../../models/record')

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/new', (req, res) => {
  const {name, date,amount,categoryId} = req.body
  const userId = 1 // needs refactor
  Record.create({ name, date, amount, categoryId,userId})
  .then(()=>res.redirect('/'))
})

module.exports = router