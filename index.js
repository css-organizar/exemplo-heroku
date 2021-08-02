const express = require('express');
const app = express();

app.get('/', (req,res) => res.send('Teste Heroku'));

const PORT = process.env.PORT || '3000';

app.set("port",PORT);