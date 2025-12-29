import "./NotificationModal.css";
import { notifications as apiNotifications } from "./../../services/api";
import modals from "../../services/modals";
import { useEffect, useState } from "react";
import MySpinner from "../Shared/MySpinner";

export default function NotificationModal({ setNotificationOpen }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  const markAsRead = async () => {
    const { result, text } = await apiNotifications.markAsRead();
    if (result) {
      const readNotifications = notifications.map((n) => {
        if (!n.read) {
          n.date = new Date();
          n.read = true;
        }
        return n;
      });
      console.log("read");
      setNotifications(readNotifications);
    } else modals.error(text);
  };

  useEffect(() => {
    const unreadNotifications = async () => {
      setLoading(true);
      const { result, data, text } = await apiNotifications.list();
      // console.log(data);
      if (result) setNotifications(data);
      else modals.error(text);
      setLoading(false);
    };

    unreadNotifications();
  }, []);

  return (
    <>
      {loading ? (
        <MySpinner />
      ) : (
        <div
          className="position-fixed top-0 start-0 w-100 h-100"
          style={{ backgroundColor: "rgba(100,100,100,0.2)", zIndex: 1050 }}
          onClick={() => {
            setNotificationOpen(false);
            markAsRead();
          }}
        >
          {/* Modal dialog */}
          <div
            className="modal-dialog modal-lg"
            onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
          >
            <div className="modal-content">
              <button
                type="button"
                className="btn close bg-warning"
                onClick={() => {
                  setNotificationOpen(false);
                  markAsRead();
                }}
              >
                ✖{" "}
              </button>
              <div className="modal-body p-0">
                <table className="table mb-0 table-concise">
                  <thead className="table-light">
                    <tr>
                      <th>الرسالة</th>
                      <th>التاريخ</th>
                      <th>الحالة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notifications.map((n) => (
                      <tr
                        key={n.id}
                        className={
                          n.read ? "table-success-light" : "table-warning-light"
                        }
                      >
                        <td>{n.message}</td>
                        <td>{new Date(n.date).toLocaleDateString("ar-EG")}</td>
                        {/* <td>{n.date}</td> */}
                        <td>
                          {n.read ? (
                            <span className="badge bg-success">مقروء</span>
                          ) : (
                            <span className="badge bg-warning text-dark">
                              غير مقروء
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
