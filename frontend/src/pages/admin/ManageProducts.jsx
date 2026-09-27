import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import Loading from '../../components/Loading';
import ProductForm from './ProductForm';
import { toast } from 'react-toastify';
import './ManageProducts.css';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const { data } = await api.get('/products');
      setProducts(data.products || []);
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/products/${id}`);
        toast.success('Product deleted successfully');
        fetchProducts();
      } catch (error) {
        toast.error('Failed to delete product');
      }
    }
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditProduct(null);
    fetchProducts();
  };

  if (loading) return <Loading />;

  return (
    <div className="admin-container container">
      <aside className="admin-sidebar card">
        <h3>Admin Menu</h3>
        <nav>
          <ul>
            <li><Link to="/admin/dashboard">Dashboard</Link></li>
            <li><Link to="/admin/products" className="active">Manage Products</Link></li>
            <li><Link to="/admin/orders">Manage Orders</Link></li>
          </ul>
        </nav>
      </aside>

      <div className="admin-content">
        <div className="page-header">
          <h2>Manage Products</h2>
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>Add New Product</button>
        </div>

        {showForm && (
          <ProductForm product={editProduct} onClose={closeForm} />
        )}

        <div className="card mt-4 p-3">
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product._id}>
                    <td>
                      <img src={product.image || 'https://via.placeholder.com/40'} alt={product.name} width="40" height="40" style={{objectFit: 'cover', borderRadius: '4px'}} />
                    </td>
                    <td>{product.name}</td>
                    <td>${product.price.toFixed(2)}</td>
                    <td><span className="badge badge-Pending">{product.category}</span></td>
                    <td>{product.stock}</td>
                    <td>
                      <button className="btn btn-sm btn-outline me-2" onClick={() => handleEdit(product)}>Edit</button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(product._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageProducts;
