const mongoose = require('mongoose');

const usuarioSchema = new mongoose.model({

      nombre : String,
      email : String

});

module.exports = mongoose.model('Usuario', usuarioSchema);

