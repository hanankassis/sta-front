export default function CrudModal({
  show,
  onClose,
  fields,
  row,
  onSave,
  saving,
}) {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>{row.id ? "تعديل" : "إضافة"}</h3>

        {fields.map((f) => (
          <div key={f.name} className="mb-3">
            <label className="form-label">{f.label}</label>
            <input
              className="form-control"
              value={row[f.name] || ""}
              onChange={(e) => onSave({ ...row, [f.name]: e.target.value })}
              disabled={saving}
            />
          </div>
        ))}

        <button
          className="btn btn-primary mx-1"
          disabled={saving}
          onClick={() => onClose(true)}
        >
          {saving ? "جاري الحفظ..." : "حفظ"}
        </button>
        <button
          className="btn btn-secondary mx-1"
          onClick={() => onClose(false)}
        >
          إلغاء
        </button>
      </div>
    </div>
  );
}
