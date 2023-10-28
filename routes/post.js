const express = require('express')
const { getPublications, postPublications, updatePublications, deletePublicationByDate, findPublicacionesPorUsuario } = require('../controllers/publicationControllers');
const router = express.Router();

// Método para agregar una publicación
router.post('/post/:id', postPublications);

router.get('/post', getPublications);

router.put('/update-publication/:id', updatePublications);

//Metodo para buscar publicaciones por usuario
router.get('/buscarPorUsuario/:usuarioId', findPublicacionesPorUsuario);

router.delete('/post/:fechaCreacion', deletePublicationByDate);



module.exports = router;