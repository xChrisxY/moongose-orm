const express = require('express')
const PublicationSchema = require('../models/post')
const { getPublications, postPublications, updatePublications, findPublicationPorUsuario } = require('../controllers/publicationControllers');
const router = express.Router();

// Método para agregar una publicación
router.post('/post', postPublications);

router.get('/post', getPublications);

router.put('/update-publication/:id', updatePublications);

//Metodo para buscar publicaciones por usuario
router.get('/buscarPorUsuario/:usuarioId', findPublicationPorUsuario);


module.exports = router;