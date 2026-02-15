import './Manageusers.css';
import { useState, useEffect } from 'react';
import apiClient from '../../utils/apiClient';
import { __userapiurl } from '../../API_URL';
import { useNavigate } from 'react-router-dom';

function Manageusers() {
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentUserRole, setCurrentUserRole] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // all, users, admins, managers

  useEffect(() => {
    const role = localStorage.getItem('role');
    const token = localStorage.getItem('token');
    
    setCurrentUserRole(role);

    if (!token) {
      alert('Please login first');
      navigate('/login');
      return;
    }

    if (role !== 'admin' && role !== 'manager') {
      alert('Access denied. Admin or Manager access required.');
      navigate('/');
      return;
    }

    fetchUsers();
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      // Fetch all users (user, admin, manager roles)
      const response = await apiClient.get(__userapiurl + 'fetch');
      setUserList(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      if (error.response?.status === 401) {
        setError('Session expired. Please login again.');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError('Unable to load users');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleStatusToggle = async (email, currentStatus) => {
    const newStatus = currentStatus === 1 ? 0 : 1;
    const action = newStatus === 1 ? 'activate' : 'deactivate';
    
    if (!window.confirm(`Are you sure you want to ${action} this user?`)) {
      return;
    }

    try {
      const updateDetails = {
        condition_obj: JSON.stringify({ email: email }),
        content_obj: JSON.stringify({ status: newStatus })
      };

      await apiClient.patch(__userapiurl + 'update', updateDetails);
      
      alert(`User ${action}d successfully!`);
      fetchUsers(); // Refresh list
    } catch (error) {
      console.error('Error updating user status:', error);
      if (error.response?.status === 401) {
        alert('Session expired. Please login again.');
        navigate('/login');
      } else {
        alert('Failed to update user status');
      }
    }
  };

  const handleDelete = async (email) => {
    if (currentUserRole !== 'admin') {
      alert('Only Admin can delete users');
      return;
    }

    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }

    try {
      await apiClient.delete(__userapiurl + 'delete', {
        data: { condition_obj: JSON.stringify({ email: email }) }
      });
      
      alert('User deleted successfully!');
      fetchUsers(); // Refresh list
    } catch (error) {
      console.error('Error deleting user:', error);
      if (error.response?.status === 401) {
        alert('Session expired. Please login again.');
        navigate('/login');
      } else {
        alert('Failed to delete user');
      }
    }
  };

  // Filter users based on active tab
  const getFilteredUsers = () => {
    if (activeTab === 'all') return userList;
    if (activeTab === 'users') return userList.filter(u => u.role === 'user');
    if (activeTab === 'admins') return userList.filter(u => u.role === 'admin');
    if (activeTab === 'managers') return userList.filter(u => u.role === 'manager');
    return userList;
  };

  const filteredUsers = getFilteredUsers();

  // Count by role
  const counts = {
    all: userList.length,
    users: userList.filter(u => u.role === 'user').length,
    admins: userList.filter(u => u.role === 'admin').length,
    managers: userList.filter(u => u.role === 'manager').length
  };

  return (
    <div className="modern-container">
      <div className="modern-card fade-in">
        <h1 className="modern-heading">
          <i className="fas fa-users-cog me-3"></i>
          Manage Users
        </h1>
        
        {error && (
          <div className="alert-modern alert-danger-modern mb-4">
            {error}
          </div>
        )}

        {/* Filter Tabs */}
        <div className="user-filter-tabs mb-4">
          <button
            className={`filter-tab ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            <i className="fas fa-users me-2"></i>
            All Users ({counts.all})
          </button>
          <button
            className={`filter-tab ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <i className="fas fa-user me-2"></i>
            Users ({counts.users})
          </button>
          <button
            className={`filter-tab ${activeTab === 'admins' ? 'active' : ''}`}
            onClick={() => setActiveTab('admins')}
          >
            <i className="fas fa-user-shield me-2"></i>
            Admins ({counts.admins})
          </button>
          <button
            className={`filter-tab ${activeTab === 'managers' ? 'active' : ''}`}
            onClick={() => setActiveTab('managers')}
          >
            <i className="fas fa-user-tie me-2"></i>
            Managers ({counts.managers})
          </button>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="loading-spinner"></div>
            <p className="mt-3">Loading users...</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table-modern">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>City</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-5">
                      <i className="fas fa-users fa-3x mb-3" style={{ color: '#ccc' }}></i>
                      <p>No users found in this category</p>
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user._id}>
                      <td>{user._id}</td>
                      <td>
                        <strong>{user.name}</strong>
                        <br />
                        <small className="text-muted">{user.gender}</small>
                      </td>
                      <td>{user.email}</td>
                      <td>{user.mobile}</td>
                      <td>{user.city}</td>
                      <td>
                        {user.role === 'admin' ? (
                          <span className="badge-modern badge-admin">
                            <i className="fas fa-crown me-1"></i>
                            Admin
                          </span>
                        ) : user.role === 'manager' ? (
                          <span className="badge-modern badge-manager">
                            <i className="fas fa-briefcase me-1"></i>
                            Manager
                          </span>
                        ) : (
                          <span className="badge-modern badge-user">
                            <i className="fas fa-user me-1"></i>
                            User
                          </span>
                        )}
                      </td>
                      <td>
                        {user.status === 1 ? (
                          <span className="badge-modern badge-success">
                            <i className="fas fa-check-circle me-1"></i>
                            Active
                          </span>
                        ) : (
                          <span className="badge-modern" style={{ background: '#999' }}>
                            <i className="fas fa-times-circle me-1"></i>
                            Inactive
                          </span>
                        )}
                      </td>
                      <td>
                        <div className="d-flex gap-2 flex-wrap">
                          {/* Activate/Deactivate Button */}
                          <button
                            className={user.status === 1 ? 'btn btn-danger-modern btn-sm' : 'btn btn-success-modern btn-sm'}
                            onClick={() => handleStatusToggle(user.email, user.status)}
                            title={user.status === 1 ? 'Deactivate User' : 'Activate User'}
                          >
                            <i className={`fas ${user.status === 1 ? 'fa-ban' : 'fa-check'} me-1`}></i>
                            {user.status === 1 ? 'Deactivate' : 'Activate'}
                          </button>

                          {/* Delete Button (Admin Only) */}
                          {currentUserRole === 'admin' && (
                            <button
                              className="btn btn-danger-modern btn-sm"
                              onClick={() => handleDelete(user.email)}
                              title="Delete User"
                            >
                              <i className="fas fa-trash me-1"></i>
                              Delete
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Permission Info */}
        <div className="mt-4 p-3" style={{ background: 'rgba(102, 126, 234, 0.1)', borderRadius: '12px' }}>
          <h6 className="mb-2">
            <i className="fas fa-info-circle me-2"></i>
            Your Permissions ({currentUserRole})
          </h6>
          <ul className="mb-0" style={{ fontSize: '0.9rem' }}>
            <li>✅ View all users, admins, and managers</li>
            <li>✅ Activate/Deactivate users</li>
            {currentUserRole === 'admin' ? (
              <li>✅ Delete users (Admin only)</li>
            ) : (
              <li>❌ Delete users (Admin only)</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Manageusers;
