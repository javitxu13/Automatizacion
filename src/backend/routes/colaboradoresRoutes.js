const express = require('express');
const router = express.Router();
const colaboradorController = require('../controllers/colaboradoresController');

router.post('/', colaboradorController.agregarColaborador);

module.exports = router;
