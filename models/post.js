const mongoose = require('mongoose');
const CommentSchema = require('./comment');

const postSchema = new mongoose.Schema({
      
      titulo: String,
      contenido: String,
      fechaCreacion: Date,
      comentarios : [{

            type: mongoose.Schema.Types.ObjectId,
            ref : 'Comment'

      }]

}, {
      versionKey : false
});

module.exports = mongoose.model('Post', postSchema);