import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function SimpleModal() {
  const [open, setOpen] = useState(true);

  if (!open) return null;

  return (
    <>
      {/* Backdrop – click closes modal */}
      <div
        className="modal-backdrop fade show"
        onClick={() => setOpen(false)}
      />

      {/* Modal */}
      <div className="modal d-block" tabIndex="-1">
        <div
          className="modal-dialog modal-dialog-centered"
          onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modal Title</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setOpen(false)}
              />
            </div>
            <div className="modal-body">
              <p>اضغط خارج المودال ليتم الإغلاق مباشرة.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
