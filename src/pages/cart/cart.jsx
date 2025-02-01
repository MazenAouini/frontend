import React, { useState } from 'react'
import './cart.css'
import { Link } from 'react-router-dom'
import { FaTrash } from 'react-icons/fa'

const Cart = () => {
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  // Example cart items - in a real app, this would come from state management
  const cartItems = [
    {
      id: 1,
      name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
      price: 50.0,
      quantity: 1,
      image: "path_to_image"
    }
  ]

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const handlePlaceOrder = async () => {
    try {
      setIsLoading(true)
      // Order logic
      setOrderPlaced(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  // Add quantity handlers
  const handleIncreaseQuantity = (itemId) => {
    // Update quantity logic
  }

  const handleDecreaseQuantity = (itemId) => {
    // Update quantity logic
  }

  const handleRemoveItem = (itemId) => {
    // Add remove item logic
  }

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
