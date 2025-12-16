import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../../services/api";

import { countries as apiCountries } from "../../../services/api";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import MyInput from "../../../components/form/MyInput";
import Radio from "../../../components/form/Radio";
import modals from "../../../services/modals";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [countryOptions, setCountryOptions] = useState([]);
  const navigate = useNavigate();
  const [validationErrors, setValidationErrors] = useState([]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    type: "tourist", // Default to tourist
    DOB: "",
    gender: "M",
    country_id: null, // For react-select, it's an object
    description: "", // For provider
    image_id: null, // For provider
  });

  const userTypes = [
    { label: "سائح", value: "tourist" },
    { label: "مزود خدمة", value: "provider" },
  ];
  const genders = [
    { label: "ذكر", value: "M" },
    { label: "أنثى", value: "F" },
  ];
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] || null });
  };
  
  const handleSelectChange = (selectedOption, { name }) => {
    setFormData({ ...formData, [name]: selectedOption });
  };

  /********* Submit ***********/
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setValidationErrors({});

    const fd = new FormData();
    fd.append("country_id", formData.country_id?.value ?? null);
    for (const key in formData) {
      if (key !== "country_id") {
        fd.append(key, formData[key]);
      }
    }

    const { status, result, data, text } = await auth.register(formData);
    if (result) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("name", data.name);
      localStorage.setItem("type", data.type);
      if (data.type == "admin") navigate("/admin");
      else if (data.type == "provider") navigate("/provider");
      else navigate("/");
    } else if (status == 422) {
      modals.error("البيانات غير صحيحة");
      setValidationErrors(data);
    } else modals.error(text);

    setLoading(false);
  };

  useEffect(() => {
    async function load() {
      try {
        const countries = await apiCountries();
        // console.log(countries);
        setCountryOptions(countries);
      } catch (err) {
        console.error(err);
        setError(err.message || "خطأ في تحميل البيانات");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="auth-form d-flex justify-content-center align-items-center  ">
      <form onSubmit={handleSubmit} className="w-50 p-4 mb-5 text-white mt-7">
        <h3 className="text-secondary text-center">إنشاء حساب</h3>

        <MyInput
          type="email"
          placeholder="البريد الالكتروني"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={validationErrors.email}
        />
        <MyInput
          type="password"
          placeholder=" كلمة السر"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={validationErrors.password}
        />
        <MyInput
          placeholder="الاسم"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={validationErrors.name}
        />
        <Radio
          label="نوع المستخدم"
          tuples={userTypes}
          name="type"
          formDataValue={formData.type}
          onChange={handleChange}
        />

        {formData.type === "tourist" ? (
          <>
            <MyInput
              placeholder="تاريخ الوالدة"
              type="date"
              name="DOB"
              value={formData.DOB}
              onChange={handleChange}
              error={validationErrors.DOB}
            />

            <Radio
              label="الجنس"
              tuples={genders}
              name="gender"
              formDataValue={formData.gender}
              onChange={handleChange}
            />
            <div className="mb-3">
              <div className="text-bg-dark select-multiple">
                <Select
                  name="country_id"
                  value={formData.country_id}
                  options={countryOptions}
                  onChange={handleSelectChange}
                  isSearchable
                  placeholder="ابحث واختر مدينتك"
                />
              </div>
              {validationErrors.country_id && (
                <small className="text-warning">
                  {validationErrors.country_id}
                </small>
              )}
            </div>
          </>
        ) : (
          <div style={{ marginBottom: "10px" }}>
            <label>التفاصيل:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="اشرح عن خداماتك..."
              style={{ width: "100%", padding: "8px", minHeight: "80px" }}
            />
            <MyInput
              placeholder="حمل الصورة الأساسية"
              type="file"
              name="image_id"
              onChange={handleFileChange}
              error={validationErrors.image_id}
            />
            {validationErrors.description && (
              <small className="text-warning">
                {validationErrors.description}
              </small>
            )}
          </div>
        )}
        <div className="text-center">
          <button
            className="mt-3 btn btn-success-light"
            type="submit"
            disabled={loading}
          >
            {loading ? "[جاري إنشاء الجساب...]" : "إنشاء حساب "}
          </button>
          <Link className="me-2 mt-3 btn bg-success-subtle" to="/">
            عودة
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
