import React, { useState, useEffect } from 'react';
import { orderService } from '../../services/api';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await orderService.getAllOrders();
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await orderService.updateOrderStatus(orderId, newStatus);
      fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const filteredOrders = orders.filter(order => 
    statusFilter === 'all' || order.status === statusFilter
  );

  return (
    <div className="order-management">
      <h2>Order Management</h2>
      
      <div className="status-filter">
        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Orders</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="orders-list">
        {filteredOrders.map(order => (
          <div key={order._id} className="order-item">
            <div className="order-header">
              <h3>Order #{order._id}</h3>
              <span className={`status ${order.status}`}>
                {order.status}
              </span>
            </div>
            
            <div className="order-details">
              <p>Customer: {order.customerName}</p>
              <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p>Total: ${order.total}</p>
            </div>

            <div className="order-actions">
              <select 
                value={order.status}
                onChange={(e) => updateOrderStatus(order._id, e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <button onClick={() => setSelectedOrder(order)}>
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedOrder && (
        <div className="order-modal">
          {/* Order details modal content */}
        </div>
      )}
    </div>
  );
};

export default OrderManagement; 