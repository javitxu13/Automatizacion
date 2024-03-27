const Colaborador = require('../models/Colaboradores');
const Departamento = require('../models/Departamento');

exports.createColaborador = async (req, res) => {
  try {
    const { nombre, departamentoId } = req.body;
    const nuevoColaborador = await Colaborador.create({ nombre, departamentoId });

    // Añade el colaborador al departamento correspondiente
    await Departamento.findByIdAndUpdate(departamentoId, {
      $push: { empleados: nuevoColaborador._id }
    });

    res.status(201).json(nuevoColaborador);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getColaboradores = async (req, res) => {
  try {
    const colaboradores = await Colaborador.find().populate('departamentoId', 'nombre');
    res.status(200).json(colaboradores);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
