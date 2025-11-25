import { logout, currentUser as username } from "../../services/auth";
import { useNavigate } from 'react-router-dom';

const AdminHeader = ({onToggleSidebar}) => {
  const projectName = 'مشروع سياحي ذكي';
  const toggle = onToggleSidebar || (()=>{})
  const navigator = useNavigate();  
  // const open = typeof onToggleSidebar === 'function' ? (typeof window !== 'undefined' && window.sidebarOpen) : undefined

  const logoutFn = () => {
    logout();
    navigator('/');
  }

  // prefer explicit prop if provided
  // const icon = (typeof arguments !== 'undefined' && typeof arguments[0] === 'object' && arguments[0]?.sidebarOpen) ? (arguments[0].sidebarOpen ? '◀' : '☰') : '◀'

  return (
    <nav className="admin-header" dir="rtl">      
      <div className="brand">
        <button className="btn btn-success" onClick={toggle} aria-label="toggle-sidebar" title="إظهار/إخفاء الشريط الجانبي"><i className='fa fa-arrow-left'></i></button>
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
