import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import CartItem from '../components/CartItem';
import './Cart.css';

const Cart = () => {
  const { cart, cartTotal, loading } = useContext(CartContext);
  const navigate = useNavigate();

  if (loading) return null;

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="container cart-empty">
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added any products to your cart yet.</p>
        <Link to="/products" className="btn btn-primary mt-3">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="container cart-page">
      <h2>Shopping Cart</h2>
      
      <div className="cart-content">
        <div className="cart-items card">
          {cart.items.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}
        </div>
        
        <div className="cart-summary card">
          <h3>Order Summary</h3>
          
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          
          <div className="summary-total">
            <span>Total</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          
          <button 
            className="btn btn-primary w-100 mt-3"
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
