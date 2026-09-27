import React, { useContext } from 'react';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import { CartContext } from '../context/CartContext';
import './CartItem.css';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useContext(CartContext);
  const { product, quantity, _id } = item;

  const handleDecrease = () => {
    if (quantity > 1) {
      updateQuantity(_id, quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < product.stock) {
      updateQuantity(_id, quantity + 1);
    }
  };

  return (
    <div className="cart-item">
      <img src={product.image || 'https://via.placeholder.com/100'} alt={product.name} className="cart-item-img" />
      
      <div className="cart-item-details">
        <h4 className="cart-item-name">{product.name}</h4>
        <p className="cart-item-price">${product.price.toFixed(2)}</p>
      </div>
      
      <div className="cart-item-controls">
        <div className="quantity-controls">
          <button onClick={handleDecrease} disabled={quantity <= 1}><FaMinus /></button>
          <span>{quantity}</span>
          <button onClick={handleIncrease} disabled={quantity >= product.stock}><FaPlus /></button>
        </div>
        <div className="cart-item-subtotal">
          ${(product.price * quantity).toFixed(2)}
        </div>
        <button className="btn-remove" onClick={() => removeFromCart(_id)}>
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
