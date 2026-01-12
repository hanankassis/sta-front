const ContactUs = () => {
    return (
    <div className="radial main-container d-flex justify-content-center align-items-center ">
      <div className="container contact-us mt-5">
        <h3 className="mb-3  text-center mt-2">
          يمكنك التواصل معنا عبر الفنوات التالية
        </h3>
        <div className="fs-5 w-25 mx-auto">
          <p>
            <i className="fa fa-map-marker ms-3 text-warning"></i>
            <a href="https://maps.app.goo.gl/oLza6b9Np6uM5VEg9?g_st=ipc">
              العنوان
            </a>
          </p>

          <p>
            <i className="fa fa-phone text-warning ms-3"></i>
            <a href="tel:+966 55 008 0315"> +966 55 008 0315</a>
          </p>
          <p>
            <i className="fa fa-envelope text-warning ms-3"></i>
            <a href="mailto:info@sta.com"> info@sta.com </a>
          </p>
          <p>
            <i className="fa fa-twitter text-warning ms-3"></i>
            <a href="https://x.com/Dreamtrips_sa"> منصة اكس</a>
          </p>
          <p>
            <i className="fa fa-whatsapp text-warning ms-3"></i>
            <a href="https://wa.me/9660550080315"> واتساب </a>
          </p>
          <p>
            <i className="fa fa-instagram text-warning ms-3"></i>
            <a href="https://www.instagram.com/dreamtrips.sa?igsh=MTJpZ2Z1MW4xcDc5aQ==">
              انستغرام
            </a>
          </p>
          <p>
            <i className="fa fa-snapchat text-warning ms-3"></i>
            <a href="https://www.snapchat.com/add/Dreamtrips.sa">سناب شات</a>
          </p>
        </div>
      </div>
    </div>  
  );
};

export default ContactUs;
