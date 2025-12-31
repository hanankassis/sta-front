import { createBrowserRouter } from "react-router-dom";
import NotFound from "./pages/NotFound";

import Home from "./pages/Home/SiteHome";
import HomeMain from './pages/Home/Partials/Home'
import Login from "./pages/Home/Partials/Login";
import Register from "./pages/Home/Partials/Register";

import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminHome from "./pages/Admin/Partials/Home";
import Perefernces from "./pages/Admin/Partials/Preferences";
import Categories from "./pages/Admin/Partials/Categories";
import Providers from "./pages/Admin/Partials/Providers";

import ProviderDashboard from "./pages/Provider/ProviderDashboard";
import ProviderHome from "./pages/Provider/Partials/Home";
import ProviderServices from "./pages/Provider/Partials/Services";
import ProtectComponent from "./components/Security/ProtectComponent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        index: true,
        element: <HomeMain />,
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
    element: (
      <ProtectComponent userType="admin">
        <AdminDashboard />
      </ProtectComponent>
    ),
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
    element: (
      <ProtectComponent userType="provider">
        <ProviderDashboard />
      </ProtectComponent>
    ),
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
