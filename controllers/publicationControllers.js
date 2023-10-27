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
      const publicacionesEncontradas = await Post.find({ usuario: userId });
  
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

    findPublicacionesPorUsuario,
    getPublications,
    postPublications,
    updatePublications,
    deletePublicationByDate

}