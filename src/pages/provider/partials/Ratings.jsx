import { useEffect, useState } from "react";
import MySpinner from "../../../components/Shared/MySpinner";
import { provider as apiProvider } from "../../../services/api";
import modals from "../../../services/modals";

export default function Comments() {
  const [loading, setLoading] = useState(false);
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    async function loadRatings() {
      setLoading(true);
      const { result, data, text } = await apiProvider.ratings();
      if (result) setRatings(Array.isArray(data) ? data : []);
      else modals.error(text);
      setLoading(false);
    }

    loadRatings();
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
        <h4 className="text-success">تقييمات الزبائن</h4>
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
                <th>التقييم</th>
                <th>الخدمة</th>
              </tr>
            </thead>
            <tbody>
              {ratings.map((s) => (
                <tr key={s.id}>
                  <td>{s.avg_rating}</td>
                  <td>{s.name}</td>                  
                </tr>
              ))}
              {ratings.length === 0 && !loading && (
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
