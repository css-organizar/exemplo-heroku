const express = require('express');
const app = express();

app.get('/', (req,res) => res.send('Teste Heroku'));

const PORT = process.env.PORT || '3000';

// app.set("port",PORT);

app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });