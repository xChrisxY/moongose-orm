const express = require('express')
const eschemaComentarios = require('../models/comment')
const router = express.Router();


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
router.get('comentario/:id', (req, res) => {
    const { id } = req.params
    eschemaComentarios
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
})
router.put('comentario/:id', (req, res) => {
    const { id } = req.params
    const { idComentarios, contenido,fechaCreacion,publicacion,usuario } = req.body
    eschemaUsuario
        .updateOne({ _id: id }, { $set: { idComentarios, contenido,fechaCreacion,publicacion,usuario} })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
})
router.delete('comentario/:id', (req, res) => {

    eschemaUsuario.findByIdAndRemove(req.params.id , { new: true })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
})

module.exports=router;