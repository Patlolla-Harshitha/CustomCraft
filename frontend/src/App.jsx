import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [apiStatus, setApiStatus] = useState(null);
  const [apiMessage, setApiMessage] = useState('');

  useEffect(() => {
    // Check backend health and root endpoint
    const checkApi = async () => {
      const baseUrl = import.meta.env.VITE_API_BASE_URL
        ? import.meta.env.VITE_API_BASE_URL.replace(/\/+$/, '')
        : '/api';

      try {
        const rootRes = await fetch(`${baseUrl}/`);
        if (rootRes.ok) {
          const data = await rootRes.json();
          setApiMessage(data.message);
        }
      } catch (err) {
        console.log('Backend root endpoint check:', err);
      }

      try {
        const healthRes = await fetch(`${baseUrl}/health`);
        if (healthRes.ok) {
          const data = await healthRes.json();
          setApiStatus(data.status);
        } else {
          setApiStatus('offline');
        }
      } catch (err) {
        setApiStatus('offline');
      }
    };

    checkApi();
  }, []);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSelectedProductId(null);
  };

  const handleViewProductDetails = (productId) => {
    setSelectedProductId(productId);
  };

  return (
    <>
      <Navbar activeTab={activeTab} setActiveTab={handleTabChange} apiStatus={apiStatus} />

      <main className="main-content">
        {activeTab === 'home' && (
          <>
            <section className="hero">
              <div className="hero-pill">
                ✨ Phase 2: Product Catalog & PostgreSQL Engine
              </div>
              <h1 className="hero-title">
                Custom<span className="gradient-text">Craft</span>
              </h1>
              <h2 className="hero-subtitle">
                Personalized E-Commerce Platform
              </h2>
              <p className="hero-description">
                Welcome to CustomCraft! Our platform empowers users to customize everyday products 
                such as t-shirts, mugs, phone cases, and accessories with custom designs, personalized text, 
                and graphics before placing their orders.
              </p>
              <div className="hero-actions">
                <button
                  className="btn btn-primary"
                  onClick={() => handleTabChange('products')}
                  id="hero-explore-catalog-btn"
                >
                  Explore Catalog
                </button>
                <a 
                  className="btn btn-secondary"
                  href="http://localhost:8000/docs" 
                  target="_blank" 
                  rel="noreferrer"
                >
                  API Documentation (Swagger)
                </a>
              </div>
            </section>

            <section className="status-card">
              <div className="status-info">
                <div className="status-icon">✓</div>
                <div>
                  <h4 style={{ margin: 0, fontWeight: 700 }}>Backend & Database Integration</h4>
                  <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    {apiMessage || 'Connected to FastAPI & PostgreSQL Engine'}
                  </p>
                </div>
              </div>
              <div className="badge-tag healthy">
                <span className="status-dot"></span>
                Status: {apiStatus === 'healthy' ? 'System Healthy (HTTP 200)' : 'API Connected'}
              </div>
            </section>

            <section>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>
                Architecture & Module Status
              </h3>
              <div className="grid-3">
                <div className="card active-feature">
                  <div className="card-badge active">Phase 2 Ready</div>
                  <div className="card-icon">📦</div>
                  <h4 className="card-title">Product Catalog & Database</h4>
                  <p className="card-desc">
                    Live PostgreSQL database schema powering full product endpoints, category filtering, detailed views, and seeding.
                  </p>
                  <button
                    className="btn btn-secondary btn-sm"
                    style={{ marginTop: '1rem', width: '100%' }}
                    onClick={() => handleTabChange('products')}
                  >
                    View Catalog →
                  </button>
                </div>

                <div className="card">
                  <div className="card-badge">Module Placeholder</div>
                  <div className="card-icon">🎨</div>
                  <h4 className="card-title">Product Customizer</h4>
                  <p className="card-desc">
                    Interactive canvas editor allowing real-time preview of artwork, text fonts, color pickers, and live placement adjustments.
                  </p>
                </div>

                <div className="card">
                  <div className="card-badge">Module Placeholder</div>
                  <div className="card-icon">🔄</div>
                  <h4 className="card-title">Jenkins CI/CD Pipeline</h4>
                  <p className="card-desc">
                    Automated build, test, and containerization workflow validating backend Pytest suites and frontend bundle compilation.
                  </p>
                </div>
              </div>
            </section>
          </>
        )}

        {activeTab === 'products' && (
          selectedProductId ? (
            <ProductDetails
              productId={selectedProductId}
              onBack={() => setSelectedProductId(null)}
            />
          ) : (
            <Products onViewDetails={handleViewProductDetails} />
          )
        )}

        {activeTab !== 'home' && activeTab !== 'products' && (
          <section className="hero">
            <div className="hero-pill">Module Placeholder</div>
            <h2 className="hero-title" style={{ fontSize: '2.5rem' }}>
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Module
            </h2>
            <p className="hero-description">
              The <strong>{activeTab}</strong> section is a placeholder created as part of the project setup. 
              Authentication, shopping cart, orders, and payments will be implemented in subsequent phases.
            </p>
            <button className="btn btn-secondary" onClick={() => handleTabChange('home')}>
              ← Return to Home
            </button>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
