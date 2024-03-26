// models/Usuario.js
const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellidos: { type: String, required: true },
  rol: { type: String, required: true },
  // Puedes añadir más campos según necesites
});

module.exports = mongoose.model('Nombre', usuarioSchema);
