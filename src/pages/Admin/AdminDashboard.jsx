import React, { useState } from 'react'
import AdminHeader from '../../components/admin/AdminHeader'
import AdminSidebar from '../../components/admin/AdminSidebar'
import SharedFooter from '../../components/Shared/SharedFooter'
import { Outlet } from 'react-router-dom'

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)


  // service CRUD handled in ServiceTypesPage via setServiceTypes

  function handleLogout(){
    // placeholder - integrate real logout
    alert('تسجيل خروج')
  }

  return (
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column'}} dir="rtl">
      {/* <AdminHeader onLogout={handleLogout} onToggleSidebar={()=>setSidebarOpen(s=>!s)} sidebarOpen={sidebarOpen} /> */}
      <AdminHeader  onToggleSidebar={()=>setSidebarOpen(s=>!s)}/>

      <div className="admin-layout">
        <AdminSidebar collapsed={!sidebarOpen} />

        <main className="admin-main">
          <Outlet/>
        </main>
      </div>

      <SharedFooter />
    </div>
  )
}
