import React from 'react'
import { logout as apiLogout } from "../../services/auth";

const AdminHeader = ({ onLogout, onToggleSidebar }) => {
  const username = 'Admin User';
  const projectName = 'مشروع سياحي ذكي';
  const logoutFn = onLogout || apiLogout
  const toggle = onToggleSidebar || (()=>{})
  const open = typeof onToggleSidebar === 'function' ? (typeof window !== 'undefined' && window.sidebarOpen) : undefined

  // prefer explicit prop if provided
  const icon = (typeof arguments !== 'undefined' && typeof arguments[0] === 'object' && arguments[0]?.sidebarOpen) ? (arguments[0].sidebarOpen ? '◀' : '☰') : '◀'

  return (
    <header className="admin-header" dir="rtl">
      <div className="controls">
        <button className="btn btn-success" onClick={toggle} aria-label="toggle-sidebar" title="إظهار/إخفاء الشريط الجانبي">{icon}</button>
        <div style={{fontWeight:700}}>{username}</div>
        <button className="btn logout" onClick={logoutFn}>تسجيل خروج</button>
      </div>

      <div className="brand">
        <div style={{fontWeight:700,fontSize:18}}>{projectName} إدارة</div>
      </div>
    </header>
  )
}

export default AdminHeader
