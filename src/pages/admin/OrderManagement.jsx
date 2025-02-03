import React, { useState, useEffect } from 'react';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/admin/orders', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        }
      });
      const data = await response.json();
      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, status, trackingNumber = '') => {
    try {
      const response = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        },
        body: JSON.stringify({ status, trackingNumber })
      });
      
      if (response.ok) {
        fetchOrders(); // Refresh orders list
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="order-management">
      <h1>Order Management</h1>
      <div className="orders-list">
        {orders.map(order => (
          <div key={order._id} className="order-item">
            <h3>Order #{order._id}</h3>
            <p>Customer: {order.user.name}</p>
            <p>Status: {order.status}</p>
            <select
              value={order.status}
              onChange={(e) => updateOrderStatus(order._id, e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            {/* Add tracking number input when status is shipped */}
            {order.status === 'shipped' && (
              <input
                type="text"
                placeholder="Tracking Number"
                value={order.trackingNumber || ''}
                onChange={(e) => updateOrderStatus(order._id, 'shipped', e.target.value)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderManagement; 