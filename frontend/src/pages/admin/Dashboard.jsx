import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import Loading from '../../components/Loading';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/admin/stats');
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch admin stats", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="admin-container container">
      <aside className="admin-sidebar card">
        <h3>Admin Menu</h3>
        <nav>
          <ul>
            <li><Link to="/admin/dashboard" className="active">Dashboard</Link></li>
            <li><Link to="/admin/products">Manage Products</Link></li>
            <li><Link to="/admin/orders">Manage Orders</Link></li>
          </ul>
        </nav>
      </aside>

      <div className="admin-content">
        <h2>Dashboard Overview</h2>
        
        <div className="stats-grid">
          <div className="stat-card card">
            <h4>Total Users</h4>
            <p className="stat-value">{stats?.totalUsers || 0}</p>
          </div>
          <div className="stat-card card">
            <h4>Total Orders</h4>
            <p className="stat-value">{stats?.totalOrders || 0}</p>
          </div>
          <div className="stat-card card">
            <h4>Total Revenue</h4>
            <p className="stat-value">${stats?.totalRevenue?.toFixed(2) || '0.00'}</p>
          </div>
        </div>

        <div className="recent-orders card mt-4">
          <h3>Recent Orders</h3>
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {stats?.recentOrders?.map(order => (
                  <tr key={order._id}>
                    <td><Link to={`/orders/${order._id}`}>{order._id.substring(0, 8)}...</Link></td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>${order.totalPrice.toFixed(2)}</td>
                    <td><span className={`badge badge-${order.status}`}>{order.status}</span></td>
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

export default Dashboard;
