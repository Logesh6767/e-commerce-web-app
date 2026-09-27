import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import api from '../api/axios';
import Loading from '../components/Loading';
import './OrderDetail.css';

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await api.get(`/orders/${id}`);
        setOrder(data);
      } catch (error) {
        console.error("Failed to fetch order", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) return <Loading />;
  if (!order) return <div className="container text-center mt-5">Order not found</div>;

  return (
    <div className="container order-detail-page">
      <Link to="/orders" className="back-link">
        <FaArrowLeft /> Back to Orders
      </Link>

      <div className="order-detail-header card">
        <div className="header-info">
          <h2>Order #{order._id}</h2>
          <p className="date">Placed on {new Date(order.createdAt).toLocaleString()}</p>
        </div>
        <div className="header-status">
          <span className={`badge badge-${order.status} badge-lg`}>{order.status}</span>
        </div>
      </div>

      <div className="order-detail-content">
        <div className="order-items card">
          <h3>Order Items</h3>
          <div className="items-list">
            {order.items.map((item, index) => (
              <div key={index} className="order-item-row">
                <img src={item.image || 'https://via.placeholder.com/50'} alt={item.name} />
                <div className="item-info">
                  <Link to={`/products/${item.product}`} className="item-name">{item.name}</Link>
                  <p className="item-qty">Qty: {item.quantity}</p>
                </div>
                <div className="item-price">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="order-summary-sidebar">
          <div className="card mb-3">
            <h3>Shipping Address</h3>
            <p>{order.shippingAddress.address}</p>
            <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
            <p>{order.shippingAddress.country}</p>
          </div>

          <div className="card">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Items Total</span>
              <span>${order.totalPrice?.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>$0.00</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span>${order.totalPrice?.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
