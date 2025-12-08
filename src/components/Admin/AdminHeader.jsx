import { logout, currentUser as username } from "../../services/auth";
import { useNavigate } from 'react-router-dom';

const AdminHeader = ({onToggleSidebar, sidebarOpen}) => {
  const projectName = 'مشروع سياحي ذكي';
  const navigator = useNavigate();  

  const logoutFn = () => {
    logout();
    navigator('/');
  }

  return (
    <nav className="admin-header" dir="rtl">      
      <div className="brand">
        <button className="btn btn-success-light" onClick={onToggleSidebar} aria-label="toggle-sidebar" title="إظهار/إخفاء الشريط الجانبي">
        {sidebarOpen?
        (<i className='fa fa-arrow-left'></i>) :
        (<i className='fa fa-arrow-right'></i>)}
        </button>
        <h1 className='title'>{projectName} إدارة</h1>
      </div>
      
      <div className="controls">
      
        <div style={{fontWeight:700}}>{username()}</div>
        <button className="btn logout" onClick={logoutFn}>تسجيل خروج</button>
      </div>
    </nav>
  )
}

export default AdminHeader
