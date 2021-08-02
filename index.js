const express = require('express')

const path = require('path')
const PORT = process.env.PORT || 5000

const applicationServer = express()

/**Iniciando a API */

applicationServer.use(express.static(path.join(__dirname, 'public')))
applicationServer.set('views', path.join(__dirname, 'views'))
applicationServer.set('view engine', 'ejs')

/**Métodos da API */

applicationServer.get('/', (req, res) => { res.send('Hello World!')})

/**Start da API */

applicationServer.listen(PORT, () => console.log(`Listening on ${ PORT }`))