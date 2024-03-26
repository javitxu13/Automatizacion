const User = require('../models/User');

exports.register = async (req, res) => {
  const { email, numEmpleados } = req.body;

  try {
    // Verificar si el usuario ya existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Crear nuevo usuario sin contraseña
    const user = new User({
      email,
      numEmpleados
    });

    // Guardar usuario
    await user.save();

    // Omitir enviar el objeto de usuario completo como respuesta para evitar exponer datos sensibles
    // Considerar la creación de un token (JWT) o manejar la sesión del usuario aquí si fuera necesario
    res.status(201).json({ message: 'Usuario registrado con éxito', userId: user.id, email: user.email });
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    res.status(500).json({ message: 'Error al registrar el usuario', error: error.message });
  }
};
