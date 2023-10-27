const PublicationSchema = require('../models/post');
const usuarioSchema = require('../models/usuario')
const comentarioSchema = require('../models/comment')

const getPublications = (req, res) => {
    PublicationSchema
        .find({})
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
}

const postPublications = async (req, res) => {

    try {

        const { titulo, contenido } = req.body;
        const { id } = req.params;

        const usuario = await usuarioSchema.findById(id);

        if (!usuario) {

            return res.status(404).json({ error: 'Usuario no encontrado' });

        }

        const nuevaPublicacion = new PublicationSchema({

            titulo,
            contenido,
            fechaCreacion: Date.now()

        });

        usuario.publicaciones.push(nuevaPublicacion);

        await nuevaPublicacion.save();
        await usuario.save();

        res.status(201).json(nuevaPublicacion);

    } catch (error) {

        console.error('Error al crear la publicación:', error);
        res.status(500).json({ error: 'Error al crear la publicación' });

    }

}

const updatePublications = async (req, res) => {

    try {
        const { contenido } = req.body;
        const postId = req.params.id;

        await PublicationSchema.updateOne({ _id: postId }, { $set: { contenido } });

        res.json({ message: 'Publicación modificada con éxito' });

    } catch (error) {

        console.error('Error al modificar la publicación:', error);
        res.status(500).json({ error: 'Error al modificar la publicación' });

    }

}

const findPublicationPorUsuario = (req, res) => {
    const usuarioId = req.params.usuarioId;

    PublicationSchema
        .find({ usuario: usuarioId })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
}

const deletePublicationByDate = async (req, res) => {
    const { fechaCreacion } = req.params;

    try {
        const postAEliminar = await PublicationSchema.findOne({ fechaCreacion });
        if (!postAEliminar) {
            return res.status(404).json({ message: 'Publicación no encontrada' });
        }
        const comentarios = postAEliminar.comentarios;
        await postAEliminar.deleteOne();
        await comentarioSchema.deleteMany({ _id: { $in: comentarios } });

        return res.json({ message: 'Publicación eliminada' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al eliminar la publicación' });
    }
}


module.exports = {

    findPublicationPorUsuario,
    getPublications,
    postPublications,
    updatePublications,
    deletePublicationByDate

}