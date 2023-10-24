const express = require('express');

const app = express();

const connectToDatabase = require('./connection/connect');

require('dotenv').config()

connectToDatabase();

const PORT = process.env.PORT || 3000


const usuario=require('./routes/usuario')
app.use('/api',usuario);

app.listen(PORT, () => {

      console.log(`Servidor en ejecución en el puerto ${PORT}`);

});

