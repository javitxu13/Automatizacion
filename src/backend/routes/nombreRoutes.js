// routes/usuarioRoutes.js
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/nombreController');

router.post('/', usuarioController.crearUsuario);

module.exports = router;
