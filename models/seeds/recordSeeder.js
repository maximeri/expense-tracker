const db = require('../../config/mongoose')
const User = require('../user')
const Record = require('../record')
const Category = require('../category')
const bcrypt = require('bcrypt')
const SEED_USER = require('../seeds/seed.json').SEED_USER
const SEED_RECORD = require('../seeds/seed.json').SEED_USER.SEED_RECORD


db.once('open', async () => {
  await bcrypt.genSalt(10)
  .then(salt=> bcrypt.hash( SEED_USER.password,salt))
  .then(hash => User.create({ name: `${SEED_USER.name}`, email: `${SEED_USER.email}`, password: `${hash}`}))
  .then(async user=>{
      for (i = 0; i < SEED_RECORD.length;i++) {
         await Record.create({
          name: `${SEED_RECORD[i].name}`,
          date: `${SEED_RECORD[i].date}`,
          amount: `${SEED_RECORD[i].amount}`,
           userId: `${SEED_RECORD[i].userId}`,
          categoryId: `${SEED_RECORD[i].categoryId}`
        })
        console.log(SEED_RECORD.length)
        console.log(`record ${i+1} time`)
      }
  })
  console.log('Record seeder done!')
  process.exit()
})