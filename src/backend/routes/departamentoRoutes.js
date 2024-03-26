// routes/departamentoRoutes.js
const express = require('express');
const router = express.Router();
const departamentoController = require('../controllers/departamentoController');

router.get('/', departamentoController.getDepartamentos);
router.post('/', departamentoController.createDepartamento);

module.exports = router;
