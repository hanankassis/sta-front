import { auth } from "../../services/api";
import { useNavigate } from "react-router-dom";
import "./ProviderNav.css";
import { useEffect, useState } from "react";
import { notifications as apiNotifications } from "./../../services/api";
import modals from "./../../services/modals";
import MySpinner from "../Shared/MySpinner";
import NotificationModal from "./NotificationModal";

const ProviderNav = () => {
  const navigator = useNavigate();
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const logoutFn = () => {
    auth.logout();
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("type");
    navigator("/");
  };

  useEffect(() => {
      const getUnreadNotifications = async () => {
        setLoading(true);
        const { result, data, text } = await apiNotifications.unreadCount();
        console.log(data);
        if (result) setUnreadNotificationsCount(data);
        else modals.error(text);
        setLoading(false);
      };
  
      getUnreadNotifications();
    }, []);
  return (
    <>
      {loading ? (
        <MySpinner />
      ) : (
        <nav className="admin-header" dir="rtl">
          {notificationOpen  && (
            <NotificationModal 
            setNotificationOpen={setNotificationOpen} />
          )}
          <div className="brand">
            <h1 className="title me-4">اهلا بك {auth.currentUser()}</h1>
          </div>

          <div className="controls">
            <div className="position-relative" style={{cursor: "pointer"}} onClick={() => setNotificationOpen(true)}>
              <i className="fa fa-bell fa-2x text-success"></i>
              <span
                className="position-absolute bg-warning rounded-circle px-1 fw-bold text-white"
                style={{ fontSize: "10px", bottom: "0px", right: "-9px" }}
              >
                {unreadNotificationsCount}
              </span>
            </div>
            <button className="btn btn-outline-secondary" onClick={logoutFn}>
              تسجيل خروج
            </button>
            <img src="/logo.png" alt="" width="50" />
          </div>
        </nav>
      )}
    </>
  );
};

export default ProviderNav;
