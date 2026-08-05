import axios from "axios";

// Base API URL
const API_URL = import.meta.env.VITE_APP_API_URL;

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Enable sending cookies
});

// Add token to requests automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Product API calls
export const productAPI = {
  getByBarcode: async (barcode) => {
    try {
      const response = await api.get(`/product/viewByBarcode/${barcode}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching product by barcode:", error);
      throw error;
    }
  },

  getAll: async () => {
    try {
      const response = await api.get("/product");
      return response.data;
    } catch (error) {
      console.error("Error fetching all products:", error);
      throw error;
    }
  },

  getByCategory: async (categoryId) => {
    try {
      const response = await api.get(`/product/category/${categoryId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching products by category:", error);
      throw error;
    }
  },
};

// Auth API calls
export const authAPI = {
  login: async (credentials) => {
    try {
      const response = await api.post("/login", credentials);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
};

// Sales API calls
export const salesAPI = {
  create: async (saleData) => {
    try {
      const response = await api.post("/sales", saleData);
      return response.data;
    } catch (error) {
      console.error("Error creating sale:", error);
      throw error;
    }
  },
};

export default api;
