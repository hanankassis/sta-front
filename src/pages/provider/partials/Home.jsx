import React from 'react'

const StatCard = ({ label, value, icon , color}) => (
  <div className={`admin-card text-${color} `}>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <div className="label">{label}</div>
      <div className='admin-icon'><i className={`fa fa-${icon}`}></i></div>
    </div>
    <div className="value" style={{marginTop:8}}>{value}</div>
  </div>
)

const Home = ({ serviceCount = 10, tourists = 120, providers = '45' , bookings = 34 }) => {
  return (
    <section>
      <i class="fa-solid fa-basket-shopping"></i>
      <div className="admin-cards"> 
        <StatCard label="الخدمات" value={serviceCount} icon="gratipay" color="success"/>
        <StatCard label="السياح" value={tourists} icon="person" color="danger"/>
        <StatCard label="مقدمو الخدمة" value={providers} icon="users" color="warning"/>
        <StatCard label="الحجوزات" value={bookings} icon="gg" color="primary"/>
      </div>
    </section>
  )
}

export default Home
