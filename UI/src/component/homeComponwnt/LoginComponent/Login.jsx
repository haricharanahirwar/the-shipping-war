import './Login.css';
import { useState } from 'react';
import axios from 'axios';
import { __userapiurl } from '../../../API_URL.jsx';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [output, setOutput] = useState("");
  const [type, setType] = useState("password");
  const [passwordtext, setShowpasswordText] = useState("Show password");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = () => {
    if (!email.trim()) {
      setEmailError("Email is Required!!");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email format");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = () => {
    if (!password.trim()) {
      setPasswordError("Password is Required!!");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (!isEmailValid || !isPasswordValid) return;

    setLoading(true);

    try {
      const response = await axios.post(
        `${__userapiurl}login`,
        { email, password }
      );

      const user = response.data.userDetails;

      // Save in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("name", user.name);
      localStorage.setItem("email", user.email);
      localStorage.setItem("mobile", user.mobile);
      localStorage.setItem("address", user.address);
      localStorage.setItem("city", user.city);
      localStorage.setItem("gender", user.gender);
      localStorage.setItem("role", user.role);
      localStorage.setItem("info", user.info);

      // Dispatch custom event to notify Navbar of auth state change
      window.dispatchEvent(new Event('authStateChanged'));

      // Role based navigation
      if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "manager") {
        navigate("/manager");
      } else if (user.role === "user") {
        navigate("/user");
      }

    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);

      setEmailError("");
      setPasswordError("");
      setOutput("");

      const serverMsg = error.response?.data?.message || error.message || "Login failed";
      const lower = String(serverMsg).toLowerCase();

      if (lower.includes('not found') || lower.includes('user not')) {
        setEmailError('User not found. Please check your email.');
      } else if (lower.includes('invalid password') || lower.includes('password')) {
        setPasswordError('Incorrect password. Please try again.');
      } else {
        setOutput(serverMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  const handletogglepassword = () => {
    if (type === "password") {
      setType("text");
      setShowpasswordText("Hide password");
    } else {
      setType("password");
      setShowpasswordText("Show password");
    }
  };

  return (
    <div className="login-container">
      <div id="divbox">
        <div className="login-header">
          <div className="login-icon">
            <i className="fas fa-shipping-fast"></i>
          </div>
          <h1>Welcome Back</h1>
          <p>Login to access your dashboard</p>
        </div>

        {output && (
          <div className="error-message" style={{ marginBottom: '1rem', justifyContent: 'center' }}>
            <i className="fas fa-exclamation-circle"></i>
            {output}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <i className="fas fa-envelope input-icon"></i>
            <input
              type="email"
              placeholder="Enter your email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && (
              <div className="error-message">
                <i className="fas fa-exclamation-circle"></i>
                {emailError}
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Password</label>
            <i className="fas fa-lock input-icon"></i>
            <input
              type={type}
              placeholder="Enter your password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && (
              <div className="error-message">
                <i className="fas fa-exclamation-circle"></i>
                {passwordError}
              </div>
            )}
          </div>

          <div className="checkbox-container">
            <input 
              type="checkbox" 
              id="showPassword"
              onChange={handletogglepassword} 
            />
            <label htmlFor="showPassword">{passwordtext}</label>
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin me-2"></i>
                Logging in...
              </>
            ) : (
              <>
                <i className="fas fa-sign-in-alt me-2"></i>
                Login
              </>
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
