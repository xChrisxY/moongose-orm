const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({

      nombre: {
            type: String,
            required: true
      },
      email: {
            type: String,
            required: true,
      },

}, {
      versionKey : false
});

module.exports = mongoose.model('Usuario', usuarioSchema);

