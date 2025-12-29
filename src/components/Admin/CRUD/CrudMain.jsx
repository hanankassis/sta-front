import { useState } from "react";
import useCrud from "../../../hooks/useCrud";
import CrudModal from "./../../Shared/CRUD/CrudModal";
import CrudTable from "./../../Shared/CRUD/CrudTable";
import "./crud.css";
import MySpinner from "../../Shared/MySpinner";

export default function CrudMain({ api, filter, fields }) {
  const { items, loading, saving, save, remove , title  } = useCrud(api , filter);
  const [showModal, setShowModal] = useState(false);
  const [activeRow, setActiveRow] = useState({});
  function open(row = null) {
    setActiveRow(
      row || fields.reduce((acc, f) => ({ ...acc, [f.name]: "" }), {})
    );
    setShowModal(true);
  }

  async function handleClose(submit) {
    if (submit) {
      const ok = await save(activeRow);
      if (ok) setShowModal(false);
    } else {
      setShowModal(false);
    }
  }

  return (
    <section className="dashboard-body">
      <div className="d-flex justify-content-between align-items-center ">
        <h3 className="text-success">{title}</h3>
          <button
            className="btn btn-outline-success add-new "
            onClick={() => open()}
          >
            إضافة جديد
          </button>
      </div>

      {loading && <MySpinner />}

      <CrudTable
        items={items}
        fields={fields}
        onEdit={(row) => open(row)}
        onDelete={remove}
      />

      <CrudModal
        show={showModal}
        row={activeRow}
        fields={fields}
        onSave={setActiveRow}
        onClose={handleClose}
        saving ={saving}
      />
    </section>
  );
}
