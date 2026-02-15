import './User.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function User() {
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("name");
    const role = localStorage.getItem("role");
    const email = localStorage.getItem("email");
    setUserName(name || "User");
    setUserRole(role || "user");
    setUserEmail(email || "");
  }, []);

  const dashboardCards = [
    {
      title: 'Add Product',
      icon: 'fas fa-plus-circle',
      description: 'Create new shipment listings',
      link: '/addproduct',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      title: 'View Products',
      icon: 'fas fa-eye',
      description: 'Browse all shipments',
      link: '/showproduct',
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      title: 'Categories',
      icon: 'fas fa-list',
      description: 'Explore categories',
      link: '/listofcategory',
      color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    },
    {
      title: 'Edit Profile',
      icon: 'fas fa-user-edit',
      description: 'Update your information',
      link: '/epadmin',
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    }
  ];

  return (
    <>
      {/* Modern User Dashboard */}
      <div className="modern-container">
        <div className="modern-card fade-in">
          <div className="dashboard-header">
            <div className="user-welcome">
              <h1 className="modern-heading">
                <i className="fas fa-user-circle me-3"></i>
                Welcome, {userName}!
              </h1>
              <p className="lead text-muted">
                <i className="fas fa-envelope me-2"></i>
                {userEmail}
              </p>
              <span className="badge-modern badge-user">
                <i className="fas fa-user me-2"></i>
                {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
              </span>
            </div>
          </div>

          <div className="modern-grid mt-5">
            {dashboardCards.map((card, index) => (
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
      {/* User Dashboard End */}
    </>
  );
}

export default User;
