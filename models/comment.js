const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
      contenido: String,
      fechaCreacion: Date,
      publicacion: {

            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'

      },

      usuario: {

            type: mongoose.Schema.Types.ObjectId,
            ref: 'Usuario'

      }

});

module.exports = mongoose.model('Comment', commentSchema);