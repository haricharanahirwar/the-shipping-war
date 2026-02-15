import './Navbar.css';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Navbar() {
    const location = useLocation();
    const [NavbarContent, setNavbarContent] = useState();
    const [role, setRole] = useState(localStorage.getItem("role"));
    const [token, setToken] = useState(localStorage.getItem("token"));

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

        // Check on mount and route change
        updateAuthState();

        // Listen for storage changes (updates from other tabs)
        window.addEventListener('storage', updateAuthState);
        
        // Custom event for same-tab localStorage updates
        window.addEventListener('authStateChanged', updateAuthState);

        return () => {
            window.removeEventListener('storage', updateAuthState);
            window.removeEventListener('authStateChanged', updateAuthState);
        };
    }, [location.pathname, role, token]);

    useEffect(() => {
        const updateNavbar = () => {
            const currentToken = localStorage.getItem("token");
            const currentRole = localStorage.getItem("role");
            const email = localStorage.getItem("email");
            const name = localStorage.getItem("name");

            if (currentToken && currentRole === "admin") {
                setNavbarContent(<>    <div className="container-fluid px-0" style={{ backgroundColor: '#34699A', color: 'white' }}>
                    <div className="row gx-0">
                        <div className="col-lg-3 d-none d-lg-block" style={{ backgroundColor: '#34699A' }}>
                            <Link to="/" className="navbar-brand w-100 h-100 m-0 p-0 d-flex align-items-center justify-content-center">

                                <h2 className="m-0 text-white text-uppercase" style={{ 'color': "white" }}>Shipping War</h2>
                            </Link>
                        </div>
                        <div className="col-lg-9">
                            <div className="row gx-0 d-none d-lg-flex" style={{ backgroundColor: '#34699A' }}>
                                <div className="col-lg-7 px-5 text-start">
                                    <div className="h-100 d-inline-flex align-items-center py-2 me-4">
                                        <i className="fa fa-envelope me-2 text-white"></i>
                                        <p className="mb-0 text-white">Welcome : {localStorage.getItem('email')}</p>
                                    </div>
                                </div>
                            </div>

                            <nav className="navbar navbar-expand-lg navbar-light p-3 p-lg-0" style={{ backgroundColor: '#34699A' }}>
                                <Link to="/" className="navbar-brand d-block d-lg-none">
                                    <h1 className="m-0 text-white text-uppercase">Shipping War</h1>
                                </Link>
                                <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                                    <span className="navbar-toggler-icon"></span>
                                </button>

                                <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                                    <div className="navbar-nav mr-auto py-0">
                                        <Link to="/admin" className="nav-item nav-link text-white">Admin Home</Link>
                                        <Link to="/manageusers" className="nav-item nav-link text-white">Manage Users</Link>

                                        <div className="nav-item dropdown">
                                            <span className="nav-link dropdown-toggle text-white" data-bs-toggle="dropdown">Manage Category</span>
                                            <div className="dropdown-menu rounded-0 m-0">
                                                <Link to="/addcategory" className="dropdown-item text-black">Add Category</Link>
                                                <Link to="/addsubcategory" className="dropdown-item text-black">Add SubCategory</Link>
                                            </div>
                                        </div>

                                        <div className="nav-item dropdown">
                                            <span className="nav-link dropdown-toggle text-white" data-bs-toggle="dropdown">Settings</span>
                                            <div className="dropdown-menu rounded-0 m-0">
                                                <Link to="/epadmin" className="dropdown-item text-black">Edit Profile</Link>
                                                <Link to="/cpadmin" className="dropdown-item text-black">Change Password</Link>
                                            </div>
                                        </div>
                                    </div>

                                    <Link to="/logout" className="btn btn-light rounded-0 py-4 px-md-5 d-none d-lg-block text-white"style={{backgroundColor:"#34699A",color:"white",marginRight:"10px"}}>
                                        Logout <i className="fa fa-arrow-right ms-3"></i>
                                    </Link>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
                </>);
            }
            else if (currentToken && currentRole === "manager") {
                setNavbarContent(<>    <div className="container-fluid px-0" style={{ backgroundColor: '#34699A', color: 'white' }}>
                    <div className="row gx-0">
                        <div className="col-lg-3 d-none d-lg-block" style={{ backgroundColor: '#34699A' }}>
                            <Link to="/" className="navbar-brand w-100 h-100 m-0 p-0 d-flex align-items-center justify-content-center">

                                <h2 className="m-0 text-white text-uppercase" style={{ 'color': "white" }}>Shipping War</h2>
                            </Link>
                        </div>
                        <div className="col-lg-9">
                            <div className="row gx-0 d-none d-lg-flex" style={{ backgroundColor: '#34699A' }}>
                                <div className="col-lg-7 px-5 text-start">
                                    <div className="h-100 d-inline-flex align-items-center py-2 me-4">
                                        <i className="fa fa-envelope me-2 text-white"></i>
                                        <p className="mb-0 text-white">Welcome : {localStorage.getItem('name') || localStorage.getItem('email')}</p>
                                    </div>
                                </div>
                            </div>

                            <nav className="navbar navbar-expand-lg navbar-light p-3 p-lg-0" style={{ backgroundColor: '#34699A' }}>
                                <Link to="/" className="navbar-brand d-block d-lg-none">
                                    <h1 className="m-0 text-white text-uppercase">Shipping War</h1>
                                </Link>
                                <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                                    <span className="navbar-toggler-icon"></span>
                                </button>

                                <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                                    <div className="navbar-nav mr-auto py-0">
                                        <Link to="/manager" className="nav-item nav-link text-white">Manager Home</Link>
                                        <Link to="/manageusers" className="nav-item nav-link text-white">Manage Users</Link>
                                        <Link to="/manageadmin" className="nav-item nav-link text-white">Manage Admin</Link>
                                        <Link to="/listofcategory" className="nav-item nav-link text-white">Categories</Link>
                                        <Link to="/showproduct" className="nav-item nav-link text-white">View Products</Link>
                                        
                                        <div className="nav-item dropdown">
                                            <span className="nav-link dropdown-toggle text-white" data-bs-toggle="dropdown">Settings</span>
                                            <div className="dropdown-menu rounded-0 m-0">
                                                <Link to="/epadmin" className="dropdown-item text-black">Edit Profile</Link>
                                                <Link to="/cpadmin" className="dropdown-item text-black">Change Password</Link>
                                            </div>
                                        </div>
                                    </div>

                                    <Link to="/logout" className="btn btn-light rounded-0 py-4 px-md-5 d-none d-lg-block text-white"style={{backgroundColor:"#34699A",color:"white",marginRight:"10px"}}>
                                        Logout <i className="fa fa-arrow-right ms-3"></i>
                                    </Link>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
                </>);
            }
            else if (currentToken && currentRole === "user") {
                setNavbarContent(<><div className="container-fluid px-0" style={{ backgroundColor: '#34699A', color: 'white' }}>
                    <div className="row gx-0">
                        <div className="col-lg-3 d-none d-lg-block" style={{ backgroundColor: '#34699A' }}>
                            <Link to="/" className="navbar-brand w-100 h-100 m-0 p-0 d-flex align-items-center justify-content-center">
                                <h2 className="m-0 text-uppercase" style={{ color: 'white' }}>Shipping War</h2>
                            </Link>
                        </div>
                        <div className="col-lg-9">
                            <div className="row gx-0 d-none d-lg-flex" style={{ backgroundColor: '#34699A' }}>
                                <div className="col-lg-7 px-5 text-start">
                                    <div className="h-100 d-inline-flex align-items-center py-2 me-4">
                                        <i className="fa fa-envelope me-2" style={{ color: 'white' }}></i>
                                        <p className="mb-0" style={{ color: 'white' }}>Welcome : {localStorage.getItem('email')}</p>
                                    </div>
                                </div>
                            </div>

                            <nav className="navbar navbar-expand-lg navbar-light p-3 p-lg-0" style={{ backgroundColor: '#34699A' }}>
                                <Link to="/" className="navbar-brand d-block d-lg-none">
                                    <h1 className="m-0 text-uppercase" style={{ color: 'white' }}>Shipping War</h1>
                                </Link>
                                <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                                    <div className="navbar-nav mr-auto py-0">
                                        <Link to="/user" className="nav-item nav-link" style={{ color: 'white' }}>User Home</Link>
                                        <Link to="/listofcategory" className="nav-item nav-link" style={{ color: 'white' }}>Listofcategory</Link>
                                        <Link to="/addproduct" className="nav-item nav-link" style={{ color: 'white' }}>Addproduct</Link>
                                        <Link to="/showproduct" className="nav-item nav-link" style={{ color: 'white' }}>View</Link>
                                        <div class="nav-item dropdown">
                                            <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" style={{ 'color': 'white' }} >Settings</a>
                                            <div class="dropdown-menu rounded-0 m-0">
                                                <a class="dropdown-item"><Link to="/epadmin">Edit Profile</Link></a>
                                                <a class="dropdown-item"><Link to="/cpadmin">Change Password</Link></a>
                                            </div>
                                        </div>

                                    </div>
                                    <Link to="/logout" className="btn btn-light rounded-0 py-4 px-md-5 d-none d-lg-block"  style={{backgroundColor:"#34699A",color:"white",marginRight:"10px"}}>
                                        Logout <i className="fa fa-arrow-right ms-3"></i>
                                    </Link>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
                </>);
            }
            else {
                setNavbarContent(<><div className="container-fluid px-0" style={{ backgroundColor: '#34699A', color: 'white' }}>
                    <div className="row gx-0">
                        <div className="col-lg-3 d-none d-lg-block" style={{ backgroundColor: '#34699A' }}>
                            <Link to="/" className="navbar-brand w-100 h-100 m-0 p-0 d-flex align-items-center justify-content-center">
                                <h2 className="m-0 text-uppercase" style={{ color: 'white' }}>Shipping War</h2>
                            </Link>
                        </div>
                        <div className="col-lg-9">
                            <div className="row gx-0 d-none d-lg-flex" style={{ backgroundColor: '#34699A' }}>
                                <div className="col-lg-7 px-5 text-start">
                                    <div className="h-100 d-inline-flex align-items-center py-2 me-4">
                                        <i className="fa fa-envelope me-2" style={{ color: 'white' }}></i>
                                        <p className="mb-0">info@example.com</p>
                                    </div>
                                    <div className="h-100 d-inline-flex align-items-center py-2">
                                        <i className="fa fa-phone-alt me-2" style={{ color: 'white' }}></i>
                                        <p className="mb-0">XXX XXX XXXX</p>
                                    </div>
                                </div>
                                <div className="col-lg-5 px-5 text-end">
                                    <div className="d-inline-flex align-items-center py-2">
                                        <a className="me-3" href="#"><i className="fab fa-facebook-f text-white"></i></a>
                                        <a className="me-3" href="#"><i className="fab fa-twitter text-white"></i></a>
                                        <a className="me-3" href="#"><i className="fab fa-linkedin-in text-white"></i></a>
                                        <a className="me-3" href="#"><i className="fab fa-instagram text-white"></i></a>
                                        <a href="#"><i className="fab fa-youtube text-white"></i></a>
                                    </div>
                                </div>
                            </div>

                            <nav className="navbar navbar-expand-lg navbar-light p-3 p-lg-0" style={{ backgroundColor: '#34699A' }}>
                                <Link to="/" className="navbar-brand d-block d-lg-none">
                                    <h1 className="m-0 text-uppercase" style={{ color: 'white' }}>Shipping War</h1>
                                </Link>
                                <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                                    <span className="navbar-toggler-icon"></span>
                                </button>

                                <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                                    <div className="navbar-nav mr-auto py-0">
                                        <Link to="/" className="nav-item nav-link text-white">Home</Link>
                                        <Link to="/about" className="nav-item nav-link text-white">About</Link>
                                        <Link to="/service" className="nav-item nav-link text-white">Services</Link>
                                        <Link to="/contact" className="nav-item nav-link text-white">Contact</Link>

                                        
                                        <Link to="/register" className="nav-item nav-link text-white">Register</Link>
                                    </div>

                                    <Link to="/login" className="btn btn-light rounded-0 py-4 px-md-5 d-none d-lg-block text-white " style={{backgroundColor:"#34699A",marginRight:"10px"}}>
                                        Login <i className="fa fa-arrow-right ms-3"></i>
                                    </Link>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
                </>);
            }
        };

        // initial set
        updateNavbar();

        // cleanup - no need for storage listener here as it's handled in first useEffect
    }, [role, token]);

        return (
            <>
    {/* Header Start */}
    {NavbarContent}
    {/* Header End */}
</>

    )
}

export default Navbar;
