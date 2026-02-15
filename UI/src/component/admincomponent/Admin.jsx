import './Admin.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Admin() {
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("name");
    const role = localStorage.getItem("role");
    const email = localStorage.getItem("email");
    setUserName(name || "Admin");
    setUserRole(role || "admin");
    setUserEmail(email || "");
  }, []);

  const adminCards = [
    {
      title: 'Manage Users',
      icon: 'fas fa-users-cog',
      description: 'View and manage all users',
      link: '/manageusers',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      title: 'Add Category',
      icon: 'fas fa-plus-circle',
      description: 'Create new categories',
      link: '/addcategory',
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      title: 'Add SubCategory',
      icon: 'fas fa-layer-group',
      description: 'Create subcategories',
      link: '/addsubcategory',
      color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    },
    {
      title: 'View Products',
      icon: 'fas fa-box-open',
      description: 'Browse all shipments',
      link: '/showproduct',
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      title: 'Edit Profile',
      icon: 'fas fa-user-edit',
      description: 'Update your information',
      link: '/epadmin',
      color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    },
    {
      title: 'Change Password',
      icon: 'fas fa-key',
      description: 'Update your password',
      link: '/cpadmin',
      color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
    }
  ];

  return (
    <>
      {/* Modern Admin Dashboard */}
      <div className="modern-container">
        <div className="modern-card fade-in">
          <div className="dashboard-header">
            <div className="user-welcome">
              <h1 className="modern-heading">
                <i className="fas fa-user-shield me-3"></i>
                Admin Dashboard
              </h1>
              <p className="lead text-muted">
                Welcome back, {userName}!
              </p>
              <p className="text-muted">
                <i className="fas fa-envelope me-2"></i>
                {userEmail}
              </p>
              <span className="badge-modern badge-admin">
                <i className="fas fa-crown me-2"></i>
                {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
              </span>
            </div>
          </div>

          <div className="modern-grid mt-5">
            {adminCards.map((card, index) => (
              <Link to={card.link} key={index} className="text-decoration-none">
                <div className="stats-card dashboard-action-card">
                  <div className="stats-icon" style={{ background: card.color }}>
                    <i className={card.icon}></i>
                  </div>
                  <h4 className="mt-3 mb-2">{card.title}</h4>
                  <p className="text-muted">{card.description}</p>
                  <div className="card-arrow">
                    <i className="fas fa-arrow-right"></i>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      {/* Admin Dashboard End */}
    </>
  );
}

export default Admin;
