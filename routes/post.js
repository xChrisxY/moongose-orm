const express = require('express')
const { getPublications, postPublications, updatePublications, findPublicationPorUsuario, deletePublicationByDate } = require('../controllers/publicationControllers');
const router = express.Router();

// Método para agregar una publicación
router.post('/post', postPublications);

router.get('/post', getPublications);

router.put('/update-publication/:id', updatePublications);

//Metodo para buscar publicaciones por usuario
router.get('/buscarPorUsuario/:usuarioId', findPublicationPorUsuario);

router.delete('/post/:fechaCreacion', deletePublicationByDate);



module.exports = router;