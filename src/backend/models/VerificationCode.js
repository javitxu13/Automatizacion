/* const mongoose = require('mongoose');

const verificationCodeSchema = new mongoose.Schema({
  phone: { type: String, required: true },
  code: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, index: { expires: '10m' } } // El código expira después de 10 minutos
});

module.exports = mongoose.model('VerificationCode', verificationCodeSchema);
 */