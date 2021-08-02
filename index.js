const express = require('express')

/**Utilitários para trabalhar com caminhos de arquivos e diretórios */

const path = require('path')

/**Definição da porta para START da API */

const PORT = process.env.PORT || 5000

/**Adicionando o "pg" para trabalhar com o PostgreSQL */

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

/**Iniciando o express */

const applicationServer = express()

/**Iniciando a API */

applicationServer.use(express.static(path.join(__dirname, 'public')))
applicationServer.set('views', path.join(__dirname, 'views'))
applicationServer.set('view engine', 'ejs')

/**Métodos da API */

applicationServer.get('/', (req, res) => { res.send('Hello World!')})

applicationServer.get('/db', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM test_table');
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/db', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })

/**Start da API */

applicationServer.listen(PORT, () => console.log(`Listening on ${ PORT }`))