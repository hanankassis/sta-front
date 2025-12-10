import './adminSidebar.css'
import {  NavLink } from "react-router-dom";

const AdminSidebar = ({  
  collapsed = false,
}) => {
  const items = [
    { key: "home", label: "لوحة القيادة", icon: "🏠" , path:"/admin"},
    { key: "serviceTypes", label: "تصنيف الخدمات", icon: "🧾" ,  path:"categories"},
    { key: "preferences", label: "إدارة التفضيلات", icon: "💜" ,path:"preferences"},
    { key: "providers", label: "إدارة المزودين", icon: "👥" ,path:"providers"},
    { key: "settings", label: " إعدادات المنصة", icon: "⚙️" ,path:"/#"},
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
