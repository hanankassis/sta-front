import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Tourist/Home"; // صفحة رئيسية للزائر
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ProviderDashboard from "./pages/provider/ProviderDashboard";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/", 
    element: <Home />,
  },  
  {
    path: "/admin", 
    element: <AdminDashboard />,
  },  
  {
    path: "/provider", 
    element: <ProviderDashboard />,
  },  
  {
    path: "*",
    element: <NotFound />,
  },
]);


export default router;
