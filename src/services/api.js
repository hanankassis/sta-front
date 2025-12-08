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

/*********************** get countries ******************** */
export const countries = async () => makeApiRequest('get', '/countries');

/*********************** Services type (Categories) ******************** */
export const categories = {
  // GET /categories
  list: async () => makeApiRequest('get', '/admin/categories'),

  // GET /categories/:id
  get: async (id) => {
    if (!id) throw new Error('id is required')
    return makeApiRequest('get', `/admin/categories/${id}`)
  },

  // POST /categories
  create: async (data) => {
    return makeApiRequest('post', '/admin/categories', data)
  },

  // PUT /categories/:id
  update: async (id, data) => {
    if (!id) throw new Error('id is required')
    return makeApiRequest('put', `/admin/categories/${id}`, data)
  },

  // DELETE /categories/:id
  remove: async (id) => {
    if (!id) throw new Error('id is required')
    return makeApiRequest('delete', `/admin/categories/${id}`)
  }
}


/*********************** preferences ******************** */
export const preferences = {
  list: async () => makeApiRequest('get', '/admin/preferences'),

  // GET /preferences/:id
  get: async (id) => {
    if (!id) throw new Error('id is required')
    return makeApiRequest('get', `/admin/preferences/${id}`)
  },

  // POST /preferences
  create: async (data) => {
    return makeApiRequest('post', '/admin/preferences', data)
  },

  // PUT /preferences/:id
  update: async (id, data) => {
    if (!id) throw new Error('id is required')
    return makeApiRequest('put', `/admin/preferences/${id}`, data)
  },

  // DELETE /preferences/:id
  remove: async (id) => {
    if (!id) throw new Error('id is required')
    return makeApiRequest('delete', `/admin/preferences/${id}`)
  }
}
/*********************** preferences ******************** */
export const providers =  {

  list: async (data) => makeApiRequest('get', '/admin/providers' , data),
  toggleState: async (id) => makeApiRequest('patch', `/admin/providers/${id}` ),
}

  