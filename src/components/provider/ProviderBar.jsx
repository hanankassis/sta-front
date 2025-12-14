import React from "react";
import { Link, NavLink } from "react-router-dom";

const ProviderBar = () => {
  const items = [
    {  label: "الصفحة الرئيسية", icon: "🏠" , path:"/provider"},
    {  label: "إدارة الخدمات", icon: "🍀" ,  path:"services"},
    {  label: "إدارة الروابط", icon: "🏹" ,  path:"apis"},
    {  label: "إدارة الإشعارات", icon: "🔔" ,  path:"notification"},
    {  label: "استعراض التعليقات", icon: "📝" ,  path:"comments"},
    {  label: "استعراض التقييمات", icon: "⚖" ,  path:"rates"},
  ];

  return (    
      <nav>
        <ul className="d-flex justify-content-evenly mt-2">
          {items.map((i,index) => (
            <li key={index} className="card p-1 text-center">             
              <NavLink to={i.path} className="btn bg-success-subtle provider-btn" end >
                <span style={{ marginLeft: 8 }}>{i.icon}</span>
                <span>{i.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
  );
};

export default ProviderBar;
