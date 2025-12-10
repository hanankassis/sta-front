import React from 'react'
import './SharedFooter.css'
export default function SharedFooter() {
  return (
     <footer id="footer" className="container-fluid text-white-50 footer pt-5">
        <div className="container">
            <div className="footer-grid pb-3">
                <div className="footer-section">
                    <h4>عن المنصة</h4>
                    <p>منصة مساعد سياحي ذكي تتيح لك التعرف على أجمل المعالم السياحية في سوريا </p>
                </div>

                <div className="footer-section">
                    <h4>روابط سريعة</h4>
                    <ul>
                        <li><a href="home">الرئيسية</a></li>
                        <li><a href="offer">العروض</a></li>
                        <li><a href="services">الخدمات</a></li>
                        <li><a href="contact">اتصل بنا</a></li>
                    </ul>
                </div>                

                <div className="footer-section">
                    <h4>تواصل معنا</h4>
                    <p>
                        <i className="fa fa-map-marker ms-3"></i> 
                        <a href=""> العنوان</a>
                    </p>

                    <p>
                        <i className="fa fa-phone"></i>
                        <a href="tel:+963-xx-xxxx-xxxx"> +963-xx-xxxx-xxxx</a>
                    </p>
                    <p>
                        <i className="fa fa-envelope"></i>
                        <a href="mailto:info@sta.com"> info@sta.com </a>
                    </p>
                    <div className="social-links">
                        <a href="#"><i className="fa fa-facebook"></i></a>
                        <a href="#"><i className="fa fa-whatsapp"></i></a>
                        <a href="#"><i className="fa fa-instagram"></i></a>
                        <a href="#"><i className="fa fa-linkedin"></i></a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p className='my-0 py-4'>  منصة STA - 2025 جميع الحقوق محفوظة  &copy; </p>
            </div>
        </div>
    </footer>

  )
}

