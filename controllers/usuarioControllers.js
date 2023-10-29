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
    const userId = req.params.id;
    const { nombre, email } = req.body;

    const usuario = await usuarioSchema.findById(userId);

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }


    usuario.nombre = nombre;
    usuario.email = email;

    await usuario.save();

    res.status(200).json({ usuario });

  } catch (error) {

    console.error('Error al actualizar el usuario:', error);
    res.status(500).json({ error: 'Error al actualizar el usuario' });

  }
};

const findUsuariosPorEmail = async (req, res) => {
  const emailABuscar = req.params.email;

  try {
    const usuariosEncontrados = await usuarioSchema.find({ email: emailABuscar });

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
  const { id } = req.params;

  try {

    const usuario = await usuarioSchema.findById(id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const publicacionIds = usuario.publicaciones;
    const post = await publicacionSchema.findById({ $in: publicacionIds })
    const allComents = post.comentarios;
    await comentarioSchema.deleteMany({ _id: { $in: allComents } })
    await publicacionSchema.deleteMany({ _id: { $in: publicacionIds } });
    await usuario.deleteOne();
    res.send({ message:"usuario eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el usuario " });
  }
}



module.exports = {
  getUsuario,
  postUsuario,
  updateUsuario,
  findUsuariosPorEmail,
  deleteUser
};