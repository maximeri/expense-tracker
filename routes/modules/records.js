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

// edit
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .lean()
    .then(record => {
      const fomatted_date = moment(record.date).format('YYYY-MM-DD')
      const category = categorize(record.categoryId)
      res.render('edit', { record: record, date: fomatted_date, category: category })
    })
})

router.post('/:id', async (req, res) => {
  const id = req.params.id
  const { name, date, amount, categoryId } = req.body
  Record.findById(id)
    .then(record => {
      record.name = name
      record.date = date
      record.amount = amount
      record.categoryId = categoryId
      return record.save()

    })
    .then(() => res.redirect(`/records/${id}/edit`))
})

// delete


module.exports = router