const express = require('express')
const PostSchema = require('../models/post')
const router = express.Router();

// Método para agregar una publicación
router.post('/post', (req, res) => {
    const publicacion = PostSchema(req.body);
    publicacion
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
})

router.get('/post', (req, res) => {
    PostSchema
        .find({})
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
})


module.exports=router;