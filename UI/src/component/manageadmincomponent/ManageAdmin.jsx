import { useEffect, useState } from 'react';
import apiClient from '../../utils/apiClient';
import './ManageAdmin.css';

function ManageAdmin() {
  const [adminList, setAdminList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAdminAccounts();
  }, []);

  const fetchAdminAccounts = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Fetch all users and filter admins
      const response = await apiClient.get('/user/fetch');
      
      if (response.data && Array.isArray(response.data)) {
        const admins = response.data.filter(user => user.role === 'admin');
        setAdminList(admins);
      } else {
        setAdminList([]);
      }
    } catch (err) {
      console.error('Error fetching admin accounts:', err);
      setError(err.response?.data?.message || 'Failed to fetch admin accounts');
      setAdminList([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modern-container">
      <div className="modern-card fade-in">
        <div className="dashboard-header">
          <h1 className="modern-heading">
            <i className="fas fa-user-shield me-3"></i>
            Manage Admin Accounts
          </h1>
          <p className="lead text-muted">
            View all administrator accounts in the system
          </p>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="loading-spinner"></div>
            <p className="mt-3">Loading admin accounts...</p>
          </div>
        ) : error ? (
          <div className="alert alert-danger">
            <i className="fas fa-exclamation-circle me-2"></i>
            {error}
          </div>
        ) : (
          <div className="table-responsive mt-4">
            <table className="table-modern">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Gender</th>
                  <th>Address</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {adminList.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-5">
                      <i className="fas fa-user-shield fa-3x mb-3" style={{ color: '#ccc' }}></i>
                      <p>No admin accounts found</p>
                    </td>
                  </tr>
                ) : (
                  adminList.map((admin, index) => (
                    <tr key={admin._id}>
                      <td>{index + 1}</td>
                      <td>
                        <strong>{admin.name}</strong>
                      </td>
                      <td>
                        <i className="fas fa-envelope me-2 text-muted"></i>
                        {admin.email}
                      </td>
                      <td>
                        <i className="fas fa-phone me-2 text-muted"></i>
                        {admin.mobile || 'N/A'}
                      </td>
                      <td>
                        <i className={`fas fa-${admin.gender === 'male' ? 'mars' : admin.gender === 'female' ? 'venus' : 'genderless'} me-2 text-muted`}></i>
                        {admin.gender ? admin.gender.charAt(0).toUpperCase() + admin.gender.slice(1) : 'N/A'}
                      </td>
                      <td>{admin.address || 'N/A'}</td>
                      <td>
                        <span className="badge-modern badge-admin">
                          <i className="fas fa-shield-alt me-1"></i>
                          Admin
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-4 text-center">
          <button 
            className="btn btn-secondary-modern"
            onClick={fetchAdminAccounts}
            disabled={loading}
          >
            <i className="fas fa-sync-alt me-2"></i>
            Refresh List
          </button>
        </div>
      </div>
    </div>
  );
}

export default ManageAdmin;
