const mongoose = require('mongoose')
const { Schema } = mongoose
let counter = 1;
let countedId = { type: Number, default: () => counter++ };
const userSchema = new Schema({
  id: countedId,
  name: {type: String,required: false},
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model('User', userSchema)