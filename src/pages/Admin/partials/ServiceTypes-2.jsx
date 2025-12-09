import { useState, useEffect } from "react";
import { categories } from "../../../services/api";
import modals from "../../../services/modals";
import MySpinner from "../../../components/Shared/MySpinner";

export default function ServiceTypes() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // form
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ id: null, name: "" });

  const isEdit = Boolean(form.id);

  function openForm(item = null) {
    setForm(item ? { id: item.id, name: item.name } : { id: null, name: "" });
    setShowForm(true);
  }

  function resetForm() {
    setForm({ id: null, name: "" });
    setShowForm(false);
  }

  function updateList(data) {
    setItems((prev) => {
      const exists = prev.some((x) => x.id === data.id);
      return exists ? prev.map((x) => (x.id === data.id ? data : x)) : [data, ...prev];
    });
  }

  async function handleSave() {
    if (!form.name.trim()) return;

    setSaving(true);

    const apiCall = isEdit ? categories.update : categories.create;
    const args = isEdit ? [form.id, { name: form.name }] : [{ name: form.name }];

    const { result, data, text } = await apiCall(...args);

    if (result) {
      modals.success(text);
      console.log(data);
      updateList(data);
      resetForm();
    } else modals.error(text);

    setSaving(false);
  }

  async function handleDelete(item) {
    const q = await modals.deleteConfirm();
    if (!q.isConfirmed) return;

    setLoading(true);
    const { result, text } = await categories.remove(item.id);

    if (result) {
      setItems((prev) => prev.filter((x) => x.id !== item.id));
      modals.success(text);
    } else modals.error(text);

    setLoading(false);
  }

  useEffect(() => {
    async function load() {
      setLoading(true);
      const { result, data, text } = await categories.list();
      if (result) setItems(Array.isArray(data) ? data : []);
      else modals.error(text);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <section>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h4 style={{ margin: 0 }}>إدارة أنواع الخدمات</h4>
        <button className="btn btn-sm btn-outline-success ms-5" onClick={() => openForm()}>إضافة نوع خدمة</button>
      </div>

      {showForm && (
        <div style={{ marginTop: 12, background: "#fff", padding: 12, borderRadius: 8 }}>
          <div className="form-inline">
            <input
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="اسم نوع الخدمة"
            />
            <button className="btn btn-success" onClick={handleSave} disabled={saving}>
              {saving ? "جاري الحفظ..." : isEdit ? "تعديل" : "إضافة"}
            </button>
            <button className="btn btn-ghost" onClick={resetForm}>إلغاء</button>
          </div>
        </div>
      )}

      <div style={{ marginTop: 12 }}>
        <div style={{ background: "#fff", borderRadius: 8, overflow: "auto", position: "relative", minHeight: "70vh" }}>
          {loading && <MySpinner />}

          <table className="table">
            <thead>
              <tr>
                <th>الاسم</th>
                <th style={{ width: 180 }}>إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>
                    <button className="btn btn-success ms-2" onClick={() => openForm(item)}>تعديل</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(item)} style={{ marginLeft: 8 }}>حذف</button>
                  </td>
                </tr>
              ))}

              {items.length === 0 && !loading && (
                <tr>
                  <td colSpan={2} className="empty-state">لا توجد بيانات</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
