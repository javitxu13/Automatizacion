const Colaborador = require('../models/Colaboradores');

exports.agregarColaborador = async (req, res) => {
  const { nombre, departamentoId } = req.body;
  try {
    const nuevoColaborador = new Colaborador({ nombre, departamentoId });
    await nuevoColaborador.save();
    res.status(201).send({ mensaje: 'Colaborador añadido con éxito', colaborador: nuevoColaborador });
  } catch (error) {
    res.status(400).send({ mensaje: 'Error al añadir colaborador', error });
  }
};
