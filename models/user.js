const mongoose = require('mongoose')
const { Schema } = mongoose
let counter = 1;
let countedId = { type: Number, default: () => counter++ };
const userSchema = new Schema({
  id: countedId,
  name: {type: String,required: true},
  email: { type: String, required: true },
  password: { type: String, required: true }
})

module.exports = mongoose.model('User', userSchema)