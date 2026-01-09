import { Link, NavLink } from "react-router-dom";

const ProviderBar = () => {
  const items = [
    {  label: "الصفحة الرئيسية", icon: "🏠" , path:"/provider"},
    {  label: "إدارة الخدمات", icon: "🍀" ,  path:"services"},
    {  label: "إدارة الروابط", icon: "🏹" ,  path:"apis"},
    {  label: "استعراض التعليقات", icon: "📝" ,  path:"comments"},
    {  label: "استعراض التقييمات", icon: "⚖" ,  path:"rates"},
  ];

  return (    
      <nav>
        <ul className="d-flex justify-content-evenly mt-2 align-items-stretch">
          {items.map((i,index) => (
            <li key={index} className="card p-1 text-center" style={{ width:"200px" }}>             
              <NavLink to={i.path} className="btn h-100 bg-success-subtle provider-btn" end >
                <div style={{ marginLeft: 8 }}>{i.icon}</div>
                <div>{i.label}</div>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
  );
};

export default ProviderBar;
