const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("touch-energy-token");

  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const createOrderRequest = async (orderData) => {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(orderData),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok || !data.success) {
    throw new Error(
      data.message || "Unable to save your order request."
    );
  }

  return data;
};

export const createBuyNowOrder = async (orderData) => {
  const response = await fetch(`${API_BASE_URL}/orders/buy-now`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(orderData),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok || !data.success) {
    throw new Error(
      data.message || "Unable to create your payment order."
    );
  }

  return data;
};

export const createCartBuyNowOrder = async (orderData) => {
  const response = await fetch(`${API_BASE_URL}/orders/cart-buy-now`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(orderData),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok || !data.success) {
    throw new Error(
      data.message || "Unable to create your payment order."
    );
  }

  return data;
};

export const verifyRazorpayPayment = async (paymentData) => {
  const response = await fetch(`${API_BASE_URL}/payments/verify`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(paymentData),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok || !data.success) {
    throw new Error(
      data.message || "Unable to verify the payment."
    );
  }

  return data;
};
