import { Link } from "react-router-dom";
import "./SharedFooter.css";
export default function SharedFooter() {
  return (
    <footer id="footer" className="container-fluid text-white-50 footer pt-5">
      <hr />
      <div className="container">
        <div className="footer-grid py-3">
          <div className="footer-section">
            <h4>عن المنصة</h4>
            <p>
              منصة مساعد سياحي ذكي تتيح لك التعرف على أجمل المعالم السياحية في
              سوريا
            </p>
          </div>

          <div className="footer-section">
            <h4>روابط سريعة</h4>
            <ul>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  الرئيسية
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="profile">
                  الخدمات
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="about">
                  عن المنصة
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="contact-us">
                  اتصل بنا
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>تواصل معنا</h4>            
            <p>
              <i className="fa fa-map-marker ms-3"></i>
              <a href="https://maps.app.goo.gl/oLza6b9Np6uM5VEg9?g_st=ipc">
                العنوان
              </a>
            </p>

            <p>
              <i className="fa fa-phone"></i>
              <a href="tel:+966 55 008 0315"> +966 55 008 0315</a>
            </p>
            <p>
              <i className="fa fa-envelope"></i>
              <a href="mailto:info@sta.com"> info@sta.com </a>
            </p>
            <div className="social-links">
              <a href="https://x.com/Dreamtrips_sa">
                <i className="fa fa-twitter"></i>
              </a>
              <a href="https://wa.me/9660550080315">
                <i className="fa fa-whatsapp"></i>
              </a>
              <a href="https://www.instagram.com/dreamtrips.sa?igsh=MTJpZ2Z1MW4xcDc5aQ==">
                <i className="fa fa-instagram"></i>
              </a>
              <a href="https://www.snapchat.com/add/Dreamtrips.sa">
                <i className="fa fa-snapchat"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="my-0 py-4">
            {" "}
            منصة STA - 2025 جميع الحقوق محفوظة &copy;{" "}
          </p>
        </div>
      </div>
    </footer>
  );
}
