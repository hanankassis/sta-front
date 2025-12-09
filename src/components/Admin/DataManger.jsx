import { useEffect, useState } from "react";
import modals from "../../services/modals";
import MySpinner from "../../components/Shared/MySpinner";

export default function DataManager({ title, api, fields }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({});

  const isEdit = Boolean(form.id);

  function openForm(row = null) {
    setForm(row || fields.reduce((acc, f) => ({ ...acc, [f.name]: "" }), {}));
    setShowForm(true);
  }

  function resetForm() {
    setShowForm(false);
    setForm({});
  }

  async function handleSave() {
    setSaving(true);

    const apiCall = isEdit ? api.update : api.create;
    const params = isEdit ? [form.id, form] : [form];

    const { result, data, text } = await apiCall(...params);

    if (result) {
      modals.success(text);
      setItems((prev) => {
        if (isEdit) return prev.map((x) => (x.id === data.id ? data : x));
        return [data, ...prev];
      });
      resetForm();
    } else modals.error(text);

    setSaving(false);
  }

  async function handleDelete(row) {
    const c = await modals.deleteConfirm();
    if (!c.isConfirmed) return;

    const { result, text } = await api.remove(row.id);

    if (result) {
      modals.success(text);
      setItems((prev) => prev.filter((x) => x.id !== row.id));
    } else modals.error(text);
  }

  useEffect(() => {
    async function load() {
      setLoading(true);
      const { result, data, text } = await api.list();
      if (result) setItems(Array.isArray(data) ? data : []);
      else modals.error(text);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <section>
      <div className="d-flex justify-content-between align-align-items-center">
        <h4 className="m-0">{title}</h4>
        <button
          onClick={() => openForm()}
          className="btn btn-sm btn-outline-success ms-5"
        >
          إضافة جديد
        </button>
      </div>

      {showForm && (
        <div className="box mt-2 p-2 rounded-2 bg-white">
          <div className="form-inline">
            {fields.map((f) => (
              <div key={f.name}>
                <input
                  value={form[f.name] || ""}
                  onChange={(e) =>
                    setForm((x) => ({ ...x, [f.name]: e.target.value }))
                  }
                  placeholder={`أدخل ${f.label}`}
                />
              </div>
            ))}

            <button
              className="btn btn-success"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "جاري الحفظ..." : isEdit ? "تعديل" : "إضافة"}
            </button>
            <button className="btn btn-ghost" onClick={resetForm}>
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
            minHeight: "70vh",
          }}
        >
          {loading && <MySpinner />}
          <table className="table">
            <thead>
              <tr>
                {fields.map((f) => (
                  <th key={f.name}>{f.label}</th>
                ))}
                <th>إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {items.map((row) => (
                <tr key={row.id}>
                  {fields.map((f) => (
                    <td key={f.name}>{row[f.name]}</td>
                  ))}
                  <td>
                    <button
                      className="btn btn-sm btn-success ms-2"
                      onClick={() => openForm(row)}
                    >
                      تعديل
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(row)}
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))}

              {items.length === 0 && !loading && (
                <tr>
                  <td className="empty-state" colSpan={fields.length + 1}>لا توجد بيانات</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
