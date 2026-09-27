import React from 'react';
import { Link } from 'react-router-dom';
import './OrderCard.css';

const OrderCard = ({ order }) => {
  return (
    <div className="card order-card">
      <div className="order-header">
        <div>
          <p className="order-id">Order #{order._id.substring(0, 8)}</p>
          <p className="order-date">{new Date(order.createdAt).toLocaleDateString()}</p>
        </div>
        <span className={`badge badge-${order.status}`}>{order.status}</span>
      </div>
      
      <div className="order-body">
        <p className="order-total">Total: <strong>${order.totalPrice?.toFixed(2)}</strong></p>
        <p className="order-items-count">{order.items?.length} items</p>
      </div>
      
      <div className="order-footer">
        <Link to={`/orders/${order._id}`} className="btn btn-outline w-100">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default OrderCard;
