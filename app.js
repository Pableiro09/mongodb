const express = require('express');
const path  = require('path');
const bodyParser = require('body-parser');
const app = express();

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));



mongoose.connect('mongodb://localhost:3000/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
    // Resto de tu código...
  })
  .catch(error => {
    console.error('Error de conexión a la base de datos:', error.message);
  });

app.get('/', (req, res)=>{

});
app.listen(3000,()=>{
    console.log('server started');
})
module.exports = app;