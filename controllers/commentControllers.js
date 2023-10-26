const CommentSchema = require('../models/comment');

const getComentarios = (req, res) => {
  CommentSchema
    .find({})
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

const postComentario = (req, res) => {
  const comentario = new CommentSchema(req.body);
  comentario
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

const updateComentario = async (req, res) => {
  try {
    const idComentario = req.params.id;
    const newContenido = req.body.contenido;

    const updatedComentario = await CommentSchema.findByIdAndUpdate(
      idComentario,
      { contenido: newContenido },
      { new: true }
    );

    if (!updatedComentario) {
      return res.status(404).json({ message: "Comentario no encontrado" });
    }

    console.log(`Comentario actualizado exitosamente: ${updatedComentario}`);
    return res.status(200).json(`Comentario actualizado exitosamente`);
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