import { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { loginUser } from "../services/authService";
import "../styles/auth.css";

function Register() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [passwordHash, setPasswordHash] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // Step 1: Register
    await registerUser({
      username,
      email,
      passwordHash
    });

    // Step 2: Login automatically
    const res = await loginUser({
      email,
      password: passwordHash
    });

    login(res.data);

    // Step 3: Redirect
    navigate("/dashboard");

  } catch (error) {
    console.error(error);
    setError(error.response?.data || "Registration failed");
  }
};

  return (
    <div className="auth-container">

      <form className="auth-form" onSubmit={handleSubmit}>

        <h2>Create Your Account</h2>
        <p className="subtitle">Start managing your tasks efficiently</p>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        {/* Username */}
        <div className="input-group">
          <span>👤</span>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            required
          />
        </div>

        {/* Email */}
        <div className="input-group">
          <span>📧</span>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div className="input-group">
          <span>🔒</span>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={passwordHash}
            onChange={(e)=>setPasswordHash(e.target.value)}
            required
          />
          <span
            className="toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁"}
          </span>
        </div>

        <button type="submit">Register</button>

        <p className="switch-link">
          Already have an account? <Link to="/">Login</Link>
        </p>

      </form>

    </div>
  );
}

export default Register;