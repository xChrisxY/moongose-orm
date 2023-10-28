const { getUsuario, postUsuario, updateUsuario, findUsuariosPorEmail, deleteUser } = require('../controllers/usuarioControllers');
const express = require('express')

const router = express.Router();

router.post('/usuario', postUsuario);

router.get('/usuario', getUsuario);

router.put('/update-usuario/:id', updateUsuario);

router.delete("/usuario/:id", deleteUser);

router.get('/usuario/buscarPorEmail/:email', findUsuariosPorEmail);

module.exports = router;
