// Aseguramos que el nombre de la variable que importa coincide con lo que se espera utilizar.
const Rol = require('../models/Rol');

exports.actualizarRol = async (req, res) => {
  const { rolActual, nuevoRol } = req.body;

  // Mejoramos la validación inicial para hacerla más concisa y legible.
  if (!nuevoRol || !rolActual) {
    return res.status(400).send({
      mensaje: 'Los campos "rolActual" y "nuevoRol" son requeridos.',
    });
  }

  if (rolActual === nuevoRol) {
    return res.status(400).send({
      mensaje: 'El nuevo rol debe ser diferente al rol actual.',
    });
  }

  try {
    // Asegúrate de que la operación se refleja correctamente en la base de datos.
    // `updateMany` podría no tener `matchedCount` dependiendo de la versión de Mongoose, usar `nModified` para confirmar las modificaciones.
    const resultado = await Rol.updateMany({ rol: rolActual }, { $set: { rol: nuevoRol } });

    if (resultado.nModified === 0) {
      // Usamos nModified para verificar si se ha modificado algún documento.
      return res.status(404).send({
        mensaje: 'No se encontraron usuarios con el rol actual especificado para actualizar.',
      });
    }

    // Confirmación de éxito con la cantidad de documentos actualizados.
    res.status(200).send({
      mensaje: `Rol actualizado exitosamente de "${rolActual}" a "${nuevoRol}".`,
      detalles: resultado,
    });
  } catch (error) {
    console.error('Error al actualizar el rol:', error);
    res.status(500).send({
      mensaje: 'Error interno al intentar actualizar el rol.',
      error: error.message,
    });
  }
};
