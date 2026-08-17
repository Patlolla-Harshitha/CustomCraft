import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div>
          <p>© {new Date().getFullYear()} CustomCraft — Personalized E-Commerce Platform</p>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '0.25rem' }}>
            College DevOps Assignment Project | Phase 1 Setup
          </p>
        </div>
        <div className="footer-meta">
          <span>FastAPI</span>
          <span>•</span>
          <span>React + Vite</span>
          <span>•</span>
          <span>PostgreSQL</span>
          <span>•</span>
          <span>Docker</span>
          <span>•</span>
          <span>Jenkins</span>
        </div>
      </div>
    </footer>
  );
}
