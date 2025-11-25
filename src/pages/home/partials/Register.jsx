import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { register as apiRegister } from "../../../services/auth";
import { countries as apiCountries } from "../../../services/api";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import MyInput from "../../../components/form/MyInput";
import Radio from "../../../components/form/Radio";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [countryOptions, setCountryOptions] = useState([]);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    type: "tourist", // Default to tourist
    DOB: "",
    gender: "M",
    country_id: null, // For react-select, it's an object
    description: "", // For provider
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

  const handleSelectChange = (selectedOption, { name }) => {
    setFormData({ ...formData, [name]: selectedOption });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(formData);
    formData.country_id = formData.country_id ? formData.country_id.value : null;
    console.log(formData);
    try {
      const data = await apiRegister(formData);
      if (data.type == "admin") navigate("/admin");
      else if (data.type == "provider") navigate("/provider");
      else navigate("/");
    } catch (err) {
      alert("register failed: " + err.message);
    } finally {
      setLoading(false);
    }
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
    <div className="auth-form d-flex justify-content-center align-items-center ">
      <form onSubmit={handleSubmit} className="w-50 p-4 mb-5 mt-100 text-white">
        <h3 className="text-secondary text-center">إنشاء حساب</h3>

        <MyInput
          type="email"
          placeholder="البريد الالكتروني"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <MyInput
          type="password"
          placeholder=" كلمة السر"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <MyInput
          placeholder="الاسم"
          name="name"
          value={formData.name}
          onChange={handleChange}
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
            />

            <Radio
              label="الجنس"
              tuples={genders}
              name="gender"
              formDataValue={formData.gender}
              onChange={handleChange}
            />

            <div className="mb-3 text-bg-dark select-multiple">
              <Select
                name="country_id"
                value={formData.country_id}
                options={countryOptions}
                onChange={handleSelectChange}
                // getOptionLabel={(option) => option.label}
                // getOptionValue={(option) => option.value}
                isSearchable
                placeholder="Search and select country"
              />
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
          <Link className="me-2 mt-3 btn btn-outline-success" to="/">
            عودة
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
