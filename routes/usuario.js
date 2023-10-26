const express = require('express')
const usuarioSchema = require('../models/usuario')
const comentarioSchema=require('../models/comment')
const publicacionSchema=require('../models/post')
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

router.delete("/usuario/:id",async(req,res)=>{
    const {id}=req.params.id
    try {
        await comentarioSchema.deleteMany({id})
        await publicacionSchema.deleteMany({id})
        await usuarioSchema.deleteOne({id})
        res.send("eliminado correctamente")
    } catch (error) {
        res.status(500).json({massage:"error al eliminar usuario"})
    }
})



module.exports=router;