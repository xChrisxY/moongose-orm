const express = require('express');
const Usuario = require('../models/usuario'); 
const { getUsuario, postUsuario, updateUsuario, findUsuariosPorEmail } = require('../controllers/usuarioControllers');
const router = express.Router();

router.post('/usuario', postUsuario);

router.get('/usuario', getUsuario);

router.put('/update-usuario/:id', updateUsuario);

// Metodo para buscar usuarios por email
router.get('/usuario/buscarPorEmail/:email', findUsuariosPorEmail);

module.exports = router;
