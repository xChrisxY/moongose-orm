const express = require('express');
require('dotenv').config()

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000

const connectToDatabase = require('./connection/connect');

connectToDatabase();


const usuario = require('./routes/usuario')
const publicacion = require('./routes/post')
const comentario = require('./routes/comment')
app.use('/api',usuario);
app.use('/api', publicacion);
app.use('/api', comentario);

app.listen(PORT, () => {

      console.log(`Servidor en ejecución en el puerto ${PORT}`);

});

