import { createBrowserRouter } from "react-router-dom";
import NotFound from "./pages/NotFound";

import Home from "./pages/home/Home";
import Main from "./pages/home/partials/Main";
import Login from "./pages/home/partials/Login";
import Register from "./pages/home/partials/Register";

import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminHome from "./pages/Admin/partials/Home";
import Perefernces from "./pages/Admin/partials/Preferences";
import Categories from "./pages/Admin/partials/Categories";
import Providers from "./pages/Admin/partials/Providers";

import ProviderDashboard from "./pages/provider/ProviderDashboard";
import ProviderHome from "./pages/Provider/partials/Home";
import ProviderServices from './pages/provider/partials/Services'

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
        path: "categories",
        element: <Categories />,
      },
      {
        path: "preferences/:type",
        element: <Perefernces />,
      },
      {
        path: "providers",
        element: <Providers />,
      },
    ],
  },
  {
    path: "/provider",
    element: <ProviderDashboard />,
    children: [
      {
        index: true,
        element: <ProviderHome />,
      },
      {
        path: "services",
        element: <ProviderServices />,
      },
      {
        path: "preferences/:type",
        element: <Perefernces />,
      },
      {
        path: "providers",
        element: <Providers />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
