// models/Usuario.js
const mongoose = require('mongoose');

const rolesOptions = [
  "C-Level", "Gestor de proyectos", "Equipo de operaciones", "Equipo de IT",
  "Equipo de RRHH", "Equipo de Finanzas", "Equipo de Marketing", "Equipo de Ventas",
  "Equipo de Soporte", "Equipo Legal", "Equipo de I+D+i"
];

const usuarioSchema = new mongoose.Schema({
  // Otros campos como nombre, email, etc.
  rol: { 
    type: String, 
    required: true, 
    enum: rolesOptions, // Utiliza rolesOptions como las únicas opciones válidas
  },
  // Agrega más campos según sea necesario
});

module.exports = mongoose.model('Rol', usuarioSchema);


