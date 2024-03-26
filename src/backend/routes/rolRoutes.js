// routes/rolRoutes.js
const express = require('express');
const router = express.Router();
const rolController = require('../controllers/rolController');

router.post('/', rolController.actualizarRol);

module.exports = router;
