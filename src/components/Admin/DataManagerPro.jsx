import { useEffect, useState } from "react";
import modals from "../services/modals";

export default function DataManagerPro({
  title,
  api,
  fields,
  pageSize = 10,
}) {
  const [items, setItems] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [page, setPage] = useState(1);

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({});

  const isEdit = Boolean(form.id);

  const pagesCount = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  function openForm(row = null) {
    setForm(row || fields.reduce((acc, f) => ({ ...acc, [f.name]: "" }), {}));
    setShowForm(true);
  }

  function resetForm() {
    setShowForm(false);
    setForm({});
  }

  function filterData(data) {
    setFiltered(
      data.filter((item) =>
        fields.some((f) =>
          String(item[f.name]).toLowerCase().includes(search.toLowerCase())
        )
      )
    );
  }

  async function load() {
    setLoading(true);
    const { result, data, text } = await api.list();
    if (result) {
      setItems(data);
      filterData(data);
    } else modals.error(text);

    setLoading(false);
  }

  async function handleSave() {
    if (!form.name?.trim()) return;

    setSaving(true);
    const apiCall = isEdit ? api.update : api.create;
    const params = isEdit ? [form.id, form] : [form];

    const { result, data, text } = await apiCall(...params);

    if (result) {
      modals.success(text);

      const newList = isEdit
        ? items.map((x) => (x.id === data.id ? data : x))
        : [data, ...items];

      setItems(newList);
      filterData(newList);
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
      const newList = items.filter((x) => x.id !== row.id);
      setItems(newList);
      filterData(newList);
    } else modals.error(text);
  }

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    filterData(items);
    setPage(1);
  }, [search]);

  return (
    <section>
      <div className="d-flex justify-between align-center mb-2">
        <h4>{title}</h4>

        <div className="d-flex gap-2">
          <input
            placeholder="بحث..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={() => load()} className="btn btn-secondary">
            تحديث
          </button>
          <button onClick={() => openForm()} className="btn btn-success">
            إضافة
          </button>
        </div>
      </div>

      {showForm && (
        <div className="box">
          {fields.map((f) => (
            <div key={f.name}>
              <label>{f.label}</label>
              <input
                value={form[f.name]}
                onChange={(e) => setForm((x) => ({ ...x, [f.name]: e.target.value }))}
              />
            </div>
          ))}

          <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
            {saving ? "جاري..." : isEdit ? "تعديل" : "إضافة"}
          </button>
          <button className="btn btn-secondary" onClick={resetForm}>
            إلغاء
          </button>
        </div>
      )}

      <table className="table mt-2">
        <thead>
          <tr>
            {fields.map((f) => (
              <th key={f.name}>{f.label}</th>
            ))}
            <th>إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((row) => (
            <tr key={row.id}>
              {fields.map((f) => (
                <td key={f.name}>{row[f.name]}</td>
              ))}
              <td>
                <button className="btn btn-sm btn-success" onClick={() => openForm(row)}>
                  تعديل
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(row)}>
                  حذف
                </button>
              </td>
            </tr>
          ))}

          {paginated.length === 0 && !loading && (
            <tr>
              <td colSpan={fields.length + 1}>لا توجد بيانات</td>
            </tr>
          )}
        </tbody>
      </table>

      {pagesCount > 1 && (
        <div className="pagination mt-3">
          {Array.from({ length: pagesCount }, (_, i) => (
            <button
              key={i}
              className={`page-btn ${page === i + 1 ? "active" : ""}`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
