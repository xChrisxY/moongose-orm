const usuario = require('../models/usuario');
const usuarioSchema = require('../models/usuario');
const comentarioSchema = require('../models/comment')
const publicacionSchema = require('../models/post')

const getUsuario = (req, res) => {
  usuarioSchema
    .find({})
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
}

const postUsuario = async (req, res) => {

  try {
    
    const { nombre, email } = req.body;

    const nuevoUsuario = new usuarioSchema({

      nombre,
      email

    });

    const usuarioGuardado = await nuevoUsuario.save();

    res.status(201).json(usuarioGuardado);

  } catch (error) {

    console.error('Error al crear el usuario:', error);
    res.status(500).json({ error: 'Error al crear el usuario' });
  }

};

const updateUsuario = async (req, res) => {
  try {
    const idComentario = req.params.id;
    const newContenido = req.body.contenido;

    const updatedComentario = await comentarioSchema.findByIdAndUpdate(
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

const findUsuariosPorEmail = async (req, res) => {
  const emailABuscar = req.params.email; 

  try {
    const usuariosEncontrados = await Usuario.find({ email: emailABuscar });

    if (usuariosEncontrados.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron usuarios con ese correo electrónico.' });
    }

    res.status(200).json(usuariosEncontrados);
  } catch (error) {
    console.error('Error al buscar usuarios por correo electrónico:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params.id
  
  try {
    await usuarioSchema.deleteOne({ id })
    // await comentarioSchema.deleteMany({ id })
    // await publicacionSchema.deleteMany({ id })
    res.send("eliminado correctamente")
  } catch (error) {
    res.status(500).json({ massage: "error al eliminar usuario" })
  }
}


module.exports = {
  getUsuario,
  postUsuario,
  updateUsuario,
  findUsuariosPorEmail,
  deleteUser
};