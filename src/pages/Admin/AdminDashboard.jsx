import React, { useState } from 'react'
import AdminHeader from '../../components/Admin/AdminHeader'
import AdminSidebar from '../../components/Admin/AdminSidebar'
import SharedFooter from '../../components/Shared/SharedFooter'
import AdminHome from './partials/AdminHome'
import ServiceTypesPage from './partials/ServiceTypesPage'

export default function AdminDashboard() {
  const [view, setView] = useState('home')
  const [serviceTypes, setServiceTypes] = useState([])
  const [sidebarOpen, setSidebarOpen] = useState(true)

  function handleSelect(key){
    setView(key)
  }

  // service CRUD handled in ServiceTypesPage via setServiceTypes

  function handleLogout(){
    // placeholder - integrate real logout
    alert('تسجيل خروج')
  }

  return (
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column'}} dir="rtl">
      <AdminHeader onLogout={handleLogout} onToggleSidebar={()=>setSidebarOpen(s=>!s)} sidebarOpen={sidebarOpen} />

      <div className="admin-layout">
        <AdminSidebar onSelect={handleSelect} active={view} collapsed={!sidebarOpen} />

        <main className="admin-main">
          {view === 'home' && (
            <AdminHome serviceCount={serviceTypes.length} />
          )}

          {view === 'serviceTypes' && (
            <ServiceTypesPage serviceTypes={serviceTypes} setServiceTypes={setServiceTypes} />
          )}
        </main>
      </div>

      <SharedFooter />
    </div>
  )
}
