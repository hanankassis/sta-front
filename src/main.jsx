import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom"; // استخدام react-router-dom لـ createBrowserRouter و RouterProvider
import "bootstrap/dist/css/bootstrap.min.css"; // استيراد Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // استيراد Bootstrap CSS
import "font-awesome/css/font-awesome.min.css";
import router from "./router.jsx"; // استيراد الموجه من ملف router.jsx
import './style.css';

createRoot(document.getElementById("root")).render(
  <StrictMode>    
    <RouterProvider router={router} />
  </StrictMode>
);
