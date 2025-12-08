import React, { useState } from 'react'
import AdminHeader from '../../components/admin/AdminHeader'
import AdminSidebar from '../../components/admin/AdminSidebar'
import SharedFooter from '../../components/Shared/SharedFooter'
import { Outlet } from 'react-router-dom'

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)  

  return (
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column'}} dir="rtl">
      <AdminHeader  onToggleSidebar={()=>setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen}/>

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
