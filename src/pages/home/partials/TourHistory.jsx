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

    if (!result) {
      modals.error(text);
      return;
    }

    // ✅ تحديث الواجهة مباشرة
    setHistory((prev) =>
      prev.map((b) =>
        b.id === activeBooking.id
          ? {
              ...b,
              service: {
                ...b.service,
                comments: [...b.service.comments, data],
              },
            }
          : b
      )
    );

    setComment("");
    setCommentType("");
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
                  <div className="d-flex align-items-center gap-3">
                    <button
                      className="btn btn-primary btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#textModal"
                      onClick={() => {
                        setComment("");
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
                        setComment("");
                        setCommentType("negative");
                        setActiveBooking(booking);
                      }}
                    >
                      شكوى
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#commentsModal"
                      onClick={() => setActiveBooking(booking)}
                    >
                      تعليقاتك
                      {booking.service.comments.length ? (
                        <span className="me-2 badge bg-light text-dark">
                          {booking.service.comments.length}
                        </span>
                      ) : null}
                    </button>
                    <button
                      className="btn btn-warning btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#ratingModal"
                      onClick={() => {
                        setActiveBooking(booking);
                        setRate(booking.service.ratings[0]?.pivot.rate || 0);
                      }}
                    >
                      تقييم
                      {booking.service.ratings.length ? (
                        <span className="me-2 badge bg-white text-warning">
                          {booking.service.ratings[0]?.pivot.rate}/5
                        </span>
                      ) : null}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* ================= Rating Modal ================= */}
          <div className="modal fade" id="ratingModal">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header position-relative">
                  <h5 className="modal-title">تقييم الرحلة</h5>
                  <button
                    className="btn-close position-absolute"
                    style={{ left: "10px", top: "20px" }}
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
                <div className="modal-header position-relative">
                  <h5 className="modal-title">
                    {commentType === "positive" ? "إضافة تعليق" : "إرسال شكوى"}
                  </h5>
                  <button
                    className="btn-close position-absolute"
                    style={{ left: "10px", top: "20px" }}
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

          <div className="modal fade" id="commentsModal">
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header position-relative">
                  <h5 className="modal-title">تعليقات سابقة</h5>
                  <button
                    className="btn-close position-absolute"
                    style={{ left: "10px", top: "20px" }}
                    data-bs-dismiss="modal"
                  ></button>
                </div>

                <div className="modal-body">
                  {activeBooking?.service.comments.length ? (
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th className="text-center">التعليق</th>
                          <th className="text-center">النوع</th>
                          <th className="text-center">إجراء</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activeBooking.service.comments.map((c, i) => (
                          <tr key={c.pivot.id ?? `${c.id}-${i}`}>
                            <td>{i + 1}</td>
                            <td>{c.pivot.comment}</td>
                            <td className="text-center">
                              <span
                                className={`badge ${
                                  c.pivot.type == "positive"
                                    ? "bg-success"
                                    : "bg-danger"
                                }`}
                              >
                                {c.pivot.type}
                              </span>
                            </td>
                            <td className="d-flex gap-2">
                              <button
                                className="btn btn-sm btn-warning"
                                onClick={() => {
                                  setComment(c.comment);
                                  setCommentType(c.type);
                                }}
                              >
                                تعديل
                              </button>

                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => apiTourist.deleteComment(c.id)}
                              >
                                حذف
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="text-center text-muted">لا توجد تعليقات</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
