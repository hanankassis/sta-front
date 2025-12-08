import { useState, useEffect } from "react";
import { categories } from "../../../services/api";
import modals from "../../../services/modals";
import MySpinner from "../../../components/Shared/MySpinner";


const ServiceTypes = () => {
  const [serviceTypes, setServiceTypes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formName, setFormName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  function handleAddClick() {
    setEditingId(null);
    setFormName("");
    setShowForm(true);
  }

  async function handleSave() {
    if (!formName.trim()) return;
    setSaving(true);
    //تعديل
    if (editingId) {
      const { result, data, text } = await categories.update(editingId, {
        name: formName,
      });
      if (result) {
        modals.success(text);

        setServiceTypes((prev) =>
          prev.map((s) => (s.id === editingId ? { ...s, ...data } : s))
        );
      } else modals.error(text);

      // إضافة جديد
    } else {
      const { result, data, text } = await categories.create({
        name: formName,
      });
      if (result) {
        modals.success(text);
        setServiceTypes((prev) => [data, ...prev]);
      } else modals.error(text);
    }

    setShowForm(false);
    setFormName("");
    setEditingId(null);

    setSaving(false);
  }

  function handleEdit(item) {
    setEditingId(item.id);
    setFormName(item.name);
    setShowForm(true);
  }

  async function handleDelete(item) {
    const q = await modals.deleteConfirm();

    if (!q.isConfirmed) return;

    setLoading(true);
    const { result, text } = await categories.remove(item.id);
    if (result) {
      setServiceTypes((prev) => prev.filter((p) => p.id !== item.id));
      // Proceed with the deletion or action
      modals.success(text);
    } else modals.error(text);

    setLoading(false);
  }

  useEffect(() => {
    async function load() {
      setLoading(true);
      const { result, data, text } = await categories.list();
      if (result) setServiceTypes(Array.isArray(data) ? data : []);
      else modals.error(text);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <section>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h4 style={{ margin: 0 }}>إدارة أنواع الخدمات</h4>
        <div>
          <button
            onClick={handleAddClick}
            className="btn btn-sm btn-outline-success ms-5"
          >
            إضافة نوع خدمة
          </button>
        </div>
      </div>

      {showForm && (
        <div
          style={{
            marginTop: 12,
            background: "#fff",
            padding: 12,
            borderRadius: 8,
          }}
        >
          <div className="form-inline">
            <input
              className=""
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              placeholder="اسم نوع الخدمة"
            />
            <button
              onClick={handleSave}
              className="btn btn-success"
              disabled={saving}
            >
              {saving ? "جاري الحفظ..." : "حفظ"}
            </button>
            <button
              onClick={() => {
                setShowForm(false);
                setFormName("");
                setEditingId(null);
              }}
              className="btn btn-ghost"
            >
              إلغاء
            </button>
          </div>
        </div>
      )}

      <div style={{ marginTop: 12 }}>
        <div
          style={{
            background: "#fff",
            borderRadius: 8,
            overflow: "auto",
            position: "relative",
            minHeight: "70vh"
          }}
        >
          {loading && <MySpinner />}
          <table className="table">
            <thead>
              <tr>
                <th>الاسم</th>
                <th style={{ width: 180 }}>إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {serviceTypes.map((s) => (
                <tr key={s.id}>
                  <td>{s.name}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(s)}
                      className="btn btn-success ms-2"
                    >
                      تعديل
                    </button>
                    <button
                      onClick={() => handleDelete(s)}
                      className="btn btn-danger"
                      style={{ marginLeft: 8 }}
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
              {serviceTypes.length === 0 && !loading && (
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
export default ServiceTypes;
