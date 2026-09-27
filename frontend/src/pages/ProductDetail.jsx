import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaMinus, FaPlus } from 'react-icons/fa';
import api from '../api/axios';
import { CartContext } from '../context/CartContext';
import Loading from '../components/Loading';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <Loading />;
  if (!product) return <div className="container text-center mt-5">Product not found</div>;

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    if (quantity < product.stock) setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    addToCart(product._id, quantity);
  };

  return (
    <div className="container product-detail-page">
      <Link to="/products" className="back-link">
        <FaArrowLeft /> Back to Products
      </Link>
      
      <div className="product-detail-container card">
        <div className="product-image-section">
          <img src={product.image || 'https://via.placeholder.com/600'} alt={product.name} />
        </div>
        
        <div className="product-info-section">
          <span className="badge badge-Processing mb-2 inline-block">{product.category}</span>
          <h1>{product.name}</h1>
          <p className="price">${product.price.toFixed(2)}</p>
          
          <div className="description">
            <p>{product.description}</p>
          </div>
          
          <div className="stock-status">
            Status: <span className={product.stock > 0 ? 'text-success' : 'text-danger'}>
              {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
            </span>
          </div>
          
          {product.stock > 0 && (
            <div className="purchase-actions">
              <div className="quantity-selector">
                <button onClick={handleDecrease} disabled={quantity <= 1}><FaMinus /></button>
                <span>{quantity}</span>
                <button onClick={handleIncrease} disabled={quantity >= product.stock}><FaPlus /></button>
              </div>
              
              <button className="btn btn-primary btn-lg" onClick={handleAddToCart}>
                Add to Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
