import './adminSidebar.css'
import {  NavLink } from "react-router-dom";

const AdminSidebar = ({  
  collapsed = false,
}) => {
  const items = [
    {  label: "لوحة القيادة", icon: "🏠" , path:"/admin"},
    {  label: "تصنيف الخدمات", icon: "🧾" ,  path:"categories"},
    { label: "إدارة التفضيلات", icon: "💜" , path:"preferences/favor"},
    { label: "إدارة الحالات الصحية", icon: "👩‍⚕️" ,path:"preferences/medical"},
    { label: "إدارة المزودين", icon: "👥" ,path:"providers"},
    // { label: " إعدادات المنصة", icon: "⚙️" ,path:"/#"},
  ];

  return (
    <aside
      className="admin-sidebar"
      dir="rtl"
      style={{ display: collapsed ? "none" : "block" }}
    >
      <nav>
        <ul>
          {items.map((i , index) => (
            <li key={index} >             
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
