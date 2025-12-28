import { auth } from "../../services/api";
import { useNavigate } from "react-router-dom";
import "./ProviderNav.css";
import { useEffect, useState } from "react";
import { notifications as apiNotifications } from "./../../services/api";
import modals from "./../../services/modals";
import MySpinner from "../Shared/MySpinner";
import { i } from "framer-motion/client";

const ProviderNav = () => {
  const navigator = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notificationShow, setNotificationShow] = useState(false);

  const logoutFn = () => {
    auth.logout();
    navigator("/");
  };

  useEffect(() => {
    const unreadNotifications = async () => {
      setLoading(true);
      const { result, data, msg } = await apiNotifications.unread();
      if (result) setNotifications(data);
      else modals.error(msg);
      setLoading(false);
    };

    unreadNotifications();
  }, []);

  return (
    <>
      {loading ? (
        <MySpinner />
      ) : (
        <nav className="admin-header" dir="rtl">
          {notificationShow && notifications.length && (
            
            <div className="z-5 bg-danger">
              ❌
              <i className="fa fa-crosshairs"></i>
              Notification table</div>
          )}
          <div className="brand">
            <h1 className="title me-4">اهلا بك {auth.currentUser()}</h1>
          </div>

          <div className="controls">
            <div className="position-relative" style={{cursor: "pointer"}} onClick={() => setNotificationShow(true)}>
              <i className="fa fa-bell fa-2x text-warning"></i>
              <span
                className="position-absolute bg-danger rounded-circle px-1 fw-bold text-white"
                style={{ fontSize: "10px", bottom: "0px", right: "-9px" }}
              >
                {notifications.length}
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
