// routes/procesoRoutes.js
const express = require('express');
const router = express.Router();
const procesosController = require('../controllers/procesoController');

router.post('/', procesosController.createProceso);
router.get('/', procesosController.getProcesos);

module.exports = router;
