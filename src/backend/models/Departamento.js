const mongoose = require('mongoose');

const departamentoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre del departamento es obligatorio'],
    unique: true,
    trim: true,
    minlength: [3, 'El nombre debe tener al menos 3 caracteres'],
    maxlength: [50, 'El nombre no puede exceder de 50 caracteres'],
  },
  empleados: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Colaborador',
  }],
});

module.exports = mongoose.model('Departamento', departamentoSchema);
