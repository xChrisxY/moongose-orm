const express = require('express');
const { getComentarios, postComentario, updateComentario, findComentariosPorPublicacion, deleteCommentsByDate } = require('../controllers/commentControllers');
const router = express.Router();

router.post('/comentario/:id', postComentario);

router.get('/comentario', getComentarios);

router.put('/update-comment/:id', updateComentario);

// Metodo para buscar comentarios por publicación
router.get('/buscarPorPublicacion/:publicacionId', findComentariosPorPublicacion);

//Método para eliminar comentario por fecha y publicación
router.delete("/comment/:fechaCreacion/:publicacion", deleteCommentsByDate);

module.exports = router;
