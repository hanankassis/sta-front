import {auth} from '../../services/api'
import { useNavigate } from 'react-router-dom';
import './adminNav.css';


const AdminNav = ({onToggleSidebar, sidebarOpen}) => {
  const projectName = 'مشروع سياحي ذكي';
  const navigator = useNavigate();  

  const logoutFn = () => {
    auth.logout();
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("type");
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
      
        <div>{auth.currentUser()}</div>        
        <button className="btn mx-5" onClick={logoutFn}>تسجيل خروج</button>
        <img src="/logo.png" alt="" width="50"/>

      </div>
    </nav>
  )
}

export default AdminNav
