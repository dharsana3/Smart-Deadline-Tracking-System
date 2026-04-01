import { useState, useContext, useEffect } from "react";
import { loginUser } from "../services/authService";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/auth.css";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser({ email, password });
      login(res.data);
      navigate("/dashboard");
    } catch {
      setError("Invalid email or password");
    }
  };

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  return (
    <div className="auth-container">

      <form className="auth-form" onSubmit={handleSubmit}>

        <h2>Sign in to Your Account</h2>
        <p className="subtitle">Continue managing your tasks efficiently</p>

        {error && <p className="error">{error}</p>}

        <div className="input-group">
          <FaEnvelope />
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <FaLock />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />
          <span
            className="toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button type="submit">Login</button>

        <p className="switch-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>

      </form>

    </div>
  );
}

export default Login;