import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import HeroBanner from '../components/HeroBanner';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/products');
        setProducts(data.slice(0, 8));
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="container">
      <HeroBanner />
      
      <section className="featured-section">
        <div className="section-header">
          <h2>Featured Products</h2>
          <Link to="/products" className="view-all">View All</Link>
        </div>
        
        {loading ? (
          <Loading />
        ) : (
          <div className="products-grid">
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      <section className="categories-section">
        <h2>Shop by Category</h2>
        <div className="category-cards">
          {['Electronics', 'Clothing', 'Books', 'Home & Kitchen', 'Sports'].map(category => (
            <Link to={`/products?category=${category}`} key={category} className="category-card">
              <h3>{category}</h3>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
