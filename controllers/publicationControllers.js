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

const findPublicacionesPorUsuario = async (req, res) => {
    const userId = req.params.userId;

    try {
        const publicacionesEncontradas = await PublicationSchema.find({ usuario: userId });

        if (publicacionesEncontradas.length === 0) {
            return res.status(404).json({ mensaje: 'No se encontraron publicaciones para este usuario.' });
        }

        res.status(200).json(publicacionesEncontradas);
    } catch (error) {
        console.error('Error al buscar publicaciones por usuario:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

const deletePublicationByDate = async (req, res) => {

    try {

        const fechaCreacion = new Date(req.params.fechaCreacion);

        const publicacion = await PublicationSchema.findOne({ fechaCreacion: { $gte: fechaCreacion } });

        if (!publicacion) {
            return res.status(404).json({ error: 'Publicación no encontrada' });
        }

        await comentarioSchema.deleteMany({ _id: { $in: publicacion.comentarios } });
        await publicacion.deleteOne();

        res.status(200).json({ message: 'Publicación eliminada' });

    } catch (error) {

        console.error('Error al eliminar la publicación:', error);
        res.status(500).json({ error: 'Error al eliminar la publicación' });

    }
}

module.exports = {

    findPublicacionesPorUsuario,
    getPublications,
    postPublications,
    updatePublications,
    deletePublicationByDate

}