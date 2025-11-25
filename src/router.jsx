import { createBrowserRouter } from "react-router-dom";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ProviderDashboard from "./pages/provider/ProviderDashboard";
import NotFound from "./pages/NotFound";
import Home from "./pages/home/Home";
import Login from "./pages/home/partials/Login";
import Register from "./pages/home/partials/Register";
import ServiceTypes from "./pages/Admin/partials/ServiceTypes";
import AdminHome from "./pages/Admin/partials/Home";
import Main from "./pages/home/partials/Main";
import Perefernces from "./pages/Admin/partials/Preferences";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminDashboard />,
    children: [
      {
        index: true,
        element: <AdminHome />,
      },
      {
        path: "service-types",
        element: <ServiceTypes />,
      },
      {
        path: "preferences",
        element: <Perefernces />,
      },
    ],
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
