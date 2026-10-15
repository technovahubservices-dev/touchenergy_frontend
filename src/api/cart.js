const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const TOKEN_KEY = "touch-energy-token";

const cartRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem(TOKEN_KEY);

  const response = await fetch(`${API_BASE_URL}/cart${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok || data.success === false) {
    throw new Error(data.message || "Unable to update your cart.");
  }

  return data.cart;
};

export const getCart = () => cartRequest("");

export const addCartItem = (productId, quantity = 1) =>
  cartRequest("/items", {
    method: "POST",
    body: JSON.stringify({ productId, quantity }),
  });

export const updateCartItem = (productId, quantity) =>
  cartRequest(`/items/${encodeURIComponent(productId)}`, {
    method: "PATCH",
    body: JSON.stringify({ quantity }),
  });

export const removeCartItem = (productId) =>
  cartRequest(`/items/${encodeURIComponent(productId)}`, {
    method: "DELETE",
  });

export const clearRemoteCart = () =>
  cartRequest("", {
    method: "DELETE",
  });
