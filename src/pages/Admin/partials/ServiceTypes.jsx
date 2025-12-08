import React, { useState, useEffect } from 'react'
import { categories } from '../../../services/api'

const ServiceTypes = () => {
    const [serviceTypes, setServiceTypes] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [formName, setFormName] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  useEffect(()=>{
    async function load(){
      setLoading(true);
      try{
        const data = await categories.list();
          // expect data to be an array of categories
          setServiceTypes(Array.isArray(data) ? data : [])
      }catch(err){
        console.error(err)
        setError(err.message || 'خطأ في تحميل البيانات')
      }finally{
        setLoading(false);
      }
    }
    load();
  }, []);

  function handleAddClick(){
    setEditingId(null)
    setFormName('')
    setShowForm(true)
  }

  async function handleSave(){
    if(!formName.trim()) return
    setSaving(true)
    try{
      //تعديل
      if(editingId){
        const updated = await categories.update(editingId, { name: formName })
        setServiceTypes(prev=> prev.map(s=> s.id===editingId ? {...s,...updated} : s))
        alert('تم التعديل بنجاح')
        // إضافة جديد
      } else {
        const created = await categories.create({ name: formName })
        // prepend created (backend should return created record)
        setServiceTypes(prev=> [created, ...prev])
        alert('تم الإضافة بنجاح')
      }
      setShowForm(false)
      setFormName('')
      setEditingId(null)
    }catch(err){
      console.error(err)
      alert(err.message || 'خطأ أثناء الحفظ')
    }finally{
      setSaving(false)
    }
  }

  function handleEdit(item){
    setEditingId(item.id)
    setFormName(item.name)
    setShowForm(true)
  }

  async function handleDelete(item){
    if(!window.confirm('هل أنت متأكد من الحذف؟')) return
    setLoading(true)
    try{
      await categories.remove(item.id)
      setServiceTypes(prev=> prev.filter(p=> p.id!==item.id))
      alert('تم الحذف')
    }catch(err){
      console.error(err)
      alert(err.message || 'خطأ أثناء الحذف')
    }finally{
      setLoading(false)
    }
  }

  return (
    <section>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <h4 style={{margin:0}}>إدارة أنواع الخدمات</h4>
        <div>
          <button onClick={handleAddClick} className="btn btn-success">إضافة نوع خدمة</button>
        </div>
      </div>

      {showForm && (
        <div style={{marginTop:12,background:'#fff',padding:12,borderRadius:8}}>
          <div className="form-inline">
            <input className="" value={formName} onChange={e=>setFormName(e.target.value)} placeholder="اسم نوع الخدمة" />
            <button onClick={handleSave} className="btn btn-success" disabled={saving}>{saving? 'جاري الحفظ...' : 'حفظ'}</button>
            <button onClick={()=>{setShowForm(false); setFormName(''); setEditingId(null)}} className="btn btn-ghost">إلغاء</button>
          </div>
        </div>
      )}

      <div style={{marginTop:12}}>
        <div style={{background:'#fff',borderRadius:8,overflow:'auto',position:'relative'}}>
          {loading && <div style={{position:'absolute',inset:0,background:'rgba(255,255,255,0.6)',display:'flex',alignItems:'center',justifyContent:'center'}}>جارٍ التحميل...</div>}
          <table className="table">
            <thead>
              <tr>
                <th>الاسم</th>
                <th style={{width:180}}>إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {serviceTypes.map(s=> (
                <tr key={s.id}>
                  <td>{s.name}</td>
                  <td>
                    <button onClick={()=>handleEdit(s)} className="btn btn-success ms-2">تعديل</button>
                    <button onClick={()=>handleDelete(s)} className="btn btn-danger" style={{marginLeft:8}}>حذف</button>
                  </td>
                </tr>
              ))}
              {serviceTypes.length===0 && !loading && (
                <tr><td colSpan={2} className="empty-state">لا توجد بيانات</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default ServiceTypes
