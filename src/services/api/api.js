// src/services/api.js
import axios from "axios";

/* get from .env laravel URL */
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000/api";

// إعداد axios الأساسي مع التهيئات اللازمة
const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
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
const makeApiRequest = async ({
  verb,
  url,
  data = null,
  params = null,
  contentType = "application/json"}) => {
    // console.log("params" , params );
  try {
    const response = await api({
      method: verb,
      url: url,
      data: data,
      params:  params ,
      headers: {
        "Content-Type": contentType,
      },
    });
    // console.log("response",response);
    return {
      status: response.status,
      result: response.data.success,
      data: response.data.data,
      text: response.data.message,
    };
  } catch (error) {
    if (error.status == "422")
      return {
        status: error.status,
        result: false,
        data: error.response.data.errors,
        text: "بعض الحقول غير صحيحة",
      };
    // the server responded with othor
    else if (error.response)
      return {
        status: error.status,
        result: false,
        data: error.response.data,
        text: "حدث خطأ يرجى المحاولة لاحقاً.",
      };
    // no response
    else
      return {
        status: "no response",
        result: false,
        data: null,
        text: "الخادم غير متوفر ",
      };
  }
};
export default makeApiRequest;