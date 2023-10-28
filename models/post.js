const mongoose = require('mongoose');


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

postSchema.pre('remove', async function(next) {

      const comentarioSchema = require('../models/comment')
    
      await comentarioSchema.deleteMany({ _id: { $in: this.comentarios } });
    
      next();
      
    });

module.exports = mongoose.model('Post', postSchema);