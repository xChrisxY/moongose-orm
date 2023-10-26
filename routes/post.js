const express = require('express')
const PublicationSchema = require('../models/post')
const { getPublications, postPublications, updatePublications } = require('../controllers/publicationControllers');
const router = express.Router();

// Método para agregar una publicación
router.post('/post', postPublications);

router.get('/post', getPublications);

router.put('/update-publication/:id', updatePublications);


module.exports = router;