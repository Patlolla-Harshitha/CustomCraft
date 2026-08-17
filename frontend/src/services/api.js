/**
 * API Service helper module for CustomCraft Frontend
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
  ? import.meta.env.VITE_API_BASE_URL.replace(/\/+$/, '')
  : '/api';

/**
 * Fetch all active products from backend GET /products
 */
export async function fetchProducts() {
  try {
    const res = await fetch(`${API_BASE_URL}/products`);
    if (!res.ok) {
      if (API_BASE_URL !== '/api') {
        const fallbackRes = await fetch('/api/products');
        if (fallbackRes.ok) return await fallbackRes.json();
      }
      throw new Error(`HTTP Error ${res.status}: ${res.statusText}`);
    }
    return await res.json();
  } catch (err) {
    if (API_BASE_URL !== '/api') {
      try {
        const fallbackRes = await fetch('/api/products');
        if (fallbackRes.ok) return await fallbackRes.json();
      } catch (fallbackErr) {
        // Ignore fallback error
      }
    }
    throw err;
  }
}

/**
 * Fetch a single product by ID from backend GET /products/{id}
 */
export async function fetchProductById(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${id}`);
    if (res.status === 404) {
      const errorData = await res.json().catch(() => ({}));
      const error = new Error(errorData.detail || `Product with ID ${id} not found.`);
      error.status = 404;
      throw error;
    }
    if (!res.ok) {
      if (API_BASE_URL !== '/api') {
        const fallbackRes = await fetch(`/api/products/${id}`);
        if (fallbackRes.ok) return await fallbackRes.json();
      }
      throw new Error(`HTTP Error ${res.status}: ${res.statusText}`);
    }
    return await res.json();
  } catch (err) {
    if (err.status === 404) throw err;
    if (API_BASE_URL !== '/api') {
      try {
        const fallbackRes = await fetch(`/api/products/${id}`);
        if (fallbackRes.status === 404) {
          const errorData = await fallbackRes.json().catch(() => ({}));
          const error = new Error(errorData.detail || `Product with ID ${id} not found.`);
          error.status = 404;
          throw error;
        }
        if (fallbackRes.ok) return await fallbackRes.json();
      } catch (fallbackErr) {
        if (fallbackErr.status === 404) throw fallbackErr;
      }
    }
    throw err;
  }
}
