const CommentSchema = require('../models/comment');
const publicationSchema = require('../models/post');
const usuarioSchema = require('../models/usuario');


const getComentarios = (req, res) => {
  CommentSchema
    .find({})
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

const postComentario = async (req, res) => {

  try {

    const { contenido } = req.body;
    const publicacionId = req.params.id;

    console.log(publicacionId)

    const publicacion = await publicationSchema.findById(publicacionId);

    if (!publicacion) {

      return res.status(404).json({ error : 'Publicación no encontrada'})

    }

    const nuevoComentario = new CommentSchema({

      contenido,
      fechaCreacion: Date.now(),
      publicacion : publicacion._id

    });

    const comentarioGuardado = await nuevoComentario.save();
    publicacion.comentarios.push(comentarioGuardado._id);

    await publicacion.save();

    res.status(201).json(comentarioGuardado);

  } catch (error) {

    console.log(`Error al crear el comentario: ${error}`);
    res.status(404).json({ error : 'error al crear el comentario'});

  }

};

const updateComentario = async (req, res) => {

  try {
    
    const { contenido } = req.body;
    const postId = req.params.id;

    await CommentSchema.updateOne({ _id: postId }, { $set: { contenido } });

    res.json({ message: 'Comentario modificado con éxito' });

  } catch (error) {

    console.log(`Error al actualizar el comentario: ${error}`);
    return res.status(500).json({ message: 'Error al actualizar el comentario' });
    
  }
};

const findComentariosPorPublicacion = (req, res) => {
  const publicacionId = req.params.publicacionId;

  CommentSchema
    .find({ PublicacionId: publicacionId })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

const deleteCommentsByDate = async (req, res) => {
  const { fechaCreacion, publicacion } = req.params;

  try {
    const comentarioAEliminar = await CommentSchema.findOne({ fechaCreacion, publicacion });
    if (!comentarioAEliminar) {
      return res.status(404).json({ message: 'Comentario no encontrado' });
    }
    await comentarioAEliminar.deleteOne();
    return res.json({ message: 'Comentario eliminado ' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al eliminar el comentario' });
  }
}

module.exports = {
  getComentarios,
  postComentario,
  updateComentario,
  findComentariosPorPublicacion,
  deleteCommentsByDate
};


// if (!idComment) {

//   return res.status(404).json({ message: "Comment not found" })

// }

// console.log(`Comment update succesfully: ${updateComment}`);
// return res.status(200).json(`Comment update succesfully`);

// } catch (error) {

//   console.log(`Error al actualizar el usuario: ${error}`);
//   return res.status(500).json({ message: 'Error al actualizar la publicación' });

// }

// });