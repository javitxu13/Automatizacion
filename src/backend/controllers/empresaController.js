// controllers/empresaController.js
const Empresa = require('../models/Empresa');

exports.crearEmpresa = async (req, res) => {
  try {
    let empresa = new Empresa(req.body);
    await empresa.save();
    res.send(empresa);
  } catch (error) {
    console.error(error);
    res.status(500).send('Hubo un error');
  }
};
