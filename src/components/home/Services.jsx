import './Services.css';

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
          <h1 className="main-title" data-aos="fade-up">الخدمات الرئيسية </h1>
        </div>
        <div className="row g-5 align-items-center text-center">
            {servicesData.map((service, index) => (
          <div key={index} className="col-lg-4" data-aos="zoom-in-left" data-aos-delay={index * 200}>
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
