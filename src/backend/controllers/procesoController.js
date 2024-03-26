// controllers/procesoController.js
const Proceso = require('../models/Proceso');

exports.createProceso = async (req, res) => {
  try {
    const nuevoProceso = new Proceso(req.body);
    const savedProceso = await nuevoProceso.save();
    res.status(201).json(savedProceso);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getProcesos = async (req, res) => {
  try {
    const procesos = await Proceso.find();
    res.status(200).json(procesos);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
