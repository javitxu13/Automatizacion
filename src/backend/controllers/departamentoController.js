// controllers/departamentoController.js
const Departamento = require('../models/Departamento');

exports.getDepartamentos = async (req, res) => {
  try {
    const departamentos = await Departamento.find();
    res.json(departamentos);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.createDepartamento = async (req, res) => {
  try {
    const nuevoDepartamento = new Departamento(req.body);
    const departamentoGuardado = await nuevoDepartamento.save();
    res.status(201).json(departamentoGuardado);
  } catch (error) {
    res.status(500).send(error);
  }
};
