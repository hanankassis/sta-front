import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ProviderDashboard from "./pages/provider/ProviderDashboard";
import NotFound from "./pages/NotFound";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import HomeHeader from './components/Home/HomeHeader'

const router = createBrowserRouter([
  {
    path: "/",
        element: <Home />,
    children: [
      {
        index: true,
        element: <HomeHeader />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
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
