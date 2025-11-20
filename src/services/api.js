// src/services/api.js
import axios from "axios";

/* get from .env laravel URL */
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000/api";

// إعداد axios الأساسي مع التهيئات اللازمة
const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// إضافة التوكن إلى رؤوس الطلبات
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


// دالة مساعدة للتعامل مع الاستجابات  
const makeApiRequest = async (verb, url, data = null) => {
  const response = await api({
    method: verb,
    url: url,
    data: data,
  });
  if (response.data.success) {
    return response.data.data; // Return only the data part
  } else {
    throw new Error(response.data.message || "API Error"); // Throw error for components to catch
  }
};

/*********************** Auth ******************** */
export const auth = {
  loginUser: async (data) => makeApiRequest('post' , '/login', data),
  registerUser: async (data) => makeApiRequest('post' , '/register', data),
  logoutUser: async () => makeApiRequest('post' , '/logout'),    
};

/*********************** Services type (Categories) ******************** */
export const categories = {
  // GET /categories
  list: async () => makeApiRequest('get', '/categories'),

  // GET /categories/:id
  get: async (id) => {
    if (!id) throw new Error('id is required')
    return makeApiRequest('get', `/categories/${id}`)
  },

  // POST /categories
  create: async (data) => {
    return makeApiRequest('post', '/categories', data)
  },

  // PUT /categories/:id
  update: async (id, data) => {
    if (!id) throw new Error('id is required')
    return makeApiRequest('put', `/categories/${id}`, data)
  },

  // DELETE /categories/:id
  remove: async (id) => {
    if (!id) throw new Error('id is required')
    return makeApiRequest('delete', `/categories/${id}`)
  }
}