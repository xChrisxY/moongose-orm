const usuario = require('../models/usuario');
const usuarioSchema = require ('../models/usuario');


const getUsuario = (req, res) => {
    usuarioSchema
    .find({})
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}));
}

const postUsuario = (req, res) => {
    const comentario = new usuarioSchema(req.body);
    usuario
      .save()
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  };
  
  const updateUsuario = async (req, res) => {
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


  const findUsuariosPorEmail = (req, res) => {
    const email = req.params.email;

    usuario
        .find({ email: email })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
 };


  module.exports = {
    getUsuario,
    postUsuario,
    updateUsuario,
    findUsuariosPorEmail
  };