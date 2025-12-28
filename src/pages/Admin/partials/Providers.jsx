
import { useEffect, useState } from "react";
import MySpinner from "../../../components/Shared/MySpinner";
import { admin as apiAdmin } from "../../../services/api";
import modals from '../../../services/modals';
import MapComponent from "../../../components/Shared/MapComponent";
import { useParams } from "react-router-dom";

export default function Providers() {
  // const accepted = useParams("accepted");
  const {accepted} = useParams();
  // console.log(accepted , "component")
  const [loading, setLoading] = useState(false); 
  const [saving, setSaving] = useState(false);
  const [Providers, setProviders] = useState([]);
  

  async function handleToggle( providerId) {
    setSaving(true);
     const {result,  text} = await apiAdmin.acceptProvider(providerId);  
     if(result){
      setProviders((prev) =>
          prev.filter(s => (s.id !== providerId) )
      );
    } else  
        modals.error (text);

    setSaving(false);
  }

    useEffect( () => {
     async function loadProvider(accepted) {
      setLoading(true);
      const  {  result, data, text }  = await apiAdmin.list(accepted);      
      if (result)        
          setProviders(Array.isArray(data) ? data : []);
        else 
          modals.error(text);        
        setLoading(false);
      }    

    loadProvider(accepted);
  }, []);

  return (
    <section>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h4 style={{ margin: 0 }}>إدارة مزودي الخدمة</h4>
      </div>

      

      <div style={{ marginTop: 12 }}>
        <div
          style={{
            background: "#fff",
            borderRadius: 8,
            overflow: "auto",
            position: "relative",
          }}
        >
          {(loading || saving) &&  <MySpinner/>}
          <table className="table">
            <thead>
              <tr>
                <th>الاسم</th>
                <th>الوصف</th>
                <th>الصورة</th>
                <th>الموقع</th>
                <th>الحالة</th>
                <th style={{ width: 180 }}>إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {Providers.map((s) => (
                <tr key={s.id}>
                  <td>{s.name}</td>
                  <td>{s.description}</td>
                  <td><img src={s.image} alt="" width="200" height="150"/></td>
                  <td> <MapComponent lat={s.lat} lng={s.lng} /></td>
                  <td>{s.accepted ? 'مشترك' : 'قيد الانتظار' } {s.accepted}</td>
                  <td>
                    <button
                      onClick={() => handleToggle(s.id)}
                      className= {`btn ${s.accepted?'btn-danger':'btn-success-light '}  ms-2`}
                    >
                     { saving?  'جاري القبول':'قبول'} 
                    </button>                    
                  </td>
                </tr>
              ))}
              {Providers.length === 0 && !loading && (
                <tr>
                  <td colSpan={2} className="empty-state">
                    لا توجد بيانات
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};