const mongoose = require('mongoose');
const publicacionSchema = require('./post');

const usuarioSchema = new mongoose.Schema({

      nombre: {
            type: String,
            required: true
      },
      email: {
            type: String,
            required: true,
      },

      publicaciones : [{

            type: mongoose.Schema.Types.ObjectId,
            ref : 'Post'
      }]

}, {
      versionKey : false
});

module.exports = mongoose.model('Usuario', usuarioSchema);

