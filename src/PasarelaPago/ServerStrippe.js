const stripe = require('stripe')(functions.config().stripe.secret); // Usa variables de entorno para la clave
const functions = require('firebase-functions');
const cors = require('cors')({origin: true});

exports.createPaymentIntent = functions.https.onRequest((request, response) => {
    cors(request, response, async () => {
      // Asegúrate de manejar solo las solicitudes POST y preflight OPTIONS
      if (request.method === 'OPTIONS') {
        response.status(204).send('');
        return;
      }
      
      if (request.method !== 'POST') {
        response.status(405).send({error: "Method not allowed"});
        return;
      }
      
      try {
        // Valida la entrada para asegurarte de que el precio está presente y es un número positivo
        const { price } = request.body;
        if (!price || isNaN(price) || price <= 0) {
          response.status(400).send({error: "Invalid price provided"});
          return;
        }

        // Crea el PaymentIntent con la cantidad correcta y la moneda
        const paymentIntent = await stripe.paymentIntents.create({
          amount: Math.round(price * 100), // Convierte a centavos y redondea para evitar problemas de precisión
          currency: 'usd',
        });

        // Envía el client_secret al cliente para continuar con el proceso de pago
        response.json({ clientSecret: paymentIntent.client_secret });
      } catch (error) {
        console.error('Error creating payment intent:', error);
        response.status(500).send({error: error.message});
      }
    });
});

