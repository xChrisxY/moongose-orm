const express = require('express')
const CommentSchema = require('../models/comment')
const router = express.Router();

// Método para agregar un comentario
router.post('/comentario', (req, res) => {
    const commentarios = CommentSchema(req.body);
    commentarios
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
})

router.get('/comentario', (req, res) => {
    CommentSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
})

router.put('/update-comment/:id', async (req, res) => {

    try {
        const idComment = req.params.id;
        const newContent = req.body.contenido;

        const updateComment = await CommentSchema.findByIdAndUpdate(
            idComment,
            { contenido: newContent },
            { new: true }
        );

        if (!idComment) {

            return res.status(404).json({ message: "Comment not found" })

        }

        console.log(`Comment update succesfully: ${updateComment}`);
        return res.status(200).json(`Comment update succesfully`);

    } catch (error) {

        console.log(`Error al actualizar el usuario: ${error}`);
        return res.status(500).json({ message: 'Error al actualizar la publicación'});

    }

});

router.delete("/comment/:fechaCreacion/:publicacion", async (req, res) => {
  const { fechaCreacion, publicacion } = req.params;

  try {
    const comentarioAEliminar = await CommentSchema.findOne({ fechaCreacion, publicacion });
    if (!comentarioAEliminar) {
      return res.status(404).json({ message: 'Comentario no encontrado' });
    }
    await comentarioAEliminar.deleteOne();
    return res.json({ message: 'Comentario eliminado ' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al eliminar el comentario' });
  }
});



module.exports=router;