import { createBrowserRouter } from "react-router-dom";
import ProtectComponent from "./components/Security/ProtectComponent";

import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminHome from "./pages/Admin/Partials/Home";
import Categories from "./pages/Admin/Partials/Categories";
import Providers from "./pages/Admin/Partials/Providers";
import Complaints from "./pages/Admin/Partials/Complaints";

import ProviderDashboard from "./pages/Provider/ProviderDashboard";
import ProviderHome from "./pages/Provider/Partials/Home";
import ProviderServices from "./pages/Provider/Partials/Services";
import Comments from "./pages/Provider/Partials/Comments";
import Ratings from "./pages/Provider/Partials/Ratings";
import ProviderCategories from "./pages/Provider/Partials/Categories";

import Home from "./pages/Home/SiteHome";
import HomeMain from "./pages/Home/Partials/Home";
import Login from "./pages/Home/Partials/Login";
import Register from "./pages/Home/Partials/Register";
import ContactUs from "./pages/Home/Partials/Contactus";
import Profile from "./pages/Home/Partials/Profile";
import NotFound404 from "./pages/NotFound404";
import About from "./pages/Home/Partials/About";
import StartTrip from "./pages/Home/Partials/StartTrip";
import TourHistory from "./pages/Home/Partials/TourHistory";


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
      {
        path: "start-tour",        
        element: 
          <ProtectComponent userType="tourist">        
            <StartTrip />
          </ProtectComponent>            
      },
      {
        path: "tour-history",        
        element: 
          <ProtectComponent userType="tourist">        
            <TourHistory />
          </ProtectComponent>            
      },
      {
        path: "profile",

        element: (
          <ProtectComponent userType="tourist">
            <Profile />,
          </ProtectComponent>
        ),
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact-us",
        element: <ContactUs />,
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
        path: "complaint",
        element: <Complaints />,
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
        path: "providers",
        element: <Providers />,
      },
      {
        path: "ratings",
        element: <Ratings />,
      },
      {
        path: "categories",
        element: <ProviderCategories />,
      },
      {
        path: "comments",
        element: <Comments />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound404 />,
  },
]);

export default router;
