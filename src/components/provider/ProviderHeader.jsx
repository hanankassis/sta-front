import { logout, currentUser as username } from "../../services/auth";
import { useNavigate } from 'react-router-dom';

const ProviderHeader = () => {  
  const navigator = useNavigate();  

  const logoutFn = () => {
    logout();
    navigator('/');
  }

  return (
    <nav className="admin-header" dir="rtl">      
      <div className="brand">
        <h1 className='title me-4'>اهلا بك {username}</h1>
      </div>
      
      <div className="controls">
      
        <div style={{fontWeight:700}}>{username()}</div>
        <button className="btn logout" onClick={logoutFn}>تسجيل خروج</button>
      </div>
    </nav>
  )
}

export default ProviderHeader
