import { useEffect, useState } from "react";
import { tourist as apiTourist } from "../../../services/api";
import modals from "../../../services/modals";

export default function StartTrip() {
  const [providers, setProviders] = useState([]);
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
                                onClick={() => bookService(service.id)}
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
    </div>
  );
}
