import React from 'react'

const StatCard = ({ label, value, icon }) => (
  <div className="admin-card">
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <div className="label">{label}</div>
      <div style={{fontSize:22}}><i className={`fa fa-${icon}`}></i></div>
    </div>
    <div className="value" style={{marginTop:8}}>{value}</div>
  </div>
)

const Home = ({ serviceCount = 10, tourists = 120, providers = '45' , bookings = 34 }) => {
  return (
    <section>
      <h2 style={{marginTop:0}}>لوحة القيادة</h2>
      <div className="admin-cards">
        <StatCard label="الخدمات" value={serviceCount} icon="gratipay" />
        <StatCard label="السياح" value={tourists} icon="users" />
        <StatCard label="مقدمو الخدمة" value={providers} icon="scribd" />
        <StatCard label="الحجوزات" value={bookings} icon="stumbleupon" />
      </div>
    </section>
  )
}

export default Home
