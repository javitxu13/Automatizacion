/* const mongoose = require('mongoose');
const { isEmail } = require('validator'); // Usar una librería de validación dedicada para mayor precisión

const emailVerificationSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: [true, 'El correo electrónico es obligatorio'],
    trim: true,
    lowercase: true,
    unique: true, // Asegura que cada correo electrónico sea único en la colección
    validate: [isEmail, 'Por favor, ingresa un correo electrónico válido'], // Utilizar la función isEmail de la librería validator para una validación más robusta
  },
  verificationToken: {
    type: String,
    required: true,
    unique: true, // Asegurar que el token de verificación sea único
  },
  expiresAt: {
    type: Date,
    required: true,
    index: { expires: '1d' }, // Este índice borrará automáticamente el documento después de 1 día
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true, // Hace este campo inmutable después de ser establecido por primera vez
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['pending', 'sent', 'verified', 'failed'],
    default: 'pending',
  },
});

// Middleware de Mongoose para actualizar automáticamente la fecha de última actualización antes de guardar
emailVerificationSchema.pre('save', function (next) {
  if (!this.isNew) { // Solo actualizar el campo updatedAt si el documento ya existía
    this.updatedAt = new Date();
  }
  next();
});

// Crear un índice compuesto para optimizar las consultas que utilizan estos campos frecuentemente
emailVerificationSchema.index({ userEmail: 1, status: 1 });

module.exports = mongoose.model('EmailVerification', emailVerificationSchema);
 */