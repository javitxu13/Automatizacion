// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'El correo electrónico es obligatorio'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Por favor, ingresa un correo electrónico válido'],
  },
  numEmpleados: {
    type: String,
    required: false, // O true, dependiendo de si es obligatorio o no
    enum: ['1-50', '51-100', '101-300', '301-500', '500+'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Método para encriptar la contraseña antes de guardar el usuario
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('User', userSchema);
