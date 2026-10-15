const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const TOKEN_KEY = "touch-energy-token";

const getToken = () => localStorage.getItem(TOKEN_KEY);

const saveToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

const authRequest = async (endpoint, options = {}) => {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}/auth${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong.");
  }

  return data;
};

export const registerUser = async (formData) => {
  const data = await authRequest("/register", {
    method: "POST",
    body: JSON.stringify(formData),
  });

  saveToken(data.token);
  return data.user;
};

export const loginUser = async (credentials) => {
  const data = await authRequest("/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

  saveToken(data.token);
  return data.user;
};

export const getCurrentUser = async () => {
  const data = await authRequest("/me");
  return data.user;
};

export const logoutUser = () => {
  clearToken();
};

export const hasAuthToken = () => Boolean(getToken());
