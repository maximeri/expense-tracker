const mongoose = require('mongoose')
MONGODB_URI = 'mongodb://localhost/expense-list'
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).catch (error => handleError(error))
const db = mongoose.connection

// connection events
db.once('open',()=>{
  console.log('mongodb connected!')
})

db.on('error', err => {
  logError(err);
  console.log('mongodb error!')
});

module.exports = db