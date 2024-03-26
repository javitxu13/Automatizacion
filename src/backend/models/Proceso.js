const mongoose = require('mongoose');

const procesoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  tipo: { type: String, required: true },
  departamento: { type: String, required: false },
  herramientas: { type: String, required: true },
  responsable: { type: String, required: false },
  colaboradores: String,
  objetivo: String,
});

module.exports = mongoose.model('Proceso', procesoSchema);
