require("dotenv-safe").config();
const jwt = require('jsonwebtoken');

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

applicationServer.post('/login', (req, res, next) => {
  //esse teste abaixo deve ser feito no seu banco de dados
  if(req.body.user === 'luiz' && req.body.password === '123'){
    //auth ok
    const id = 1; //esse id viria do banco de dados
    const token = jwt.sign({ id }, process.env.SECRET, {
      expiresIn: 300 // expires in 5min
    });
    return res.json({ auth: true, token: token });
  }
  
  res.status(500).json({message: 'Login inválido!'});
})

applicationServer.post('/logout', function(req, res) {
    res.json({ auth: false, token: null });
})

applicationServer.get('/', (req, res) => { res.send('Hello World!')})

applicationServer.get('/db', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM test_table');
      const results = { 'results': (result) ? result.rows : null};
      res.send(results);
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })

applicationServer.get('/clientes', (req, res, next) => { 
    console.log("Retornou todos clientes!");
    res.json([{id:1,nome:'luiz'}]);
  }) 

applicationServer.get('/clientesjwt', verifyJWT, (req, res, next) => { 
      console.log("Retornou todos clientes!");
      res.json([{id:1,nome:'luiz'}]);
  })

/**Start da API */

applicationServer.listen(PORT, () => console.log(`Listening on ${ PORT }`))

function verifyJWT(req, res, next){
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
      
      // se tudo estiver ok, salva no request para uso posterior
      req.userId = decoded.id;
      next();
    });
}