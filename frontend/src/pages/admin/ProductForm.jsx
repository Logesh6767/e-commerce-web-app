import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { toast } from 'react-toastify';
import './ProductForm.css';

const ProductForm = ({ product, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    stock: ''
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        category: product.category || '',
        image: product.image || '',
        stock: product.stock || ''
      });
    }
  }, [product]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (product) {
        await api.put(`/products/${product._id}`, formData);
        toast.success('Product updated successfully');
      } else {
        await api.post('/products', formData);
        toast.success('Product created successfully');
      }
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save product');
    }
  };

  return (
    <div className="product-form-overlay">
      <div className="product-form-modal card">
        <h3>{product ? 'Edit Product' : 'Add New Product'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" required value={formData.name} onChange={handleChange} />
          </div>
          
          <div className="form-group">
            <label>Description</label>
            <textarea name="description" required rows="3" value={formData.description} onChange={handleChange}></textarea>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Price</label>
              <input type="number" name="price" required min="0" step="0.01" value={formData.price} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Stock</label>
              <input type="number" name="stock" required min="0" value={formData.stock} onChange={handleChange} />
            </div>
          </div>
          
          <div className="form-group">
            <label>Category</label>
            <select name="category" required value={formData.category} onChange={handleChange}>
              <option value="">Select Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Books">Books</option>
              <option value="Home">Home</option>
              <option value="Toys">Toys</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Image URL</label>
            <input type="text" name="image" value={formData.image} onChange={handleChange} />
          </div>
          
          <div className="form-actions">
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save Product</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
