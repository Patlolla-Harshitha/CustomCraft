import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../services/api';

export default function Products({ onViewDetails }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      console.error('Failed to load products:', err);
      setError(err.message || 'Unable to connect to the product catalog service.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Extract unique categories
  const categories = ['All', ...new Set(products.map((p) => p.category))];

  // Filter products by category and search query
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="products-container">
      {/* Catalog Header */}
      <section className="catalog-header">
        <div className="hero-pill">✨ Phase 2: Product Catalog & Database</div>
        <h1 className="catalog-title">
          Explore Our <span className="gradient-text">Customizable</span> Collection
        </h1>
        <p className="catalog-subtitle">
          Choose from top-quality raw products ready for your personalized prints, logos, and custom graphics.
        </p>

        {/* Filter Controls */}
        <div className="filter-bar">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
              id="product-search-input"
            />
          </div>

          <div className="category-tabs">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Loading State */}
      {loading && (
        <div className="state-container loading-state">
          <div className="spinner"></div>
          <p>Loading catalog products from database...</p>
        </div>
      )}

      {/* API Failure State */}
      {!loading && error && (
        <div className="state-container error-state">
          <div className="state-icon">⚠️</div>
          <h3>Failed to Load Products</h3>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={loadProducts} id="retry-fetch-btn">
            🔄 Retry Loading
          </button>
        </div>
      )}

      {/* Empty Product List State */}
      {!loading && !error && filteredProducts.length === 0 && (
        <div className="state-container empty-state">
          <div className="state-icon">📦</div>
          <h3>No Products Found</h3>
          <p>
            {products.length === 0
              ? 'There are currently no active products in the database.'
              : 'No products match your selected filters.'}
          </p>
          {(selectedCategory !== 'All' || searchQuery !== '') && (
            <button
              className="btn btn-secondary"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
            >
              Reset Filters
            </button>
          )}
        </div>
      )}

      {/* Product Grid */}
      {!loading && !error && filteredProducts.length > 0 && (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      )}
    </div>
  );
}
