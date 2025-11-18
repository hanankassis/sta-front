import React from 'react'

const AdminSidebar = ({ onSelect = () => {}, active = 'home', collapsed = false }) => {
  const items = [
    { key: 'home', label: 'لوحة القيادة', icon: '🏠' },
    { key: 'serviceTypes', label: 'أنواع الخدمات', icon: '🧾' },
    { key: 'providers', label: 'المزودون', icon: '👥' },
    { key: 'settings', label: 'الإعدادات', icon: '⚙️' }
  ]

  return (
    <aside className="admin-sidebar" dir="rtl" style={{display: collapsed ? 'none' : 'block'}}>
      <nav>
        <ul>
          {items.map(i=> (
            <li key={i.key}>
              <button className={`item ${i.key===active? 'active':''}`} onClick={()=>onSelect(i.key)}>
                <span style={{marginLeft:8}}>{i.icon}</span>
                <span>{i.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default AdminSidebar
