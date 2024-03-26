/* require('dotenv').config();
const nodemailer = require('nodemailer');
const crypto = require('crypto'); // Para generar el token de verificación
const EmailVerification = require('../models/EmailVerification');

const sendVerificationEmail = async (req, res) => {
  const { userEmail } = req.body;

  // Genera un token de verificación único
  const verificationToken = crypto.randomBytes(32).toString('hex');
  const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;

  // Establece la fecha de expiración del token (p. ej., 24 horas desde ahora)
  const expiresAt = new Date(new Date().getTime() + 24*60*60*1000);

  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587, // Usa 465 para SSL
    secure: false, // true para 465, false para otros puertos
    auth: {
        user: 'javiergonzalez13a@gmail.com',
        pass: 'Paquete13' // Usa tu contraseña de aplicación aquí si es aplicable
    }
});

let mailOptions = {
  from: '"Javier Gonzalez" <javiergonzalez13a@gmail.com>',
  to: 'javiergonzalez13a@gmail.com',
  subject: 'Prueba',
  text: 'Cuerpo del correo en texto plano',
  html: '<b>Cuerpo del correo en HTML</b>' // Puede ser HTML
};

  try {
    // Almacena el token de verificación y la información relacionada en la base de datos
    await EmailVerification.create({
      userEmail,
      verificationToken,
      expiresAt,
      status: 'pending', // Estado inicial
    });

    // Envía el correo electrónico de verificación
    await transporter.sendMail(mailOptions);
    res.json({ message: 'Verification email sent successfully. Please check your inbox.' });
  } catch (error) {
    console.error('sendVerificationEmail error:', error);
    res.status(500).json({ error: 'Error sending verification email. Please try again later.' });
  }
};

module.exports = { sendVerificationEmail };
 */