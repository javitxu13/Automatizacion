/* // models/Payment.js
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  id: { type: String, required: true },
  amount: { type: Number, required: true },
  created: { type: Number, required: true },
  currency: { type: String, required: true },
  status: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
 */