import { useEffect, useState } from "react";
import { tourist as apiTourist } from "../../../services/api";
import modals from "../../../services/modals";

export default function BookHistory() {
  const [history, setHistory] = useState([]);
  const [activeBooking, setActiveBooking] = useState(null);

  // rating modal
  const [rate, setRate] = useState(0);

  // comment / complaint
  const [comment, setComment] = useState("");
  const [commentType, setCommentType] = useState(""); // comment | complaint

  useEffect(() => {
    const loadHistory = async () => {
      const { result, data, text } = await apiTourist.tourHistory();
      if (result) setHistory(data);
      else modals.error(text);
    };
    loadHistory();
  }, []);

  /* ================= ACTIONS ================= */

  const submitRating = async () => {
    if (!activeBooking) return;

    const { data, result, text } = await apiTourist.rate({
      rate,
      service_id: activeBooking.service_id,
    });
    console.log(data);
    if (!result) modals.error(text);
  };

  const submitComment = async () => {
    if (!activeBooking) return;

    const { data, result, text } = await apiTourist.comment({
      comment,
      type: commentType,
      service_id: activeBooking.service_id,
    });
    console.log(data);

    if (!result) modals.error(text);
  };

  /* ================= UI ================= */

  return (
    <div className="container-fluid main-container">
      <div className="pt-5">
        <h4 className="my-3 pt-5  text-center title text-white">
          الرحلات السابقة
        </h4>
        <div className="mx-auto w-75">
          {history.map((booking) => (
            <div className="card mb-3" key={booking.id}>
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h5>{booking.service.name}</h5>
                  <p className="text-muted mb-0">{booking.start_date}</p>
                </div>

                <div className="d-flex gap-2">
                  <button
                    className="btn btn-warning btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#ratingModal"
                    onClick={() => setActiveBooking(booking)}
                  >
                    تقييم
                  </button>

                  <button
                    className="btn btn-primary btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#textModal"
                    onClick={() => {
                      setCommentType("positive");
                      setActiveBooking(booking);
                    }}
                  >
                    تعليق
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#textModal"
                    onClick={() => {
                      setCommentType("negative");
                      setActiveBooking(booking);
                    }}
                  >
                    شكوى
                  </button>
                </div>
              </div>
            </div>
          ))}
          {/* ================= Rating Modal ================= */}
          <div className="modal fade" id="ratingModal">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">تقييم الرحلة</h5>
                  <button
                    className="btn-close"
                    data-bs-dismiss="modal"
                  ></button>
                </div>

                <div className="modal-body text-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      style={{
                        fontSize: "2rem",
                        cursor: "pointer",
                        color: star <= rate ? "gold" : "#ccc",
                      }}
                      onClick={() => {
                        setRate(star);
                      }}
                    >
                      ★
                    </span>
                  ))}
                </div>

                <div className="modal-footer">
                  <button
                    className="btn btn-success"
                    onClick={() => {
                      submitRating();
                    }}
                    data-bs-dismiss="modal"
                    disabled={!rate}
                  >
                    إرسال
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ================= Comment / Complaint Modal ================= */}
          <div className="modal fade" id="textModal">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {commentType === "positive" ? "إضافة تعليق" : "إرسال شكوى"}
                  </h5>
                  <button
                    className="btn-close"
                    data-bs-dismiss="modal"
                  ></button>
                </div>

                <div className="modal-body">
                  <textarea
                    className="form-control"
                    rows="4"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder={
                      commentType === "nagative"
                        ? "اكتب تعليقك هنا"
                        : "اكتب الشكوى هنا"
                    }
                  />
                </div>

                <div className="modal-footer">
                  <button
                    className="btn btn-success"
                    onClick={submitComment}
                    data-bs-dismiss="modal"
                    disabled={!comment}
                  >
                    إرسال
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
