import React from 'react'

const StatCard = ({ label, value, emoji }) => (
  <div className="admin-card">
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <div className="label">{label}</div>
      <div style={{fontSize:22}}>{emoji}</div>
    </div>
    <div className="value" style={{marginTop:8}}>{value}</div>
  </div>
)

const AdminHome = ({ serviceCount = 0, users = 120, bookings = 34, revenue = '45,000 ₪' }) => {
  return (
    <section>
      <h2 style={{marginTop:0}}>لوحة القيادة</h2>
      <div className="admin-cards">
        <StatCard label="الخدمات" value={serviceCount} emoji="🧭" />
        <StatCard label="المستخدمون" value={users} emoji="👥" />
        <StatCard label="الحجوزات" value={bookings} emoji="📅" />
        <StatCard label="الإيرادات" value={revenue} emoji="💰" />
      </div>
    </section>
  )
}

export default AdminHome
