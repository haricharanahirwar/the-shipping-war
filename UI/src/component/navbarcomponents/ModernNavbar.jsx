import './Navbar.css';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

function ModernNavbar() {
    const location = useLocation();
    const [role, setRole] = useState(localStorage.getItem("role"));
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [scrolled, setScrolled] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Update state when route changes or localStorage changes
    useEffect(() => {
        const updateAuthState = () => {
            const currentRole = localStorage.getItem("role");
            const currentToken = localStorage.getItem("token");
            
            if (currentRole !== role) {
                setRole(currentRole);
            }
            if (currentToken !== token) {
                setToken(currentToken);
            }
        };

        updateAuthState();
        window.addEventListener('storage', updateAuthState);
        window.addEventListener('authStateChanged', updateAuthState);

        return () => {
            window.removeEventListener('storage', updateAuthState);
            window.removeEventListener('authStateChanged', updateAuthState);
        };
    }, [location.pathname, role, token]);

    // Admin Navbar
    const AdminNavbar = () => (
        <nav className={`navbar navbar-expand-lg modern-navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container-fluid px-4">
                <Link to="/" className="navbar-brand navbar-brand-modern">
                    <i className="fas fa-shipping-fast me-2"></i>
                    Shipping War
                </Link>
                
                <button className="navbar-toggler navbar-toggler-modern" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/admin" className="nav-link nav-link-modern">
                                <i className="fas fa-home me-1"></i> Dashboard
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/manageusers" className="nav-link nav-link-modern">
                                <i className="fas fa-users me-1"></i> Manage Users
                            </Link>
                        </li>
                        <li className="nav-item dropdown dropdown-modern">
                            <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
                                <i className="fas fa-layer-group me-1"></i> Categories
                            </a>
                            <ul className="dropdown-menu">
                                <li><Link to="/addcategory" className="dropdown-item">
                                    <i className="fas fa-plus-circle me-2"></i>Add Category
                                </Link></li>
                                <li><Link to="/addsubcategory" className="dropdown-item">
                                    <i className="fas fa-plus me-2"></i>Add SubCategory
                                </Link></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown dropdown-modern">
                            <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
                                <i className="fas fa-cog me-1"></i> Settings
                            </a>
                            <ul className="dropdown-menu">
                                <li><Link to="/epadmin" className="dropdown-item">
                                    <i className="fas fa-user-edit me-2"></i>Edit Profile
                                </Link></li>
                                <li><Link to="/cpadmin" className="dropdown-item">
                                    <i className="fas fa-key me-2"></i>Change Password
                                </Link></li>
                            </ul>
                        </li>
                    </ul>
                    
                    <div className="d-flex align-items-center gap-3">
                        <span className="welcome-text d-none d-lg-flex">
                            <i className="fas fa-user-shield"></i>
                            {localStorage.getItem('name') || localStorage.getItem('email')}
                        </span>
                        <Link to="/logout" className="btn btn-modern">
                            <i className="fas fa-sign-out-alt me-2"></i>Logout
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );

    // Manager Navbar
    const ManagerNavbar = () => (
        <nav className={`navbar navbar-expand-lg modern-navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container-fluid px-4">
                <Link to="/" className="navbar-brand navbar-brand-modern">
                    <i className="fas fa-shipping-fast me-2"></i>
                    Shipping War
                </Link>
                
                <button className="navbar-toggler navbar-toggler-modern" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/manager" className="nav-link nav-link-modern">
                                <i className="fas fa-home me-1"></i> Dashboard
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/manageusers" className="nav-link nav-link-modern">
                                <i className="fas fa-users-cog me-1"></i> Manage Users
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/listofcategory" className="nav-link nav-link-modern">
                                <i className="fas fa-list me-1"></i> Categories
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/showproduct" className="nav-link nav-link-modern">
                                <i className="fas fa-box me-1"></i> Products
                            </Link>
                        </li>
                        <li className="nav-item dropdown dropdown-modern">
                            <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
                                <i className="fas fa-cog me-1"></i> Settings
                            </a>
                            <ul className="dropdown-menu">
                                <li><Link to="/epadmin" className="dropdown-item">
                                    <i className="fas fa-user-edit me-2"></i>Edit Profile
                                </Link></li>
                                <li><Link to="/cpadmin" className="dropdown-item">
                                    <i className="fas fa-key me-2"></i>Change Password
                                </Link></li>
                            </ul>
                        </li>
                    </ul>
                    
                    <div className="d-flex align-items-center gap-3">
                        <span className="welcome-text d-none d-lg-flex">
                            <i className="fas fa-user-tie"></i>
                            {localStorage.getItem('name') || localStorage.getItem('email')}
                        </span>
                        <Link to="/logout" className="btn btn-modern">
                            <i className="fas fa-sign-out-alt me-2"></i>Logout
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );

    // User Navbar
    const UserNavbar = () => (
        <nav className={`navbar navbar-expand-lg modern-navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container-fluid px-4">
                <Link to="/" className="navbar-brand navbar-brand-modern">
                    <i className="fas fa-shipping-fast me-2"></i>
                    Shipping War
                </Link>
                
                <button className="navbar-toggler navbar-toggler-modern" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/user" className="nav-link nav-link-modern">
                                <i className="fas fa-home me-1"></i> Dashboard
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/listofcategory" className="nav-link nav-link-modern">
                                <i className="fas fa-list me-1"></i> Categories
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/addproduct" className="nav-link nav-link-modern">
                                <i className="fas fa-plus-circle me-1"></i> Add Product
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/showproduct" className="nav-link nav-link-modern">
                                <i className="fas fa-eye me-1"></i> View Products
                            </Link>
                        </li>
                        <li className="nav-item dropdown dropdown-modern">
                            <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
                                <i className="fas fa-cog me-1"></i> Settings
                            </a>
                            <ul className="dropdown-menu">
                                <li><Link to="/epadmin" className="dropdown-item">
                                    <i className="fas fa-user-edit me-2"></i>Edit Profile
                                </Link></li>
                                <li><Link to="/cpadmin" className="dropdown-item">
                                    <i className="fas fa-key me-2"></i>Change Password
                                </Link></li>
                            </ul>
                        </li>
                    </ul>
                    
                    <div className="d-flex align-items-center gap-3">
                        <span className="welcome-text d-none d-lg-flex">
                            <i className="fas fa-user"></i>
                            {localStorage.getItem('name') || localStorage.getItem('email')}
                        </span>
                        <Link to="/logout" className="btn btn-modern">
                            <i className="fas fa-sign-out-alt me-2"></i>Logout
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );

    // Public Navbar
    const PublicNavbar = () => (
        <nav className={`navbar navbar-expand-lg modern-navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container-fluid px-4">
                <Link to="/" className="navbar-brand navbar-brand-modern">
                    <i className="fas fa-shipping-fast me-2"></i>
                    Shipping War
                </Link>
                
                <button className="navbar-toggler navbar-toggler-modern" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/" className="nav-link nav-link-modern">
                                <i className="fas fa-home me-1"></i> Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/about" className="nav-link nav-link-modern">
                                <i className="fas fa-info-circle me-1"></i> About
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/service" className="nav-link nav-link-modern">
                                <i className="fas fa-concierge-bell me-1"></i> Services
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/contact" className="nav-link nav-link-modern">
                                <i className="fas fa-envelope me-1"></i> Contact
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/register" className="nav-link nav-link-modern">
                                <i className="fas fa-user-plus me-1"></i> Register
                            </Link>
                        </li>
                    </ul>
                    
                    <div className="d-flex align-items-center gap-3">
                        <div className="social-links d-none d-lg-flex">
                            <a href="#"><i className="fab fa-facebook-f"></i></a>
                            <a href="#"><i className="fab fa-twitter"></i></a>
                            <a href="#"><i className="fab fa-linkedin-in"></i></a>
                            <a href="#"><i className="fab fa-instagram"></i></a>
                        </div>
                        <Link to="/login" className="btn btn-modern">
                            <i className="fas fa-sign-in-alt me-2"></i>Login
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );

    // Render appropriate navbar based on role
    const renderNavbar = () => {
        if (token && role === "admin") return <AdminNavbar />;
        if (token && role === "manager") return <ManagerNavbar />;
        if (token && role === "user") return <UserNavbar />;
        return <PublicNavbar />;
    };

    return (
        <>
            {renderNavbar()}
        </>
    );
}

export default ModernNavbar;
