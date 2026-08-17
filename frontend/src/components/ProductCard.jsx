import React from 'react';

export default function ProductCard({ product, onViewDetails }) {
  const shortDescription =
    product.description.length > 90
      ? `${product.description.substring(0, 90)}...`
      : product.description;

  const numericPrice = parseFloat(product.base_price || 0);
  const formattedPrice = isNaN(numericPrice) ? '0.00' : numericPrice.toFixed(2);

  return (
    <div className="product-card">
      <div className="product-image-container">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="product-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80';
            }}
          />
        ) : (
          <div className="product-placeholder-image">
            <span>🎨</span>
          </div>
        )}
        <span className="category-pill">{product.category}</span>
      </div>

      <div className="product-card-body">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-description">{shortDescription}</p>

        <div className="product-card-footer">
          <div className="product-price">
            <span className="currency-symbol">₹</span>
            <span className="price-value">{formattedPrice}</span>
          </div>

          <button
            className="btn btn-primary btn-sm"
            onClick={() => onViewDetails(product.id)}
            id={`view-details-btn-${product.id}`}
          >
            View Details →
          </button>
        </div>
      </div>
    </div>
  );
}
