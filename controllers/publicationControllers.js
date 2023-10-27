const PublicationSchema = require('../models/post');
const usuarioSchema = require('../models/usuario')

const getPublications = (req, res) => {
    PublicationSchema
        .find({})
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
}

const postPublications = async (req, res) => {
    
    try {

        const {titulo, contenido} = req.body;
        const { id } = req.params;
        
        const usuario = await usuarioSchema.findById(id);

        if (!usuario) {

            return res.status(404).json({ error : 'Usuario no encontrado'});

        }

        const nuevaPublicacion = new PublicationSchema({

            titulo,
            contenido,
            fechaCreacion : Date.now()

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
        const idPublication = req.params.id;
        const newContent = req.body.contenido;

        const updateUser = await PublicationSchema.findByIdAndUpdate(
            idPublication,
            { contenido: newContent },
            { new: true }
        );

        if (!idPublication) {

            return res.status(404).json({ message: "Publication not found" })

        }

        console.log(`Publication update succesfully: ${updateUser}`);
        return res.status(200).json(`Publication update succesfully`);

    } catch (error) {

        console.log(`Error al actualizar el usuario: ${error}`);
        return res.status(500).json({ message: 'Error al actualizar la publicación' });

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
            return res.status(404).json({ message: 'publicacion no encontrada' });
        }
        await postAEliminar.deleteOne()
        return res.json({ message: 'publicacion eliminada ' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al eliminar la publicacion' });
    }
}

module.exports = {

    findPublicationPorUsuario,
    getPublications,
    postPublications,
    updatePublications,
    deletePublicationByDate

}