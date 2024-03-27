const express = require('express');
const router = express.Router();
const colaboradoresController = require('../controllers/colaboradoresController');

// Ruta para crear un nuevo colaborador
router.post('/', colaboradoresController.createColaborador);

// Ruta para obtener todos los colaboradores
router.get('/', colaboradoresController.getColaboradores);

module.exports = router;
