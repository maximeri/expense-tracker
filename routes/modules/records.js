const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const moment = require('moment')

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
      res.render('edit', { record: record, date: fomatted_date,})
    })
})

router.put('/:id', async (req, res) => {
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
    .then(() => res.redirect(`/`))
})

// delete
router.delete('/:id', async (req, res) => {
  const id = req.params.id
  await Record.deleteOne({ _id: id })
  res.redirect(`/`)
})

module.exports = router