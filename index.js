const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))