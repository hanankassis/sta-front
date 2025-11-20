import { useNavigate, Link } from "react-router-dom";
import { currentUser, logout as apiLogout } from "../../services/auth";

export default function HomeNav() {
  const navigate = useNavigate();
  const user = currentUser();

  const handleLogout = () => {
    apiLogout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg  fixed-top  fs-5">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse text-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#">
                الخدمات
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                العروض
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                اتصل بنا
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                الشكاوى
              </a>
            </li>
          </ul>
        </div>
        <ul className="navbar-nav align-items-center  ">
          <li className="nav-item">
            <input
              className="form-control form-control ms-5"
              placeholder="بحث عن خدمة"
            />
          </li>
          {user ? (
            <li className="nav-item dropdown me-5">
              <a
                className="nav-link dropdown-toggle"
                href="#"  
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {user}
              </a>
              <ul className="dropdown-menu  bg-success-dark">
                <li>
                  <Link className="dropdown-item" to="#">
                    الملف الشخصي
                  </Link>
                </li>                
                <li>
                  <Link className="dropdown-item " to="/admin">
                    إدارة الموقع
                  </Link>
                </li>                
                
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button className="nav-link mx-auto" onClick={handleLogout}>
                    تسجيل خروج
                  </button>
                </li>
              </ul>
            </li>
          ) : (
            <li className="nav-item d-flex">
              <>
                <Link to="/login" className="nav-link">
                  تسجيل دخول
                </Link>
                <Link to="/register" className="nav-link">
                  إتشاء حساب
                </Link>
              </>
            </li>
          )}
          <li>
            <Link className="navbar-brand" to="/">
              <img src="/logo.png" alt="sta-logo" width="80" />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
