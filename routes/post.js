const express = require('express')
const PublicationSchema = require('../models/post')
const router = express.Router();

// Método para agregar una publicación
router.post('/post', (req, res) => {
    const publicacion = PublicationSchema(req.body);
    publicacion
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
})

router.get('/post', (req, res) => {
    PublicationSchema
        .find({})
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
})

router.put('/update-publication/:id', async (req, res) => {

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
        return res.status(500).json({ message: 'Error al actualizar la publicación'});

    }

});


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