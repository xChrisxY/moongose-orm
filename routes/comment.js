const express = require('express');
const CommentSchema = require('../models/comment');
const { getComentarios, postComentario, updateComentario, findComentariosPorPublicacion } = require('../controllers/commentControllers'); 
const router = express.Router();


router.post('/comentario', postComentario);

router.get('/comentario', getComentarios);

router.put('/update-comment/:id', updateComentario);

// Metodo para buscar comentarios por publicación
router.get('/buscarPorPublicacion/:publicacionId', findComentariosPorPublicacion);

module.exports = router;
