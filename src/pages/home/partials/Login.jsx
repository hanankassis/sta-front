import { useState } from "react";
import { Link } from "react-router-dom";
import modals from "../../../services/modals";
import MyInput from "../../../components/form/MyInput";
import {auth} from "../../../services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setValidationErrors({});
    const { status, result, data, text } = await auth.login({
      email,
      password,
    });
    if (result) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("name", data.name);
      localStorage.setItem("type", data.type);
      if (data.type == "admin") navigate("/admin");
      else if (data.type == "provider") navigate("/provider");
      else navigate("/");
    } else if (status === 400) {
      modals.error("بيانات الدخول غير صحيحة. يرجى المحاولة مرة أخرى.");
    } else if (status === 422) {
      modals.error(text);
      setValidationErrors(data);
    } else modals.error(text);

    setLoading(false);
  };

  return (
    <div className="main-container d-flex justify-content-center align-items-center ">
      <form onSubmit={handleSubmit} className="w-50 p-5 mb-5 mt-200 text-white">
        <h3 className="mb-3 text-secondary text-center">تسجيل دخول</h3>
        <MyInput
          placeholder="البريد الالكتروني"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={validationErrors.email}
        />

        <MyInput
          type="password"
          placeholder="كلمة المرور"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={validationErrors.password}
        />

        <div className="text-center">
          <button
            className="btn btn-success-light"
            type="submit"
            disabled={loading}
          >
            {loading ? "[جاري تسجيل الدخول...]" : "تسجيل دخول"}
          </button>
          <Link className="me-2 btn bg-success-subtle" to="/">
            عودة
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
