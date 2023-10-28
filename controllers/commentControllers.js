const comment = require('../models/comment');
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

      return res.status(404).json({ error: 'Publicación no encontrada' })

    }

    const nuevoComentario = new CommentSchema({

      contenido,
      fechaCreacion: Date.now(),
      publicacion: publicacion._id

    });

    const comentarioGuardado = await nuevoComentario.save();
    publicacion.comentarios.push(comentarioGuardado._id);

    await publicacion.save();

    res.status(201).json(comentarioGuardado);

  } catch (error) {

    console.log(`Error al crear el comentario: ${error}`);
    res.status(404).json({ error: 'error al crear el comentario' });

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

const findComentariosPorPublicacion = async (req, res) => {
  const postId = req.params.postId;

  try {
    const comentariosEncontrados = await Comment.find({ post: postId });

    if (comentariosEncontrados.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron comentarios para esta publicación.' });
    }

    res.status(200).json(comentariosEncontrados);
  } catch (error) {
    console.error('Error al buscar comentarios por publicación:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

const deleteCommentsByDate = async (req, res) => {
  const  fechaCreacion  = new Date(req.params.fechaCreacion)
  const  publicacion  = req.params.publicacion
  try {
    const publicacionB = await publicationSchema.findById(publicacion);
    if (!publicacionB) {
      return res.status(404).json({ message: 'Comentario no encontrado' });
    }
    const comentarioB = await CommentSchema.findOne({ fechaCreacion: { $gte: fechaCreacion } })
    let comentarioAEliminar = null; 

publicacionB.comentarios.forEach(function(coment) {
  if (coment.equals(comentarioB.id)) {
    comentarioAEliminar = coment;
  }
});
  await CommentSchema.findByIdAndDelete(comentarioAEliminar)
    return res.json({message:"eliminado"});
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
