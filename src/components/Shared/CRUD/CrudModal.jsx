import { useEffect, useState } from "react";

export default function CrudModal({ show, onClose, fields, row, onSave, saving }) {
  if (!show) return null;

  const [optionsMap, setOptionsMap] = useState({});

  useEffect(() => {
    if (!show) return;
    fields.forEach((f) => {
      if (f.type === "select") {
        if (typeof f.options === "function") {
          f
            .options()
            .then((opts) => setOptionsMap((prev) => ({ ...prev, [f.name]: opts })))
            .catch(() => setOptionsMap((prev) => ({ ...prev, [f.name]: [] })));
        } else if (Array.isArray(f.options)) {
          setOptionsMap((prev) => ({ ...prev, [f.name]: f.options }));
        } else {
          setOptionsMap((prev) => ({ ...prev, [f.name]: [] }));
        }
      }
    });
  }, [show, fields]);

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>{row?.id ? "تعديل" : "إضافة"}</h3>

        {fields.map((f) => (
          <div key={f.name} className="mb-3">
            <label className="form-label">{f.label}</label>
            {f.type === "select" ? (
              <select
                className="form-control"
                value={row[f.name] ?? ""}
                onChange={(e) => onSave({ ...row, [f.name]: e.target.value })}
                disabled={saving}
              >
                {(optionsMap[f.name] || []).length === 0 ? (
                  <option value="">{f.placeholder ?? "-"}</option>
                ) : (
                  optionsMap[f.name].map((o) => (
                    <option key={o.value ?? o.id} value={o.value ?? o.id}>
                      {o.label ?? o.name}
                    </option>
                  ))
                )}
              </select>
            ) : (
              <input
                className="form-control"
                value={row[f.name] || ""}
                onChange={(e) => onSave({ ...row, [f.name]: e.target.value })}
                disabled={saving}
              />
            )}
          </div>
        ))}

        <button className="btn btn-primary mx-1" disabled={saving} onClick={() => onClose(true)}>
          {saving ? "جاري الحفظ..." : "حفظ"}
        </button>
        <button className="btn btn-secondary mx-1" onClick={() => onClose(false)}>
          إلغاء
        </button>
      </div>
    </div>
  );
}
