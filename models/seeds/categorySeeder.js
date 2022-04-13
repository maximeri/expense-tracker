if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')
const Category = require('../category')
const SEED_CATEGORY = require('../seeds/seed.json').SEED_CATEGORY

db.once('open', async () => {
  for (i = 0; i < SEED_CATEGORY.length; i++) {
    await Category.create({ name: `${SEED_CATEGORY[i].name}`, id: i + 1, icon: SEED_CATEGORY[i].icon})
    }
  console.log('Category seeder done!')
  process.exit()
})