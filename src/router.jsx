import { createBrowserRouter } from "react-router-dom";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ProviderDashboard from "./pages/provider/ProviderDashboard";
import NotFound from "./pages/NotFound";
import Home from "./pages/home/Home";
import Login from "./pages/home/partials/Login";
import Register from "./pages/home/partials/Register";
import AdminHome from "./pages/Admin/partials/Home";
import Main from "./pages/home/partials/Main";
import Perefernces from "./pages/Admin/partials/Preferences";
import Providers from "./pages/Admin/partials/Providers";
import Categories from "./pages/Admin/partials/categories";

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
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
