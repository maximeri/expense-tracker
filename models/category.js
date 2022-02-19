const mongoose = require('mongoose')
const { Schema } = mongoose
let counter = 1;
let countedId = { type: Number, default: () => counter++ }
const categorySchema = new Schema({
  id: countedId,
  name: { type: String, required: true},
  icon:{type:String}
})

module.exports = mongoose.model('Category', categorySchema)