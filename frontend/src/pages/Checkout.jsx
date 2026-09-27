import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { CartContext } from '../context/CartContext';
import { toast } from 'react-toastify';
import './Checkout.css';

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });

  const handleChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/orders', { shippingAddress });
      toast.success('Order placed successfully!');
      clearCart();
      navigate(`/orders/${data._id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to place order');
    }
  };

  if (!cart || !cart.items || cart.items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="container checkout-page">
      <div className="checkout-content">
        <div className="checkout-form card">
          <h2>Shipping Address</h2>
          <form onSubmit={handlePlaceOrder}>
            <div className="form-group">
              <label>Address</label>
              <input type="text" name="address" required value={shippingAddress.address} onChange={handleChange} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input type="text" name="city" required value={shippingAddress.city} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>State</label>
                <input type="text" name="state" required value={shippingAddress.state} onChange={handleChange} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Zip Code</label>
                <input type="text" name="zipCode" required value={shippingAddress.zipCode} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Country</label>
                <input type="text" name="country" required value={shippingAddress.country} onChange={handleChange} />
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-lg w-100 mt-3">Place Order</button>
          </form>
        </div>

        <div className="checkout-summary card">
          <h2>Order Summary</h2>
          <div className="summary-items">
            {cart.items.map(item => (
              <div key={item._id} className="summary-item">
                <img src={item.product.image || 'https://via.placeholder.com/50'} alt={item.product.name} />
                <div className="summary-item-info">
                  <p className="name">{item.product.name}</p>
                  <p className="qty">Qty: {item.quantity}</p>
                </div>
                <div className="summary-item-price">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          <div className="summary-total checkout-total">
            <span>Total</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
