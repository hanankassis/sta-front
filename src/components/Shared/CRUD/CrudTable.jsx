import { useEffect, useState } from "react";

export default function CrudTable({ items, fields, onEdit, onDelete, onAddChild }) {
  const [optionsMap, setOptionsMap] = useState({});

  useEffect(() => {
    fields.forEach((f) => {
      if (f.type === "select") {
        if (typeof f.options === "function") {
          f.options()
            .then((opts) => setOptionsMap((p) => ({ ...p, [f.name]: opts })))
            .catch(() => setOptionsMap((p) => ({ ...p, [f.name]: [] })));
        } else if (Array.isArray(f.options)) {
          setOptionsMap((p) => ({ ...p, [f.name]: f.options }));
        } else {
          setOptionsMap((p) => ({ ...p, [f.name]: [] }));
        }
      }
    });
  }, [fields]);

  function getLabel(f, value) {
    if (f.type === "select") {
      const opts = optionsMap[f.name] || [];
      const found = opts.find(
        (o) => String(o.value ?? o.id) === String(value ?? "")
      );
      return found ? found.label ?? found.name ?? value : value ?? "";
    }
    return value ?? "";
  }

  return (
    <table className="table mt-3 provider-crud">
      <thead>
        <tr>
          {fields
            .filter((f) => !f.hideInTable)
            .map((f) => (
              <th key={f.name}>{f.label}</th>
            ))}
          <th className=""> إجراءات</th>
        </tr>
      </thead>
      <tbody>
        {items.map((row) => (
          <tr key={row.id}>
            {fields
              .filter((f) => !f.hideInTable)
              .map((f) => (
                <td key={f.name}>
                  {f.name === "name" ? (
                    <div
                      className="hierarchy-name"
                      data-depth={row.depth || 0}
                      style={{ paddingRight: `${(row.depth || 0) * 1.2}rem` }}
                    >
                      <i className="fa fa-circle hierarchy-icon" aria-hidden="true"></i>
                      <span className="hierarchy-text">{getLabel(f, row[f.name])}</span>
                    </div>
                  ) : (
                    getLabel(f, row[f.name])
                  )}
                </td>
              ))}
            <td className="">
              <button
                className="btn btn-outline-success btn-sm mx-1 border border-success"
                onClick={() => onEdit(row)}
                title="تعديل"
              >
                <i className="fa fa-edit "></i>
              </button>
              {onAddChild && (
                <button
                  className="btn btn-outline-primary btn-sm mx-1 border border-primary"
                  onClick={() => onAddChild(row.id)}
                  title="إضافة فرع"
                >
                  <i className="fa fa-plus"></i>
                </button>
              )}
              <button
                className="btn btn-outline-danger btn-sm mx-1 border border-danger"
                onClick={() => onDelete(row.id)}
                title="حذف"
              >
                <i className="fa fa-trash "></i>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
