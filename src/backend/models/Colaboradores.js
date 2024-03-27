const mongoose = require('mongoose');

const colaboradorSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  departamentoId: { type: String, required: true },
});

module.exports = mongoose.model('Colaborador', colaboradorSchema);
