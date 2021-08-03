const express = require('express');
const routes = express.Router();

const jwt = require('jsonwebtoken');

/**Adicionando o "pg" para trabalhar com o PostgreSQL */

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const pg = require('knex')({
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING,
  searchPath: ['knex', 'public'],
});

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

/**
 * Route: /
 * Method: GET
 */

 routes.get('/', (req, res) => { res.send('Hello World!')})

/**
 * Route: Login
 * Method: POST
 */

routes.post('/login', (req, res, next) => {
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

 routes.get('/rota_query', verifyJWT, (req,res) => {
   return res.json({
     usuario: req.query['name']
   })
 })

routes.get('/rota_param/:name', verifyJWT, (req,res) => {
  return res.json({
    usuario: req.params['name']
  })
})

routes.get('/rota_header', verifyJWT, (req,res) => {
  return res.json({
    usuario: req.headers["name"]
  })
})

routes.post('/rota_body', verifyJWT, (req, res, next) => {
  return res.json({
    usuario: req.body.name
  })
})

/**
 * Route: db
 * Method: GET
 */

routes.get('/db', verifyJWT, async (req, res) => {
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

  routes.get('/knex', verifyJWT, async (req, res) => {
    try {

      // const client = await pool.connect();
      // const result = await client.query('SELECT * FROM test_table');
      
      const result1 = knex.select().table('test_table');
      
      const results = { 'results': (result1) ? result1.rows : null};
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

routes.get('/clientes', verifyJWT, (req, res, next) => { 
    console.log("Retornou todos clientes!");
    res.json([{id:1,nome:'luiz'}]);
  }) 

/**
 * Route: clientesjwt
 * Method: GET
 */

routes.get('/clientesjwt', verifyJWT, (req, res, next) => { 
      console.log("Retornou todos clientes!");
      res.json([{id:1,nome:'luiz'}]);
  })

module.exports = routes;