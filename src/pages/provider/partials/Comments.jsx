
import { useEffect, useState } from "react";
import MySpinner from "../../../components/Shared/MySpinner";
import { comments as apiComments } from "../../../services/api";
import modals from '../../../services/modals';

export default function Comments() {
  // const accepted = useParams("accepted");
  // console.log(accepted , "component")
  const [loading, setLoading] = useState(false); 
  const [comments, setComments] = useState([]);
  

  
    useEffect( () => {
     async function loadComments(accepted) {
      setLoading(true);
      const  {  result, data, text }  = await apiAdmin.list(accepted);      
      if (result)        
          setcomments(Array.isArray(data) ? data : []);
        else 
          modals.error(text);        
        setLoading(false);
      }    

    loadComments();
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
        <h4 style={{ margin: 0 }}>تعليقات الزبائن</h4>
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
                <th>اسم الزبون</th>
                <th>التعليق</th>
                <th>التاريخ</th>
              </tr>
            </thead>
            <tbody>
              {comments.map((s) => (
                <tr key={s.id}>
                  <td>{s.name}</td>
                  <td>{s.description}</td>
                  
                  {/* <td>{s.accepted ? 'مشترك' : 'قيد الانتظار' } {s.accepted}</td> */}
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