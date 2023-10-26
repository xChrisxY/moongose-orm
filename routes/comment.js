const express = require('express')
const eschemaComentarios = require('../models/comment')
const router = express.Router();

// Método para agregar un comentario
router.post('/comentario', (req, res) => {
    const commentarios = eschemaComentarios(req.body);
    commentarios
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
})

router.get('/comentario', (req, res) => {
    eschemaComentarios
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
})


module.exports=router;