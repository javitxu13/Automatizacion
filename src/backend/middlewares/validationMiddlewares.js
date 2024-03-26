const { body, validationResult } = require('express-validator');

exports.validateRegistrationInput = [
  // Validación de correo electrónico mejorada para mayor claridad y mantenimiento
  body('email')
    .isEmail()
    .withMessage('Ingrese un correo electrónico válido'),

  // Simplificación de la validación del número de empleados para mejor legibilidad y mantenimiento
  body('numEmpleados')
    .optional()
    .isIn(['1-50', '51-100', '101-300', '301-500', '500+'])
    .withMessage('El número de empleados debe ser uno de los siguientes rangos: 1-50, 51-100, 101-300, 301-500, 500+'),
];

exports.handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Mejora en la estructura de la respuesta para errores de validación
    // Proporciona un objeto más descriptivo para cada error
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

    return res.status(400).json({
      message: 'Error de validación en la entrada de datos.',
      errors: extractedErrors,
    });
  }
  next();
};
