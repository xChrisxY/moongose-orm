const express = require('express')
const PublicationSchema = require('../models/post')
const { getPublications, postPublications, updatePublications } = require('../controllers/publicationControllers');
const router = express.Router();

// Método para agregar una publicación
router.post('/post', postPublications);

router.get('/post', getPublications);

router.put('/update-publication/:id', updatePublications);


router.delete('/post/:fechaCreacion', async (req, res) => {
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
});



module.exports = router;