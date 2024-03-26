// routes/empresas.js
const express = require('express');
const router = express.Router();
const empresaController = require('../controllers/empresaController');

router.post('/', empresaController.crearEmpresa);

module.exports = router;
