const express = require('express')
const eschemaUsuario = require('../models/usuario')
const router = express.Router();


router.post('/usuario', (req, res) => {
    const {user} = eschemaUsuario(req.body);
    user
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
})

router.get('/usuario', (req, res) => {
    eschemaUsuario
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
})
router.get('usuario/:id', (req, res) => {
    const { idUsuario } = req.params
    eschemaUsuario
        .findById(idUsuario)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
})
router.put('usuario/:id', (req, res) => {
    const { idUsuario } = req.params
    const { nombre, email } = req.body
    eschemaUsuario
        .updateOne({ _id: id }, { $set: { idUsuario, nombre, email } })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
})
router.delete('usuario/:id', (req, res) => {

    eschemaUsuario.findByIdAndRemove(req.params.idUsuario , { new: true })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
})

module.exports=router;