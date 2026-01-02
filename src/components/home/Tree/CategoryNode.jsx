import { useState } from "react";

export default function CategoryNode({ node, onAdd }) {
  const [open, setOpen] = useState(false);

  return (
    <li className="list-group-item">
      <div className="d-flex justify-content-between align-items-center">
        <span>{node.name}</span>

        <div className="btn-group btn-group-sm">
          <button
            className="btn btn-warning"
            title="إضافة"
            onClick={() => onAdd(node)}
          >
            +
          </button>

          {node.children?.length > 0 && (
            <button
              className="btn btn-success"
              title="مزيد"
              onClick={() => setOpen(!open)}
            >
              {open ? 
              <i className="fa fa-chevron-up"></i> : <i className="fa fa-chevron-down"></i> }
            </button>
          )}
        </div>
      </div>

      {open && node.children?.length > 0 && (
        <ul className="list-group mt-2 ms-4">
          {node.children.map(child => (
            <CategoryNode
              key={child.id}
              node={child}
              onAdd={onAdd}
            />
          ))}
        </ul>
      )}
    </li>
  );
}