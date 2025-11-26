import { useState, useEffect } from "react";
import { providers as apiProviders } from "../../../services/api";

const Providers = () => {
  const [Providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(false);    const [saving, setSaving] = useState(false);
  
  // load Providers on mount
  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await apiProviders.list();
          setProviders(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError(err.message || "خطأ في تحميل البيانات");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  

  async function handleToggle( providerId) {
    setSaving(true);
    try {
      apiProviders.toggleState(providerId);
      setProviders((prev) =>
          prev.map((s) => (s.id === providerId ? { ...s, accepted: !s.accepted } : s))
      );

    } catch (err) {
      console.error(err);
      alert(err.message || "خطأ أثناء التعديل");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h4 style={{ margin: 0 }}>إدارة مزودي الخدمة</h4>
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
          {loading && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(255,255,255,0.6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              جارٍ التحميل...
            </div>
          )}
          <table className="table">
            <thead>
              <tr>
                <th>الاسم</th>
                <th>الوصف</th>
                <th>الحالة</th>
                <th style={{ width: 180 }}>إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {Providers.map((s) => (
                <tr key={s.id}>
                  <td>{s.name}</td>
                  <td>{s.description}</td>
                  <td>{s.accepted ? 'مشترك' : 'قيد الانتظار' }</td>
                  <td>
                    <button
                      onClick={() => handleToggle(s.id)}
                      className= {`btn ${s.accepted?'btn-danger':'btn-success-light '}  ms-2`}
                    >
                     {saving? 'جاري الحفظ' : s.accepted?'منع':'قبول'} 
                    </button>                    
                  </td>
                </tr>
              ))}
              {Providers.length === 0 && !loading && (
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
};

export default Providers;
