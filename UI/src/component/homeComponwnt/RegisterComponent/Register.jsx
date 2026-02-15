import './Register.css';
import { useState } from 'react';
import axios from 'axios';
import { __userapiurl } from '../../../API_URL';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    city: "",
    gender: ""
  });

  const [errors, setErrors] = useState({});
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[0-9]{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile number must be 10 digits";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.city || formData.city === "--Select--") {
      newErrors.city = "Please select a city";
    }

    if (!formData.gender) {
      newErrors.gender = "Please select gender";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setOutput("");

    try {
      const response = await axios.post(__userapiurl + "register", formData);
      
      setOutput("Registration successful! Redirecting to login...");
      setFormData({
        name: "",
        email: "",
        mobile: "",
        address: "",
        city: "",
        gender: ""
      });

      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (error) {
      console.error("Registration Error:", error);
      const errorMsg = error.response?.data?.message || "Registration failed. Please try again.";
      setOutput(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <div className="register-header">
          <div className="register-icon">
            <i className="fas fa-user-plus"></i>
          </div>
          <h1>Create Account</h1>
          <p>Join Shipping War today</p>
        </div>

        {output && (
          <div className={`alert-modern ${output.includes('successful') ? 'alert-success-modern' : 'alert-danger-modern'}`}>
            <i className={`fas ${output.includes('successful') ? 'fa-check-circle' : 'fa-exclamation-circle'} me-2`}></i>
            {output}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label-modern">
                  <i className="fas fa-user me-2"></i>Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-control-modern"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <div className="error-message">
                    <i className="fas fa-exclamation-circle"></i>
                    {errors.name}
                  </div>
                )}
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label-modern">
                  <i className="fas fa-envelope me-2"></i>Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control-modern"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <div className="error-message">
                    <i className="fas fa-exclamation-circle"></i>
                    {errors.email}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label-modern">
                  <i className="fas fa-phone me-2"></i>Mobile Number
                </label>
                <input
                  type="text"
                  name="mobile"
                  className="form-control-modern"
                  placeholder="10 digit mobile number"
                  value={formData.mobile}
                  onChange={handleChange}
                  maxLength="10"
                />
                {errors.mobile && (
                  <div className="error-message">
                    <i className="fas fa-exclamation-circle"></i>
                    {errors.mobile}
                  </div>
                )}
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label-modern">
                  <i className="fas fa-city me-2"></i>City
                </label>
                <select
                  name="city"
                  className="form-control-modern"
                  value={formData.city}
                  onChange={handleChange}
                >
                  <option value="">--Select City--</option>
                  <optgroup label="Madhya Pradesh">
                    <option value="Indore">Indore</option>
                    <option value="Bhopal">Bhopal</option>
                    <option value="Ujjain">Ujjain</option>
                  </optgroup>
                  <optgroup label="Maharashtra">
                    <option value="Mumbai">Mumbai</option>
                    <option value="Pune">Pune</option>
                    <option value="Nasik">Nasik</option>
                  </optgroup>
                </select>
                {errors.city && (
                  <div className="error-message">
                    <i className="fas fa-exclamation-circle"></i>
                    {errors.city}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label-modern">
              <i className="fas fa-map-marker-alt me-2"></i>Address
            </label>
            <textarea
              name="address"
              className="form-control-modern"
              rows="3"
              placeholder="Enter your complete address"
              value={formData.address}
              onChange={handleChange}
            ></textarea>
            {errors.address && (
              <div className="error-message">
                <i className="fas fa-exclamation-circle"></i>
                {errors.address}
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label-modern">
              <i className="fas fa-venus-mars me-2"></i>Gender
            </label>
            <div className="gender-options">
              <label className="radio-label">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleChange}
                />
                <span className="radio-custom"></span>
                <i className="fas fa-mars me-1"></i> Male
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleChange}
                />
                <span className="radio-custom"></span>
                <i className="fas fa-venus me-1"></i> Female
              </label>
            </div>
            {errors.gender && (
              <div className="error-message">
                <i className="fas fa-exclamation-circle"></i>
                {errors.gender}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin me-2"></i>
                Creating Account...
              </>
            ) : (
              <>
                <i className="fas fa-user-plus me-2"></i>
                Register
              </>
            )}
          </button>
        </form>

        <div className="register-footer">
          <p>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;


