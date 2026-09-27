import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import Loading from '../../components/Loading';
import { toast } from 'react-toastify';
import './ManageOrders.css';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const { data } = await api.get('/admin/orders');
      setOrders(data.orders || []);
    } catch (error) {
      console.error("Failed to fetch orders", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await api.put(`/admin/orders/${id}`, { status });
      toast.success('Order status updated');
      fetchOrders();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="admin-container container">
      <aside className="admin-sidebar card">
        <h3>Admin Menu</h3>
        <nav>
          <ul>
            <li><Link to="/admin/dashboard">Dashboard</Link></li>
            <li><Link to="/admin/products">Manage Products</Link></li>
            <li><Link to="/admin/orders" className="active">Manage Orders</Link></li>
          </ul>
        </nav>
      </aside>

      <div className="admin-content">
        <h2>Manage Orders</h2>

        <div className="card mt-4 p-3">
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id}>
                    <td><Link to={`/orders/${order._id}`}>{order._id.substring(0, 8)}...</Link></td>
                    <td>{order.user?.name || 'Unknown'}</td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>${order.totalPrice?.toFixed(2)}</td>
                    <td><span className={`badge badge-${order.status}`}>{order.status}</span></td>
                    <td>
                      <select 
                        value={order.status} 
                        onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                        className="status-select"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
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

export default ManageOrders;
