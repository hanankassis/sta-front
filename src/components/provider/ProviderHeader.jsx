import { auth } from "../../services/api";
import { useNavigate } from 'react-router-dom';
import './ProviderHeader.css';

const ProviderHeader = () => {  
  const navigator = useNavigate();  

  const logoutFn = () => {
    auth.logout();
    navigator('/');
  }

  return (
    <nav className="admin-header" dir="rtl">      
      <div className="brand">
        <h1 className='title me-4'>اهلا بك {username}</h1>
      </div>
      
      <div className="controls">
      
        <div style={{fontWeight:700}}>{auth.currentUser}</div>
        <button className="btn btn-outline-secondary" onClick={logoutFn}>تسجيل خروج</button>
        <img src="/logo.png" alt="" width="50"/>

      </div>
    </nav>
  )
}

export default ProviderHeader
