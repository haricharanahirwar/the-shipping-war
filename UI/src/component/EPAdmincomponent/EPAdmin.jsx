import './EPAdmin.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../utils/apiClient';

function EPAdmin() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [gender, setGender] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userEmail = localStorage.getItem('email');

    if (!token) {
      setOutput('Please login first!');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    const fetchUserDetails = async () => {
      try {
        // Use /user/profile endpoint which works for all authenticated users
        const response = await apiClient.get('/user/profile');
        
        if (response.data) {
          const user = response.data;
          setName(user.name);
          setEmail(user.email);
          setMobile(user.mobile);
          setAddress(user.address);
          setCity(user.city);
          setGender(user.gender);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        if (error.response?.status === 401) {
          setOutput('Session expired. Please login again!');
          setTimeout(() => {
            localStorage.clear();
            window.dispatchEvent(new Event('authStateChanged'));
            navigate('/login');
          }, 2000);
        }
      }
    };

    fetchUserDetails();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setOutput('');

    try {
      // Use /user/profile endpoint for updating own profile
      await apiClient.patch('/user/profile', {
        name,
        mobile,
        address,
        city,
        gender
      });
      
      // Update localStorage with new name
      localStorage.setItem('name', name);
      window.dispatchEvent(new Event('authStateChanged'));
      
      setOutput('Profile updated successfully!');
      
      setTimeout(() => {
        setOutput('');
      }, 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      
      if (error.response?.status === 401) {
        setOutput('Session expired. Please login again!');
        setTimeout(() => {
          localStorage.clear();
          window.dispatchEvent(new Event('authStateChanged'));
          navigate('/login');
        }, 2000);
      } else {
        const errorMsg = error.response?.data?.message || 'Failed to update profile.';
        setOutput(errorMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modern-container">
      <div className="modern-card">
        <h1 className="modern-heading">
          <i className="fas fa-user-edit me-3"></i>
          Edit Profile
        </h1>

        {output && (
          <div className={`alert-modern ${output.includes('success') ? 'alert-success-modern' : 'alert-danger-modern'}`}>
            <i className={`fas ${output.includes('success') ? 'fa-check-circle' : 'fa-exclamation-circle'} me-2`}></i>
            {output}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="name" className="form-label-modern">
                  <i className="fas fa-user me-2"></i>Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="form-control-modern"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="email" className="form-label-modern">
                  <i className="fas fa-envelope me-2"></i>Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control-modern"
                  value={email}
                  readOnly
                  style={{ backgroundColor: '#f5f5f5', cursor: 'not-allowed' }}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="mobile" className="form-label-modern">
                  <i className="fas fa-phone me-2"></i>Mobile Number
                </label>
                <input
                  type="text"
                  id="mobile"
                  className="form-control-modern"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  maxLength="10"
                  required
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="city" className="form-label-modern">
                  <i className="fas fa-city me-2"></i>City
                </label>
                <select
                  id="city"
                  className="form-control-modern"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                >
                  <option value="">Select City</option>
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
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="address" className="form-label-modern">
              <i className="fas fa-map-marker-alt me-2"></i>Address
            </label>
            <textarea
              id="address"
              className="form-control-modern"
              rows="3"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            ></textarea>
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
                  checked={gender === 'male'}
                  onChange={(e) => setGender(e.target.value)}
                />
                <span className="radio-custom"></span>
                <i className="fas fa-mars me-1"></i> Male
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === 'female'}
                  onChange={(e) => setGender(e.target.value)}
                />
                <span className="radio-custom"></span>
                <i className="fas fa-venus me-1"></i> Female
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary-modern w-100"
            disabled={loading}
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin me-2"></i>
                Updating Profile...
              </>
            ) : (
              <>
                <i className="fas fa-save me-2"></i>
                Update Profile
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EPAdmin;
