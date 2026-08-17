import React, { useState, useEffect } from 'react';
import { fetchProductById } from '../services/api';

export default function ProductDetails({ productId, onBack }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [noticeMessage, setNoticeMessage] = useState('');

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchProductById(productId);
        setProduct(data);
      } catch (err) {
        console.error(`Failed to load product #${productId}:`, err);
        setError(err.message || 'Product details could not be retrieved.');
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      loadProduct();
    }
  }, [productId]);

  const handleCustomizeClick = () => {
    setNoticeMessage('Customization will be available in the next phase.');
  };

  const numericPrice = product ? parseFloat(product.base_price || 0) : 0;
  const formattedPrice = isNaN(numericPrice) ? '0.00' : numericPrice.toFixed(2);

  return (
    <div className="product-details-container">
      {/* Navigation / Back Button */}
      <button className="btn btn-secondary back-btn" onClick={onBack} id="back-to-products-btn">
        ← Back to Catalog
      </button>

      {/* Loading State */}
      {loading && (
        <div className="state-container loading-state">
          <div className="spinner"></div>
          <p>Loading product details...</p>
        </div>
      )}

      {/* Error / 404 Not Found State */}
      {!loading && error && (
        <div className="state-container error-state">
          <div className="state-icon">⚠️</div>
          <h3>Product Not Found</h3>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={onBack}>
            Return to Products Catalog
          </button>
        </div>
      )}

      {/* Product Detail Card */}
      {!loading && !error && product && (
        <div className="product-details-card">
          <div className="product-details-image-section">
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.name}
                className="product-details-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80';
                }}
              />
            ) : (
              <div className="product-details-placeholder-image">
                <span>🎨 {product.name}</span>
              </div>
            )}
          </div>

          <div className="product-details-info-section">
            <div className="details-header">
              <span className="category-pill lg">{product.category}</span>
              <span className="status-tag">In Stock</span>
            </div>

            <h1 className="product-details-title">{product.name}</h1>

            <div className="product-details-price">
              <span className="price-label">Base Price:</span>
              <span className="currency-symbol">₹</span>
              <span className="price-value">{formattedPrice}</span>
            </div>

            <div className="product-details-divider"></div>

            <div className="product-details-description-block">
              <h3>Product Description</h3>
              <p>{product.description}</p>
            </div>

            {/* Customization Notice Alert */}
            {noticeMessage && (
              <div className="notice-banner" id="phase-notice-banner">
                <span className="notice-icon">ℹ️</span>
                <span>{noticeMessage}</span>
                <button
                  className="close-notice-btn"
                  onClick={() => setNoticeMessage('')}
                >
                  ✕
                </button>
              </div>
            )}

            <div className="product-details-actions">
              <button
                className="btn btn-primary btn-lg customize-btn"
                onClick={handleCustomizeClick}
                id="customize-product-btn"
              >
                🎨 Customize Product
              </button>
            </div>

            <div className="product-meta-specs">
              <div className="meta-item">
                <span className="meta-key">Product ID:</span>
                <span className="meta-val">#{product.id}</span>
              </div>
              <div className="meta-item">
                <span className="meta-key">Category:</span>
                <span className="meta-val">{product.category}</span>
              </div>
              <div className="meta-item">
                <span className="meta-key">Status:</span>
                <span className="meta-val">
                  {product.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
