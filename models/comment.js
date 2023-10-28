      const mongoose = require('mongoose');

      const commentSchema = new mongoose.Schema({
            contenido: String,
            fechaCreacion: Date,
      }, {
            versionKey: false
      });

      module.exports = mongoose.model('Comment', commentSchema);