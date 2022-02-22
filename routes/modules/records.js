const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const moment = require('moment')

function categorize(categorId) {
  if (categorId === 1){
    return '家居物業'
  } else if (categorId === 2) {
    return '交通出行'
  } else if (categorId === 3) {
    return '休閒娛樂'
  } else if (categorId === 4) {
    return '餐飲食品'
  } else if (categorId === 5) {
    return '其他'
  }
}
// new
router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  const {name, date,amount,categoryId} = req.body
  const userId = 1 // needs refactor
  Record.create({ name, date, amount, categoryId,userId})
  .then(()=>res.redirect('/'))
})




module.exports = router