const mongoose = require('mongoose')
const { Schema } = mongoose
let counter = 1
let countedId = { type: Number, default: () => counter++ }
const recordSchema = new Schema({
  id: countedId,
  name: {
    type: String,
    required: true
  },
  date:{
    type: Date,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  userId: {
    type: Schema.Types.Number,
    ref: 'User',
    index: true,
    required: true
  },
  categoryId: {
    type: Schema.Types.Number,
    ref: 'Category',
    index: true,
    required: true
  }
});

module.exports = mongoose.model('Record', recordSchema)