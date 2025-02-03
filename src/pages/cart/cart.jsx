import React, { useState } from 'react'
import './cart.css'
import { Link } from 'react-router-dom'
import { FaTrash } from 'react-icons/fa'
import { useCart } from '../../context/CartContext'

const Cart = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart,
    getCartTotal 
  } = useCart();
  
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    phone: ''
  });

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const handlePlaceOrder = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const orderData = {
        products: cartItems.map(item => ({
          product: item.id,
          quantity: item.quantity,
          price: item.price
        })),
        shippingAddress
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add your authentication token here
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        throw new Error('Failed to place order');
      }

      setOrderPlaced(true);
      clearCart(); // Clear the cart after successful order
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleIncreaseQuantity = (itemId) => {
    const item = cartItems.find(item => item.id === itemId);
    if (item) {
      updateQuantity(itemId, item.quantity + 1);
    }
  };

  const handleDecreaseQuantity = (itemId) => {
    const item = cartItems.find(item => item.id === itemId);
    if (item && item.quantity > 1) {
      updateQuantity(itemId, item.quantity - 1);
    }
  };

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };

  // Add shipping form JSX before the order summary
  const renderShippingForm = () => (
    <div className="shipping-form">
      <h2>Shipping Information</h2>
      <input
        type="text"
        placeholder="Street"
        value={shippingAddress.street}
        onChange={(e) => setShippingAddress({...shippingAddress, street: e.target.value})}
      />
      {/* Add similar inputs for city, state, postalCode, country, and phone */}
    </div>
  );

  if (orderPlaced) {
    return (
      <div className='cart-page'>
        <div className='order-success'>
          <h2>Order Placed Successfully!</h2>
          <p>Thank you for shopping with us.</p>
          <Link to="/shop" className='continue-shopping'>Continue Shopping</Link>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='cart-page'>
        <div className='error-message'>
          <p>{error}</p>
          <button onClick={() => setError(null)}>Try Again</button>
        </div>
      </div>
    )
  }

  return (
    <div className='cart-page'>
      <h1>Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className='empty-cart'>
          <h2>Your cart is empty</h2>
          <Link to="/shop" className='continue-shopping'>Continue Shopping</Link>
        </div>
      ) : (
        <div className='cart-content'>
          <div className='cart-items'>
            {cartItems.map(item => (
              <div className='cart-item' key={item.id}>
                <img src={item.image} alt={item.name} />
                <div className='item-details'>
                  <h3>{item.name}</h3>
                  <p className='price'>${item.price.toFixed(2)}</p>
                  <div className='quantity-controls'>
                    <button onClick={() => handleDecreaseQuantity(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
                  </div>
                </div>
                <button 
                  className='remove-item'
                  onClick={() => handleRemoveItem(item.id)}
                  aria-label="Remove item"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
          
          {renderShippingForm()}
          
          <div className='cart-summary'>
            <h2>Order Summary</h2>
            <div className='summary-details'>
              <div className='summary-item'>
                <span>Total Items</span>
                <span>{cartItems.length}</span>
              </div>
              <div className='summary-total'>
                <span>Total Amount</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
            </div>
            <button 
              className='place-order-button' 
              onClick={handlePlaceOrder}
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Place Order'}
            </button>
            <Link to="/shop" className='continue-shopping'>Continue Shopping</Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
