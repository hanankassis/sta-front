import React from "react";

const servicesData = [
  {
    icon: "fa-building",
    title: "سياحة ترفيهية",
    description: "اشتكشف معنا أجمل أماكن الطبيعة الخلابة"
  },
  {
    icon: "fa-compass",
    title: "سياحة علاجية ",
    description: "أسعار منافسة وأطباؤء بارعون",
  },{
    icon: "fa-list",
    title: "سياحة ترفيهية وعلاحية",
    description: "ننسق لك برنامجاً  يساعدك في التعافي",
  }
];
export default function Services() {
  return (
    <div id="services" className="container-fluid">
      <div className="container ">
        <div className="text-center">
          <h2 className="mb-5">الخدمات الرئيسية </h2>
        </div>
        <div className="row g-5 align-items-center text-center">
            {servicesData.map((service, index) => (
          <div className="col-lg-4">
            <div className="card">
              
              <h3>{service.title} </h3>
              <p className="mb-5">
                {service.description}
              </p>
              <span className="icon">
                <i className={`fa ${service.icon} fa-5x mb-4`}></i>
              </span>
            </div>
          </div>       
            ))}            
        </div>
      </div>
    </div>
  );
}
