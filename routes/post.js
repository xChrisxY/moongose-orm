const express = require('express')
const eschemaPublicacion = require('../models/post')
const router = express.Router();


router.post('/post', (req, res) => {
    const publicacion = eschemaPublicacion(req.body);
    publicacion
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
})

router.get('/post', (req, res) => {
    eschemaPublicacion
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
})
router.get('post/:id', (req, res) => {
    const { id } = req.params
    eschemaPublicacion
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
})
router.put('post/:id', (req, res) => {
    const { id } = req.params
    const { titulo, contenido,fechaCreacion,usuario } = req.body
    eschemaPublicacion
        .updateOne({ _id: id }, { $set: { titulo, contenido,fechaCreacion,usuario } })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
})
router.delete('post/:id', (req, res) => {

    eschemaUsuario.findByIdAndRemove(req.params.id , { new: true })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
})

module.exports=router;