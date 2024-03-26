/* require('dotenv').config();
const VerificationCode = require('../models/VerificationCode');
const twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

exports.sendVerificationCode = async (req, res) => {
  const { phone } = req.body;
  const code = Math.floor(100000 + Math.random() * 900000).toString(); // Genera un código de 6 dígitos

  try {
    await twilio.messages.create({
      body: `Your verification code is: ${code}`,
      to: phone,
      from: process.env.TWILIO_PHONE_NUMBER
    });

    const verificationCode = new VerificationCode({ phone, code });
    await verificationCode.save();

    res.send({ success: true, message: 'Code sent successfully.' });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Failed to send code.' });
  }
};
 */