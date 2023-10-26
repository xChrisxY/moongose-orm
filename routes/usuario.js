const express = require('express')
const usuarioSchema = require('../models/usuario')
const router = express.Router();

//Método para agregar un usuario
router.post('/usuario', (req, res) => {
    const user = usuarioSchema(req.body);
    console.log(user);  
    user
        .save()
        .then((data) => res.send(`Se ha creado el usuario correctamente: ${data}`))
        .catch((error) => res.json({ message: error }))
})

router.get('/usuario', (req, res) => {
    usuarioSchema
        .find({})
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
})



module.exports=router;