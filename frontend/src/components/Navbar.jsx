import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaBars, FaUser } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">ShopEase</Link>
        
        <div className="mobile-menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          <FaBars />
        </div>

        <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/products" onClick={() => setMenuOpen(false)}>Products</Link></li>
          
          <li className="cart-icon-container">
            <Link to="/cart" onClick={() => setMenuOpen(false)}>
              <FaShoppingCart className="icon" />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
          </li>

          {user ? (
            <li className="user-dropdown">
              <span className="user-name">
                <FaUser className="icon-sm" /> {user.name}
              </span>
              <ul className="dropdown-menu">
                <li><Link to="/orders" onClick={() => setMenuOpen(false)}>My Orders</Link></li>
                {user.role === 'admin' && (
                  <li><Link to="/admin/dashboard" onClick={() => setMenuOpen(false)}>Admin Dashboard</Link></li>
                )}
                <li><button onClick={handleLogout} className="btn-logout">Logout</button></li>
              </ul>
            </li>
          ) : (
            <>
              <li><Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link></li>
              <li><Link to="/register" className="btn btn-primary" onClick={() => setMenuOpen(false)}>Register</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
