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

applicationServer.use(express.json());
applicationServer.use(express.urlencoded({ extended: true }));

/**
 * Route: /
 * Method: GET
 */

 applicationServer.get('/', (req, res) => { res.send('Hello World!')})

/**
 * Route: Login
 * Method: POST
 */

applicationServer.post('/login', (req, res, next) => {
  console.log(req.body.usr);
  console.log(req.body.pwd);
   if(req.body.usr === 'luiz' && req.body.pwd === '123'){
    //auth ok
    const id = 1; //esse id viria do banco de dados
    const token = jwt.sign({ id }, process.env.SECRET, {
      expiresIn: 300 // expires in 5min
    });
    return res.json({ auth: true, token: token });
   }
  
   res.status(401).json({message: 'Login inválido!'});
})

/**
 * Route: db
 * Method: GET
 */

 applicationServer.get('/rota_query', verifyJWT, (req,res) => {
   return res.json({
     usuario: req.query['name']
   })
 })

applicationServer.get('/rota_param/:name', verifyJWT, (req,res) => {
  return res.json({
    usuario: req.params['name']
  })
})

applicationServer.get('/rota_header', verifyJWT, (req,res) => {
  return res.json({
    usuario: req.headers["name"]
  })
})

applicationServer.post('/rota_body', verifyJWT, (req, res, next) => {
  return res.json({
    usuario: req.body.name
  })
})

/**
 * Route: db
 * Method: GET
 */

applicationServer.get('/db', verifyJWT, async (req, res) => {
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

/**
 * Route: clientes
 * Method: GET
 */

applicationServer.get('/clientes', verifyJWT, (req, res, next) => { 
    console.log("Retornou todos clientes!");
    res.json([{id:1,nome:'luiz'}]);
  }) 

/**
 * Route: clientesjwt
 * Method: GET
 */

applicationServer.get('/clientesjwt', verifyJWT, (req, res, next) => { 
      console.log("Retornou todos clientes!");
      res.json([{id:1,nome:'luiz'}]);
  })

/**Start da API */

applicationServer.listen(PORT, () => console.log(`Listening on ${ PORT }`))

function verifyJWT(req, res, next){
    const token = req.headers['token'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) return res.status(401).json({ auth: false, message: 'Failed to authenticate token.' });
      
      // se tudo estiver ok, salva no request para uso posterior
      req.userId = decoded.id;
      next();
    });
}