import React, { useState, useEffect } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { db } from '../page/Firebase';

const CheckoutForm = ({ product }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [error, setError] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false); 
  
  useEffect(() => {
    if (!product) return; // Asegurarse de que hay un producto antes de hacer la solicitud

    const fetchClientSecret = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await fetch('https://us-central1-tu_proyecto_cloudfunctions.cloudfunctions.net/createPaymentIntent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId: product.id, price: product.price })
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error('Error fetching client secret:', error);
        setError('Failed to initialize payment. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchClientSecret();
  }, [product]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      setError('The payment service is not available right now. Please try again later.');
      return;
    }

    setLoading(true);
    setError('');

    const cardElement = elements.getElement(CardElement);

    try {
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement, billing_details: {} },
      });

      if (result.error) throw result.error;

      if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
        console.log('[PaymentIntent]', result.paymentIntent);
        await savePaymentDetailsToFirestore(result.paymentIntent);
        setPaymentSuccess(true); // Indicar que el pago fue exitoso
        // Opcional: Redireccionar al usuario o mostrar un mensaje de éxito aquí
      }
    } catch (error) {
      console.error('[error]', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const savePaymentDetailsToFirestore = async (paymentIntent) => {
    try {
      const paymentDoc = {
        id: paymentIntent.id,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
        currency: paymentIntent.currency,
        status: paymentIntent.status,
      };
      await db.collection('payments').doc(paymentIntent.id).set(paymentDoc);
    } catch (error) {
      console.error('Error saving payment details to Firestore:', error);
      setError('Error saving payment details. Please contact support.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement />
        {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
        {paymentSuccess && <div style={{ color: 'green', marginTop: '10px' }}>Payment was successful!</div>}
        <button type="submit" disabled={!stripe || loading || !clientSecret} style={{ marginTop: '20px' }}>
          {loading ? 'Processing...' : 'Pay'}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
