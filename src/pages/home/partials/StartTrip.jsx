import { useEffect, useState } from "react";
import { tourist as apiTourist } from "../../../services/api";
import modals from "../../../services/modals";
import MyInput from "../../../components/form/MyInput";

export default function StartTrip() {
  const [providers, setProviders] = useState([]);
  const [bookingData, setBookingData] = useState({
    start_date: "",
    end_date: "",
    quantity: null,
    service_id: null,
    service_name: "",
    note: "",
  });

  const bookService = (service) => {
    setBookingData((prev) => ({
      ...prev,
      service_id: service.id,
      service_name: service.name,
      start_date: "",
      end_date: "",
    }));
  };

  const submitBooking = async () => {
    const payload = {
      start_date: bookingData.start_date,
      end_date: bookingData.end_date,
      quantity: bookingData.quantity,
      note: bookingData.note,
      service_id: bookingData.service_id,
    };

    const { result, text } = await apiTourist.booking(payload);

    if (result) modals.success("تم الحجز بنجاح");
    else modals.error(text);
  };

  useEffect(() => {
    const loadProvider = async () => {
      const { result, data, text } = await apiTourist.matchProvider();
      if (result) setProviders(data);
      else modals.error(text);
    };
    loadProvider();
  }, []);
  return (
    <div className="container-fluid">
      <div className="main-container row justify-content-center align-items-center  ">
        <div className="accordion w-75 mx-auto" id="providersAccordion">
          <h5 className="text-white py-2">الوجهات المقترحة</h5>
          {providers.map((provider) => (
            <div className="accordion-item" key={provider.id}>
              {/* Header */}
              <h2 className="accordion-header" id={`heading-${provider.id}`}>
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse-${provider.id}`}
                >
                  <div className="d-flex justify-content-between w-100">
                    <strong>{provider.name}</strong>
                  </div>
                </button>
              </h2>

              {/* Body */}
              <div
                id={`collapse-${provider.id}`}
                className="accordion-collapse collapse"
                data-bs-parent="#providersAccordion"
              >
                <div className="accordion-body">
                  <div className="my-2">{provider.title}</div>
                  {provider.services.length === 0 ? (
                    <p className="text-muted">لا توجد خدمات</p>
                  ) : (
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>الخدمة</th>
                          <th>الإجراء</th>
                        </tr>
                      </thead>
                      <tbody>
                        {provider.services.map((service) => (
                          <tr key={service.id}>
                            <td>{service.name}</td>
                            <td>
                              <button
                                className="btn btn-success btn-sm"
                                data-bs-toggle="modal"
                                data-bs-target="#bookingModal"
                                onClick={() => bookService(service)}
                              >
                                حجز
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="modal fade" id="bookingModal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header position-relative">
              <h5 className="modal-title"> حجز جديد</h5>
              <button
                className="btn-close position-absolute"
                style={{ left: "10px", top: "20px" }}
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body">
            <label htmlFor="">عنوان الخدمة</label>
              <MyInput
                name="service_name"
                placeholder="الخدمة"
                value={bookingData.service_name}
                onChange={() => {}}
              />
            
            <label htmlFor="">تاريخ البداية</label>
              <MyInput
                type="date"
                name="start_date"
                placeholder="تاريخ البداية"
                value={bookingData.start_date}
                onChange={(e) =>
                  setBookingData((prev) => ({
                    ...prev,
                    start_date: e.target.value,
                  }))
                }
              />
            <label htmlFor="">تاريخ النهاية</label>
              <MyInput
                type="date"
                name="end_date"
                placeholder="تاريخ النهاية"
                value={bookingData.end_date}
                onChange={(e) =>
                  setBookingData((prev) => ({
                    ...prev,
                    end_date: e.target.value,
                  }))
                }
              />

              <MyInput
                type="number"
                name="quantity"
                placeholder="الكمية"
                value={bookingData.quantity}
                onChange={(e) =>
                  setBookingData((prev) => ({
                    ...prev,
                    quantity: Number(e.target.value),
                  }))
                }
              />

              {/* textarea يبقى منفصل (أفضل) */}
              <div className="mb-3">
                <textarea
                  className="form-control"
                  placeholder="ملاحظات"
                  value={bookingData.note}
                  onChange={(e) =>
                    setBookingData((prev) => ({
                      ...prev,
                      note: e.target.value,
                    }))
                  }
                  rows={3}
                />
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-success"
                  onClick={submitBooking}
                  data-bs-dismiss="modal"
                >
                  تأكيد الحجز
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
