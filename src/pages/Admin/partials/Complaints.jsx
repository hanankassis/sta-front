import { useEffect, useState } from "react";
import MySpinner from "../../../components/Shared/MySpinner";
import { admin as apiAdmin } from "../../../services/api";
import modals from "../../../services/modals";

export default function Complaints() {
  const [loading, setLoading] = useState(false);
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    async function loadComplaints() {
      setLoading(true);
      const { result, data, text } = await apiAdmin.complaints();
      if (result) setComplaints(Array.isArray(data) ? data : []);
      else modals.error(text);
      setLoading(false);
    }

    loadComplaints();
  }, []);

  return (
    <section className="px-5 mt-3">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h4 className="text-success"> الشكاوى</h4>
      </div>

      <div style={{ marginTop: 12 }}>
        <div
          style={{
            background: "#fff",
            borderRadius: 8,
            overflow: "auto",
            position: "relative",
          }}
        >
          {loading && <MySpinner />}
          <table className="table">
            <thead>
              <tr>
                <th>الشكوى</th>
                <th> مقدم الخدمة</th>
                <th>الخدمة</th>
                <th> الزبون</th>
                <th>التاريخ</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((s) => (
                <tr key={s.id}>
                  <td>{s.comment}</td>
                  <td>{s.service.provider.name}</td>
                  <td>{s.service.name}</td>
                  <td>{s.tourist.name}</td>                  
                  <td>{s.created_at}</td>
                </tr>
              ))}
              {complaints.length === 0 && !loading && (
                <tr>
                  <td colSpan={2} className="empty-state">
                    لا توجد بيانات
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
