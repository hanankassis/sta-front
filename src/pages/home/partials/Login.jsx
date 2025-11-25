import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as apiLogin } from "../../../services/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await apiLogin({ email, password });
      if (data.type == "admin") navigate("/admin");
      else if (data.type == "provider") navigate("/provider");
      else navigate("/");
    } catch (err) {
      alert("Login failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form d-flex justify-content-center align-items-center ">
      <form onSubmit={handleSubmit} className="w-50 p-5 mb-5 mt-100 text-white">
        <h3 className="mb-3 text-secondary text-center">تسجيل دخول</h3>
        <input
          type="email"
          className="form-control mb-3"
          placeholder="البريد الالكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="form-control mb-4"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="text-center">
          <button
            className="btn btn-success-light"
            type="submit"
            disabled={loading}
          >
            {loading ? "[جاري تسجيل الدخول...]" : "تسجيل دخول"}
          </button>
          <Link className="me-2 btn btn-outline-success" to="/">
            عودة
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
