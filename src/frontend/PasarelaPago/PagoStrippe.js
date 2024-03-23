import React, { useState, useCallback } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';

// Asumiendo que tu clave pública de Stripe está almacenada de forma segura
const stripePromise = loadStripe('pk_live_51OomgpERvbwsGCLQ1Bany7XY9UY0CnN5V0hR2z407xsfgC4rsvIZPFdnN86Ppaj2Iy3DILhMwsr6zw3xAQXN4q2Y00Ym5hTIYS');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false); // Estado para el éxito del pago

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!stripe || !elements) {
      // Manejo cuando Stripe.js aún no está cargado.
      console.error("Stripe.js hasn't loaded yet.");
      return;
    }
  
    setLoading(true);
    setError('');
    setPaymentSuccess(false); // Reiniciar el estado de éxito del pago en cada envío
  
    const cardElement = elements.getElement(CardElement);
  
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });
  
    if (error) {
      console.error('[error]', error);
      setError(error.message);
      setLoading(false);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      try {
        // Aquí es donde llamarías a tu backend pasando el paymentMethod.id para crear el PaymentIntent.
        const paymentIntentResponse = await createPaymentIntent({ paymentMethodId: paymentMethod.id });
  
        // Asume que createPaymentIntent es una función que haces en otro lugar para llamar a tu API.
        if (paymentIntentResponse.error) {
          setError(paymentIntentResponse.error);
        } else {
          setPaymentSuccess(true);
          setError(''); // Asegurarse de limpiar errores anteriores.
          // Aquí podrías redirigir al usuario o mostrar un mensaje de confirmación.
        }
      } catch (backendError) {
        setError(backendError.message || 'Error procesando el pago. Intente de nuevo.');
      } finally {
        setLoading(false);
      }
    }
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement />
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit" disabled={!stripe || loading}>
          {loading ? 'Procesando...' : 'Pagar'}
        </button>
      </form>
      {paymentSuccess && <div style={{ color: 'green' }}>Pago realizado con éxito.</div>}
    </div>
  );
};

// Componente envuelto para incluir Stripe <Elements>
const WrappedCheckoutForm = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default WrappedCheckoutForm;