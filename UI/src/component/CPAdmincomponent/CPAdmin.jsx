import './CPAdmin.css';
import { useState, useEffect } from 'react';
import apiClient from '../../utils/apiClient';
import { __userapiurl } from '../../API_URL';
import { useNavigate } from 'react-router-dom';

function CPAdmin() {
  const navigate = useNavigate();
  const [opassword, setOldPassword] = useState('');
  const [npassword, setNewPassword] = useState('');
  const [cnpassword, setConfirmNewPassword] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  // Session check
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login first');
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = async () => {
    if (!opassword || !npassword || !cnpassword) {
      setOutput('All fields are required');
      return;
    }

    if (npassword !== cnpassword) {
      setOutput('New & Confirm New Password Mismatch....');
      setNewPassword('');
      setConfirmNewPassword('');
      return;
    }

    setLoading(true);
    setOutput('');

    try {
      // Use /user/change-password endpoint
      await apiClient.patch('/user/change-password', {
        oldPassword: opassword,
        newPassword: cnpassword
      });
      
      // Show success message
      alert('Password changed successfully! Please login with your new password.');
      
      // Clear localStorage
      localStorage.clear();
      
      // Dispatch auth state change event
      window.dispatchEvent(new Event('authStateChanged'));
      
      // Redirect to login page directly
      navigate('/login');
    } catch (error) {
      console.error('Password change error:', error);
      if (error.response?.status === 401) {
        if (error.response?.data?.message?.includes('old password')) {
          setOutput('Invalid old password, please try again....');
          setOldPassword('');
        } else {
          setOutput('Session expired. Please login again.');
          setTimeout(() => navigate('/login'), 2000);
        }
      } else {
        setOutput('Failed to change password. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Change Password Start */}
      <div className="modern-container">
        <div className="modern-card fade-in">
          <h1 className="modern-heading">Change Password</h1>
          
          {output && (
            <div className={`alert-modern ${output.includes('successfully') ? 'alert-success-modern' : 'alert-danger-modern'} mb-4`}>
              {output}
            </div>
          )}

          <form>
            <div className="mb-4">
              <label htmlFor="oldPassword" className="form-label-modern">Old Password:</label>
              <input
                type="password"
                id="oldPassword"
                className="form-control form-control-modern"
                value={opassword}
                onChange={(e) => setOldPassword(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="newPassword" className="form-label-modern">New Password:</label>
              <input
                type="password"
                id="newPassword"
                className="form-control form-control-modern"
                value={npassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="confirmPassword" className="form-label-modern">Confirm New Password:</label>
              <input
                type="password"
                id="confirmPassword"
                className="form-control form-control-modern"
                value={cnpassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                disabled={loading}
              />
            </div>

            <button
              type="button"
              className="btn btn-primary-modern"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Changing Password...
                </>
              ) : (
                <>
                  <i className="fas fa-key me-2"></i>
                  Change Password
                </>
              )}
            </button>
          </form>
        </div>
      </div>
      {/* Change Password End */}
    </>
  );
}

export default CPAdmin;
