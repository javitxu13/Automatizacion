import React, { useState } from 'react';
import WrappedCheckoutForm from '../PasarelaPago/CheckoutForm'; // Verifica que el path sea correcto
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_live_51OomgpERvbwsGCLQ1Bany7XY9UY0CnN5V0hR2z407xsfgC4rsvIZPFdnN86Ppaj2Iy3DILhMwsr6zw3xAQXN4q2Y00Ym5hTIYS');

const products = [
  { id: 1, name: 'Producto A', price: 10 },
  { id: 2, name: 'Producto B', price: 20 },
  { id: 3, name: 'Producto C', price: 30 },
];

const Pricing = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div>
      <h2>Productos</h2>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        {products.map((product) => (
          <div key={product.id} style={{ margin: '10px', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button onClick={() => handleSelectProduct(product)}>Comprar</button>
          </div>
        ))}
      </div>
      {selectedProduct && (
        <div style={{ marginTop: '20px' }}>
          <h3>Detalles de Pago</h3>
          <p>Producto seleccionado: <strong>{selectedProduct.name}</strong></p>
          <p>Precio: <strong>${selectedProduct.price}</strong></p>
          <Elements stripe={stripePromise}>
            <WrappedCheckoutForm product={selectedProduct} />
          </Elements>
        </div>
      )}
    </div>
  );
};

export default Pricing;
