// models/Empresa.js
const mongoose = require('mongoose');

const empresaSchema = new mongoose.Schema({
  nombreEmpresa: { type: String, required: true },
  pais: { type: String, required: true },
  telefono: { type: String, required: true },
  industria: { type: String, required: true },
  codigoPais: { type: String, required: true },
});

module.exports = mongoose.model('Empresa', empresaSchema);
