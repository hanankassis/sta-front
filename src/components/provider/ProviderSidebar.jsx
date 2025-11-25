import React from "react";
import { Link, NavLink } from "react-router-dom";

const AdminSidebar = ({
  onSelect = () => {},
  active = "home",
  collapsed = false,
}) => {
  const items = [
    { key: "home", label: "الصفحة الرئيسية", icon: "🏠" , path:"/admin"},
    { key: "serviceTypes", label: "إدارة الخدمات", icon: "🧾" ,  path:"service-types"},
    { key: "providers", label: "المزودون", icon: "👥" ,path:"/#"},
    { key: "settings", label: "الإعدادات", icon: "⚙️" ,path:"/#"},
  ];

  return (
    <aside
      className="admin-sidebar"
      dir="rtl"
      style={{ display: collapsed ? "none" : "block" }}
    >
      <nav>
        <ul>
          {items.map((i) => (
            <li key={i.key} >             
              <NavLink to={i.path} className="btn item" end >
                <span style={{ marginLeft: 8 }}>{i.icon}</span>
                <span>{i.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
