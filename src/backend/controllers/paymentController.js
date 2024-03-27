/* // controllers/paymentController.js
const Payment = require('../models/Payment');

exports.savePaymentDetails = async (req, res) => {
  try {
    const payment = new Payment(req.body);
    await payment.save();
    res.status(201).send({ message: 'Payment details saved successfully', payment });
  } catch (error) {
    console.error('Error saving payment details:', error);
    res.status(500).send({ message: 'Failed to save payment details', error: error.message });
  }
};
 */