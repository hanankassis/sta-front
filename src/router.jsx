import { createBrowserRouter } from "react-router-dom";
import NotFound from "./pages/NotFound";

import Home from "./pages/Home/Home";
import Main from "./pages/Home/Partials/Main";
import Login from "./pages/Home/Partials/Login";
import Register from "./pages/Home/Partials/Register";

import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminHome from "./pages/Admin/Partials/Home";
import Perefernces from "./pages/Admin/Partials/Preferences";
import Categories from "./pages/Admin/Partials/Categories";
import Providers from "./pages/Admin/Partials/Providers";

import ProviderDashboard from "./pages/Provider/ProviderDashboard";
import ProviderHome from "./pages/Provider/Partials/Home";
import ProviderServices from './pages/Provider/Partials/Services'

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
        path: "providers/:accepted",
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
