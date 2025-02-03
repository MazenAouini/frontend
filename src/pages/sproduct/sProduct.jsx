import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import new_collections from '../../components/assets/products/data';
import './sProduct.css';

const SingleProduct = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const foundProduct = new_collections.find(p => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError('Please select a size');
      return;
    }
    
    const productWithSize = {
      ...product,
      selectedSize: selectedSize
    };
    
    addToCart(productWithSize);
    setError('');
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="sproduct-container">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      
      <div className="product-details">
        <h1>{product.name}</h1>
        <p className="brand">Brand: {product.brand}</p>
        <p className="price">${product.price.toFixed(2)}</p>
        <p className="description">{product.description}</p>
        
        <div className="size-selection">
          <h3>Select Size</h3>
          {error && <p className="error-message">{error}</p>}
          <div className="size-options">
            {product.sizes.map(size => (
              <button
                key={size}
                className={`size-button ${selectedSize === size ? 'selected' : ''}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
        
        <button 
          className="add-to-cart-button"
          onClick={handleAddToCart}
          disabled={!selectedSize}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default SingleProduct;
