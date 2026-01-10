import { useEffect, useState } from "react";
import "./Services.css";
import { categories as apiCategories } from "../../services/api";
import modals from "../../services/modals";

export default function Services() {
  const [servicesData, setServicesData] = useState([]);
  useEffect(() => {
    async function loadDervicesData() {
      const { result, text, data } = await apiCategories.topLevel();
      if (result) setServicesData(data);
      else modals.error(text);
    }
    loadDervicesData();
  });
  return (
    <div id="services" className="container-fluid">
      <div className="container ">
        <div className="text-center">
          <h1 className="main-title" data-aos="fade-up">
            الخدمات الرئيسية{" "}
          </h1>
        </div>
        <div className="row g-5 align-items-center text-center">
          {servicesData.map((service, index) => (
            <div
              key={index}
              className="col-lg-4"
              data-aos="zoom-in-left"
              data-aos-delay={index * 200}
            >
              <div className="card">
                <h3>{service.name} </h3>
                <div data-aos="zoom-in-up" data-aos-delay={index * 200}>
                  <p className="mt-3 mb-1">عدد الخدمات </p>
                  <div className="service-count rounded-circle  bg-success text-white">                    
                    {service.children_recursive_count}{" "}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
