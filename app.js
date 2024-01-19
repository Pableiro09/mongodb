const express = require('express');
const path  = require('path');
const bodyParser = require('body-parser');
const app = express();

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User  = require('./public/user');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));



mongoose.connect('mongodb+srv://prs0011:6JMpW5V4QnnbhQz1@login.tdcfzxp.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
    // Resto de tu código...
  })
  .catch(error => {
    console.error('Error de conexión a la base de datos:', error.message);
  });

  app.post('/register', async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = new User({ username, password });
  
      await user.save();
      res.status(200).send('Usuario registrado');
    } catch (err) {
      console.error(err);
      res.status(500).send('Fallo al registrar el usuario');
    }
  });
  
  app.post('/authenticate', async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
  
      if (!user) {
        res.status(500).send('Usuario no encontrado');
        return;
      }
  
      const result = await user.isCorrectPassword(password);
  
      if (result) {
        res.status(200).send('Usuario logueado correctamente');
      } else {
        res.status(500).send('Usuario y/o contraseña incorrecta');
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Error al loguear el usuario');
    }
  });
  

app.listen(3000,()=>{
    console.log('server started');
})
module.exports = app;
