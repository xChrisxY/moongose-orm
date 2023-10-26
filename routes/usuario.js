const express = require('express');
const Usuario = require('../models/usuario'); // Asegúrate de importar el modelo correcto
const { getUsuario, postUsuario, updateUsuario, findUsuariosPorEmail } = require('../controllers/usuarioControllers');
const router = express.Router();

router.post('/usuario', postUsuario);

router.get('/usuario', getUsuario);

router.put('/update-usuario/:id', updateUsuario);

// Metodo para buscar usuarios por email
router.get('/usuario/buscarPorEmail/:email', buscarUsuariosPorEmail);

module.exports = router;
