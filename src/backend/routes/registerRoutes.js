// Importaciones necesarias
const express = require('express');
const registerController = require('../controllers/registerController');
// Importa los middlewares de validación y manejo de errores de validación
const { validateRegistrationInput, handleValidationErrors } = require('../middlewares/validationMiddlewares');

const router = express.Router();

// Define la ruta para el registro utilizando los middlewares de validación y manejo de errores importados
router.post('/', validateRegistrationInput, handleValidationErrors, registerController.register);

module.exports = router;
