import React, { useEffect, useState } from "react";
import { admin, categories } from "../../../services/api";
import MySpinner from "../../../components/Shared/MySpinner";

const StatCard = ({ label, value, icon, color }) => (
  <div className={`admin-card text-${color} `}>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div className="label">{label}</div>
      <div className="admin-icon">
        <i className={`fa fa-${icon}`}></i>
      </div>
    </div>
    <div className="value" style={{ marginTop: 8 }}>
      {value}
    </div>
  </div>
);

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [totals, settotals] = useState({
    categories: 0,
    tourists: 0,
    providers: 0,
    bookings: 0,
  });
  useEffect(() => {
    async function getTotals() {
      setLoading(true);
      const { data } = await admin.totals();
      console.log(data);
      settotals(data);
      setLoading(false);
    }
    getTotals();
  }, []);
  return(
  <>
    {loading ? (
      <MySpinner />
    ) : (
      <section>
        <i className="fa-solid fa-basket-shopping"></i>
        <div className="admin-cards">
          <StatCard
            label="الخدمات"
            value={totals.categories}
            icon="gratipay"
            color="success"
          />
          <StatCard
            label="السياح"
            value={totals.tourists}
            icon="person"
            color="danger"
          />
          <StatCard
            label="مقدمو الخدمة"
            value={totals.providers}
            icon="users"
            color="warning"
          />
          <StatCard
            label="الحجوزات"
            value={totals.bookings}
            icon="gg"
            color="primary"
          />
        </div>
      </section>
    )}
  </>)
};

export default Home;
