import React from 'react';

export default function Navbar({ activeTab, setActiveTab, apiStatus }) {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Products' },
    { id: 'cart', label: 'Cart' },
    { id: 'orders', label: 'Orders' },
    { id: 'login', label: 'Login' },
    { id: 'admin', label: 'Admin' },
  ];

  return (
    <header className="navbar">
      <div className="nav-container">
        <a href="#home" className="brand-logo" onClick={() => setActiveTab('home')}>
          <div className="logo-badge">CC</div>
          <span>Custom<span className="gradient-text">Craft</span></span>
        </a>

        <nav>
          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(item.id)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav-actions">
          <div className={`badge-tag ${apiStatus === 'healthy' ? 'healthy' : ''}`}>
            <span className="status-dot"></span>
            Backend: {apiStatus || 'Checking...'}
          </div>
        </div>
      </div>
    </header>
  );
}
