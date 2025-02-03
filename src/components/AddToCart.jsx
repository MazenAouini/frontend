import React from 'react';
import { useCart } from '../context/CartContext';

const AddToCart = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <button 
      className="add-to-cart-button"
      onClick={handleAddToCart}
    >
      Add to Cart
    </button>
  );
};

export default AddToCart; 