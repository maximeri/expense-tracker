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
  const userId = req.user.userId
  Record.create({ name, date, amount, categoryId, userId})
  .then(()=>res.redirect('/'))
})

// edit
router.get('/:id/edit', (req, res) => {
  const userId = req.user.userId
  const _id = req.params.id
  Record.findOne({userId,_id})
    .lean()
    .then(record => {
      const fomatted_date = moment(record.date).format('YYYY-MM-DD')
      res.render('edit', { record: record, date: fomatted_date,})
    })
})

router.put('/:id', async (req, res) => {
  const userId = req.user.userId
  const _id = req.params.id
  const { name, date, amount, categoryId } = req.body
  Record.findOne({ _id, userId})
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
  const userId = req.user.userId
  const _id = req.params.id
  await Record.deleteOne({ _id, userId })
  res.redirect(`/`)
})

module.exports = router