const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Utiliza variables de entorno para la clave
const app = express();

app.use(express.json()); // Asegura que tu app pueda parsear JSON

const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

  app.post('/create-payment-intent', asyncHandler(async (req, res) => {
      const { amount } = req.body;

  // Validación básica para el monto
  if (!amount || isNaN(amount) || amount <= 0) {
    return res.status(400).send({ error: "Invalid amount provided." });
  }

  try {
    // Crear PaymentIntent con el monto y la moneda
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // Asegura que el monto es un número entero
      currency: 'eur', // Asegúrate de que la moneda es la que deseas usar
    });

    // Enviar el client_secret al cliente para procesar el pago
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    // Manejo de errores específicos de Stripe o errores inesperados
    if (error.type === 'StripeCardError') {
      // Error específico de la tarjeta; manejar adecuadamente
      res.status(400).send({ error: error.message });
    } else {
      // Otros tipos de errores (red, API de Stripe, etc.)
      next(error); // Pasa el error a Express para un manejo centralizado
    }
  }
}));

// Middleware de manejo de errores de Express para capturar cualquier error no manejado
app.use((err, req, res, next) => {
  res.status(500).send({ error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

