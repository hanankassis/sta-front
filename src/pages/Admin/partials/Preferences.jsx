import React, { useState, useEffect } from "react";
import { preferences as apiPreferences } from "../../../services/api";
import Radio from "../../../components/form/Radio";
import MyInput from "../../../components/form/MyInput";


const Preferences = () => {
  const [preferences, setPreferences] = useState([]);
  const [showForm, setShowForm] = useState(false);
    
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    type: "favor",
  });

  const preferenceTypes = [
    { label: "رغبة", value: "favor" },
    { label: "صحة", value: "medical" },
  ];
  // load preferences on mount
  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const data = await apiPreferences.list();
        if (mounted) {
          // expect data to be an array of preferences
          setPreferences(Array.isArray(data) ? data : []); 
        }      
      } catch(err) {
        console.error(err);
        setError(err.message || "خطأ في تحميل البيانات");
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [setPreferences]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  function handleAddClick() {
    setEditingId(null);
    setFormData({ ...formData, name: "" });
    setShowForm(true);
  }  

  async function handleSave() {
    if (!formData.name.trim()) return;
    setSaving(true);
    try {
      //تعديل
      if (editingId) {
        const updated = await apiPreferences.update(editingId, { name: formData.name, type: formData.type });
        setPreferences((prev) =>
          prev.map((s) => (s.id === editingId ? { ...s, ...updated } : s))
        );
        alert("تم التعديل بنجاح");
        // إضافة جديد
      } else {
        const created = await apiPreferences.create({ name: formData.name, type: formData.type });
        // prepend created (backend should return created record)
        setPreferences((prev) => [created, ...prev]);
        alert("تم الإضافة بنجاح");
      }
      setShowForm(false);
      setFormData({...formData, name: ""});
      setEditingId(null);
    } catch (err) {
      console.error(err);
      alert(err.message || "خطأ أثناء الحفظ");
    } finally {
      setSaving(false);
    }
  }

  function handleEdit(item) {
    setEditingId(item.id);
    setFormData({name: item.name , type: item.type});
    setShowForm(true);
  }

  async function handleDelete(item) {
    if (!window.confirm("هل أنت متأكد من الحذف؟")) return;
    setLoading(true);
    try {
      await apiPreferences.remove(item.id);
      setPreferences((prev) => prev.filter((p) => p.id !== item.id));
      alert("تم الحذف");
    } catch (err) {
      console.error(err);
      alert(err.message || "خطأ أثناء الحذف");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h4 style={{ margin: 0 }}>إدارة المفضلات</h4>
        <div>
          <button onClick={handleAddClick} className="btn btn-success">
            إضافة مفضلة
          </button>
        </div>
      </div>

      {showForm && (
        <div
          style={{
            marginTop: 12,
            background: "#fff",
            padding: 12,
            borderRadius: 8,
          }}
        >
          <div className="form">            
            <MyInput
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="اسم المفضلة"
            />
            <Radio
                      label="نوع المفضلة"
                      tuples={preferenceTypes}
                      name="type"
                      formDataValue={formData.type}
                      onChange={handleChange}
                    />
            <button
              onClick={handleSave}
              className="btn btn-success ms-2"
              disabled={saving}
            >
              {saving ? "جاري الحفظ..." : "حفظ"}
            </button>
            <button
              onClick={() => {
                setShowForm(false);
                setFormName("");
                setEditingId(null);
              }}
              className="btn btn-ghost"
            >
              إلغاء
            </button>
          </div>
        </div>
      )}

      <div style={{ marginTop: 12 }}>
        <div
          style={{
            background: "#fff",
            borderRadius: 8,
            overflow: "auto",
            position: "relative",
          }}
        >
          {loading && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(255,255,255,0.6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              جارٍ التحميل...
            </div>
          )}
          <table className="table">
            <thead>
              <tr>
                <th>الاسم</th>
                <th>النوع</th>
                <th style={{ width: 180 }}>إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {preferences.map((s) => (
                <tr key={s.id}>
                  <td>{s.name}</td>
                  <td>{s.type}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(s)}
                      className="btn btn-success ms-2"
                    >
                      تعديل
                    </button>
                    <button
                      onClick={() => handleDelete(s)}
                      className="btn btn-danger"
                      style={{ marginLeft: 8 }}
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
              {preferences.length === 0 && !loading && (
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

export default Preferences;
