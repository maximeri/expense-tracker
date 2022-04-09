const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const User = require('../modules/users')
const moment = require('moment')

router.get('/', async (req, res) => {
  const userId = req.user._id
  await Record.find(userId).lean()
  .then(records=> {
    let totalAmount = 0
    records.forEach(record => {
      const amount = record.amount
      record.date = moment(record.date).format('YYYY-MM-DD')
      totalAmount = totalAmount + amount
    })
    res.render('index', { records, totalAmount})
  }) 
  .catch(error=>console.log(error))
})


// sort
router.get('/sortBy=household', async (req, res) => {
  await Record.find({categoryId:1}).lean()
    .then(records => {
      let totalAmount = 0
      records.forEach(record => {
        const amount = record.amount
        record.date = moment(record.date).format('YYYY-MM-DD')
        totalAmount = totalAmount + amount
      })
      res.render('index', { records, totalAmount })
    })
    .catch(error => console.log(error))
})

router.get('/sortBy=transportation', async (req, res) => {
  await Record.find({ categoryId: 2 }).lean()
    .then(records => {
      let totalAmount = 0
      records.forEach(record => {
        const amount = record.amount
        record.date = moment(record.date).format('YYYY-MM-DD')
        totalAmount = totalAmount + amount
      })
      res.render('index', { records, totalAmount })
    })
    .catch(error => console.log(error))
})

router.get('/sortBy=entertainment', async (req, res) => {
  await Record.find({ categoryId: 3 }).lean()
    .then(records => {
      let totalAmount = 0
      records.forEach(record => {
        const amount = record.amount
        record.date = moment(record.date).format('YYYY-MM-DD')
        totalAmount = totalAmount + amount
      })
      res.render('index', { records, totalAmount })
    })
    .catch(error => console.log(error))
})

router.get('/sortBy=food', async (req, res) => {
  await Record.find({ categoryId: 4 }).lean()
    .then(records => {
      let totalAmount = 0
      records.forEach(record => {
        const amount = record.amount
        record.date = moment(record.date).format('YYYY-MM-DD')
        totalAmount = totalAmount + amount
      })
      res.render('index', { records, totalAmount })
    })
    .catch(error => console.log(error))
})

router.get('/sortBy=other', async (req, res) => {
  await Record.find({ categoryId: 5}).lean()
    .then(records => {
      let totalAmount = 0
      records.forEach(record => {
        const amount = record.amount
        record.date = moment(record.date).format('YYYY-MM-DD')
        totalAmount = totalAmount + amount
      })
      res.render('index', { records, totalAmount })
    })
    .catch(error => console.log(error))
})

module.exports = router