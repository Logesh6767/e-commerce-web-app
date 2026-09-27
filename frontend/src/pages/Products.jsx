import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const categoryParam = searchParams.get('category') || '';
  const searchParam = searchParams.get('search') || '';
  const sortParam = searchParams.get('sort') || '';

  const [category, setCategory] = useState(categoryParam);
  const [search, setSearch] = useState(searchParam);
  const [sort, setSort] = useState(sortParam);

  const categories = ['Electronics', 'Clothing', 'Books', 'Home & Kitchen', 'Sports'];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let url = '/products?';
        if (category) url += `category=${category}&`;
        if (search) url += `search=${search}&`;
        if (sort) url += `sort=${sort}`;
        
        const { data } = await api.get(url);
        setProducts(data || []);
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, search, sort]);

  const handleFilter = (e) => {
    e.preventDefault();
    setSearchParams({ category, search, sort });
  };

  const handleClear = () => {
    setCategory('');
    setSearch('');
    setSort('');
    setSearchParams({});
  };

  return (
    <div className="container products-page">
      <div className="sidebar">
        <h3>Filters</h3>
        <form onSubmit={handleFilter} className="filter-form">
          <div className="form-group">
            <label>Search</label>
            <input 
              type="text" 
              placeholder="Search products..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">All Categories</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Sort By</label>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="">Relevance</option>
              <option value="price">Price: Low to High</option>
              <option value="-price">Price: High to Low</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-100">Apply Filters</button>
          <button type="button" onClick={handleClear} className="btn btn-outline w-100 mt-2">Clear</button>
        </form>
      </div>

      <div className="products-content">
        <h2>Products</h2>
        {loading ? (
          <Loading />
        ) : products.length === 0 ? (
          <div className="no-products">
            <p>No products found matching your criteria.</p>
          </div>
        ) : (
          <div className="products-grid">
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
