import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Manager() {
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("name");
    const role = localStorage.getItem("role");
    const email = localStorage.getItem("email");
    setUserName(name || "Manager");
    setUserRole(role || "manager");
    setUserEmail(email || "");
  }, []);

  const managerCards = [
    {
      title: 'Manage Admin',
      icon: 'fas fa-user-shield',
      description: 'View admin accounts',
      link: '/manageadmin',
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      title: 'Categories',
      icon: 'fas fa-list-alt',
      description: 'View all categories',
      link: '/listofcategory',
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      title: 'Products',
      icon: 'fas fa-boxes',
      description: 'Manage all products',
      link: '/showproduct',
      color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
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
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }
  ];

  return (
    <>
      {/* Modern Manager Dashboard */}
      <div className="modern-container">
        <div className="modern-card fade-in">
          <div className="dashboard-header">
            <div className="user-welcome">
              <h1 className="modern-heading">
                <i className="fas fa-user-tie me-3"></i>
                Manager Dashboard
              </h1>
              <p className="lead text-muted">
                Welcome back, {userName}!
              </p>
              <p className="text-muted">
                <i className="fas fa-envelope me-2"></i>
                {userEmail}
              </p>
              <span className="badge-modern badge-manager">
                <i className="fas fa-briefcase me-2"></i>
                {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
              </span>
            </div>
          </div>

          <div className="modern-grid mt-5">
            {managerCards.map((card, index) => (
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
      {/* Manager Dashboard End */}
    </>
  );
}

export default Manager;
