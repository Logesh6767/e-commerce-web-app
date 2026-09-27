import React from 'react';
import { Link } from 'react-router-dom';
import './HeroBanner.css';

const HeroBanner = () => {
  return (
    <div className="hero-banner">
      <div className="hero-content">
        <h1>Welcome to ShopEase</h1>
        <p>Discover the best products at unbeatable prices.</p>
        <Link to="/products" className="btn btn-primary hero-btn">
          Shop Now
        </Link>
      </div>
    </div>
  );
};

export default HeroBanner;
