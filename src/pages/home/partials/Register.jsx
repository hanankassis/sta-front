import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../../services/api";

import { countries as apiCountries } from "../../../services/api";
import { provinces as apiProvinces } from "../../../services/api";
import { categories as apiCategories } from "../../../services/api";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import MyInput from "../../../components/form/MyInput";
import Radio from "../../../components/form/Radio";
import modals from "../../../services/modals";
import LocationPicker from "../../../components/form/PositionPicker";
import ImageUploader from "../../../components/Form/ImageUploader";
const Register = () => {
  const [loading, setLoading] = useState(false);
  const [countryOptions, setCountryOptions] = useState([]);
  const [provinceOptions, setProvinceOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const navigate = useNavigate();
  const [validationErrors, setValidationErrors] = useState([]);
  const [position, setPosition] = useState(
    {
      /**  موقع جامعة الشام */
      latlng: { lat: 33.506074423204986, lng: 36.28632701534472 },
      accuracy: 50,
    }
    // null
  );
  const [positionError, setPositionError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password_confirmation: "",
    name: "",
    type: "provider", // Default to tourist

    DOB: "", // for tourist
    gender: "M", // for tourist
    country_id: null, // For tourist (react-select, it's an object)

    province_id: null, // For tourist (react-select, it's an object)
    title: "", // For provider
    description: "", // For provider
    image_id: null, // For provider
    categories: [], // For provider(react-select multi)
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

  const handleSelect = (selectedOption, { name }) => {
    setFormData({ ...formData, [name]: selectedOption });
  };

  const handleSelectCategories = (selectedOptions, { name }) => {
    // selectedOptions is an array when `isMulti` is true
    setFormData({ ...formData, [name]: selectedOptions || [] });
    // console.log(selectedOptions);
    // console.log(name);
    // console.log("f" ,formData[name]);
  };

  /********* Submit ***********/
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setValidationErrors({});

    const fd = new FormData();
    fd.append("email", formData.email);
    fd.append("password", formData.password);
    fd.append("password_confirmation", formData.password_confirmation);
    fd.append("name", formData.name);
    fd.append("type", formData.type);
    if (formData.type === "provider") {
      fd.append("title", formData.description);
      fd.append("description", formData.description);
      fd.append("image_id", formData.image_id);
      fd.append("latitude", position.latlng.lat);
      fd.append("longitude", position.latlng.lng);
      fd.append("province_id", formData.province_id?.value ?? null);

      if (formData.categories && formData.categories.length) {
        const categoryIds = formData.categories.map(
          (c) => c.id ?? c.value ?? c
        );
        categoryIds.forEach((id) => fd.append("categories[]", id));
      }
    } else if (formData.type === "tourist") {
      fd.append("DOB", formData.DOB);
      fd.append("gender", formData.gender);
      fd.append("country_id", formData.country_id?.value ?? null);
    }

    fd.forEach((value, key) => {
      console.log(key, value);
    });

    const { status, result, data, text } = await auth.register(fd);
    if (result) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("name", data.name);
      localStorage.setItem("type", data.type);
      if (data.type == "provider") navigate("/provider");
      else navigate("/");
    } else if (status == 422) {
      modals.error("البيانات غير صحيحة");
      setValidationErrors(data);
      console.log(data);
    } else modals.error(text);

    setLoading(false);
  };

  useEffect(() => {
    async function loadSettings(api, setFunc) {
      const { result, data, text } = await api();
      if (result) setFunc(data);
      else modals.error(text);
    }
    setLoading(true);
    loadSettings(apiCountries, setCountryOptions);
    loadSettings(apiProvinces, setProvinceOptions);
    loadSettings(apiCategories.all, setCategoryOptions);
    setLoading(false);
  }, []);

  return (
    <div className="container-fluid">
      <div className="main-container row justify-content-center align-items-center  ">
        <form
          onSubmit={handleSubmit}
          className="col-md-6 p-4 mb-5 text-white mt-7"
        >
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
            placeholder="الاسم"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={validationErrors.name}
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
            type="password"
            placeholder=" تأكيد كلمة السر"
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleChange}
            error={validationErrors.password_confirmation}
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
                    onChange={handleSelect}
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
            <>
              <MyInput
                placeholder="الوصف"
                name="title"
                value={formData.title}
                onChange={handleChange}
                error={validationErrors.title}
              />
              <div className="mb-3">
                <div className="text-bg-dark select-multiple">
                  <Select
                    name="province_id"
                    value={formData.province_id}
                    options={provinceOptions}
                    onChange={handleSelect}
                    isSearchable
                    placeholder="ابحث واختر المحافظة"
                  />
                </div>
                {validationErrors.country_id && (
                  <small className="text-warning">
                    {validationErrors.country_id}
                  </small>
                )}
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label>التفاصيل:</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="اشرح عن خداماتك..."
                  style={{ width: "100%", padding: "8px", minHeight: "80px" }}
                ></textarea>
                {validationErrors.description && (
                  <small className="text-warning">
                    {validationErrors.description}
                  </small>
                )}
              </div>

              <ImageUploader
                placeholder="حمل الصورة الأساسية"
                name="image_id"
                onChange={handleFileChange}
                error={validationErrors.image_id}
              />
              <div>
                <LocationPicker
                  position={position}
                  setPosition={setPosition}
                  setPositionError={setPositionError}
                  positionError={positionError}
                  validationError={{ latitude: validationErrors.latitude }}
                  size={{ height: "600px", width: "100%" }}
                />
              </div>
              <div className="text-bg-dark select-multiple mt-3">
                <Select
                  name="categories"
                  value={formData.categories}
                  options={categoryOptions}
                  onChange={handleSelectCategories}
                  isSearchable
                  isMulti
                  getOptionLabel={(o) => o.name}
                  getOptionValue={(o) => o.id}
                  placeholder="ابحث واختر أصناف الخدمات التي يمكن أن تقدمها"
                />
              </div>
              {validationErrors.categories && (
                <small className="text-warning">
                  {validationErrors.categories}
                </small>
              )}
            </>
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
    </div>
  );
};

export default Register;
