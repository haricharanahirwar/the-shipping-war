
import './Navbar.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Auth from '../authcomponent/Auth';
import { Navigate } from 'react-router-dom';

function Navbar() {

  const [setyesbutton, handleLogout] = useState();
  const [sernobutton, handleNoButton] = useState();
  const [NavbarContent, setNavbarContent] = useState();


  useEffect(() => {
    setInterval(() => {
      if (localStorage.getItem("token") != undefined && localStorage.getItem("role") == "admin") {
        setNavbarContent(<section className="header_section">
          <div className="container maynewclass">
            {/* Mobile Navbar */}
            <nav className="navbar navbar-expand-lg custom_nav-container d-lg-none">
              <Link className="navbar-brand" to="/">
                <div className="logo-box">
                  <img src="/assets/images/logo.png" alt="" />
                  <span>Shipping War</span>
                </div>
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav">
                  <li className="nav-item active">
                    <Link className="nav-link" to="/">AdminHome <span className="sr-only">(current)</span></Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/manageusers">manageusers</Link>
                  </li>

                  <div class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" style={{ 'color': 'black' }} >Manage Category</a>
                    <div class="dropdown-menu rounded-0 m-0">
                      <a class="dropdown-item"> <Link className="nav-link" to="/addcategory">AddCategory</Link></a>
                      <a class="dropdown-item"> <Link className="nav-link" to="/addsubcategory">AddSubCategory</Link></a>
                    </div>
                  </div>


                  
                  <div class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" style={{ 'color': '#FDA117' }} >Settings</a>
                    <div class="dropdown-menu rounded-0 m-0">
                      <a class="dropdown-item"><Link to="/epadmin">Edit Profile</Link></a>
                      <a class="dropdown-item"><Link to="/cpadmin">Change Password</Link></a>
                    </div>
                  </div>

                  <li className="nav-item">
                    <Link className="nav-link" to="/Logout" >Logout</Link>
                  </li>
                </ul>
              </div>
            </nav>

            {/* Desktop Header */}
            <div className="header_container">
              <div className="logo-box">
                <img src="/assets/images/logo.png" alt="" />
                <span>Shipping War</span>
              </div>

              <div>
                <div className="header_top">
                  <div className="header_top-contact">
                    <a href="/" className="ml-4">
                      <div><img src="/assets/images/phone.png" alt="" /></div>
                      <span>+91XXXXXX4785</span>
                    </a>
                    <a href="/" className="ml-4">
                      <div><img src="/assets/images/mail.png" alt="" /></div>
                      <span>Welcome{localStorage.getItem("email")}</span>
                    </a>
                  </div>

                  <div className="header_top-social">
                    <div><a href="https://www.facebook.com/"><img src="/assets/images/fb.png" alt="" /></a></div>
                    <div><a href="/"><img src="/assets/images/twitter.png" alt="" /></a></div>
                    <div><a href="/"><img src="/assets/images/g-plus.png" alt="" /></a></div>
                    <div><a href="/"><img src="/assets/images/linkedin.png" alt="" /></a></div>
                  </div>
                </div>

                {/* Desktop Navbar */}
                <div className="header_btm">
                  <nav className="navbar navbar-expand-lg custom_nav-container pt-3">
                    <button
                      className="navbar-toggler"
                      type="button"
                      data-toggle="collapse"
                      data-target="#navbarSupportedContent"
                      aria-controls="navbarSupportedContent"
                      aria-expanded="false"
                      aria-label="Toggle navigation"
                    >
                      <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                      <div className="d-flex mx-auto flex-column flex-lg-row align-items-center">
                        <ul className="navbar-nav">
                          <li className="nav-item active">
                            <Link className="nav-link" to="/">adminHome <span className="sr-only">(current)</span></Link>
                          </li>
                          <li className="nav-item">
                            <Link className="nav-link" to="/manageusers">manageusers</Link>
                          </li>
                          <div class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" style={{ 'color': 'black' }} >Manage Category</a>
                            <div class="dropdown-menu rounded-0 m-0">
                              <a class="dropdown-item"> <Link className="nav-link" to="/addcategory">AddCategory</Link></a>
                              <a class="dropdown-item"> <Link className="nav-link" to="/addsubcategory">AddSubCategory</Link></a>
                              

                            </div>
                          </div>
                          <li className="nav-item">
                          </li>
                          <div class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" style={{ 'color': 'black' }} >Settings</a>
                            <div class="dropdown-menu rounded-0 m-0">
                              <a class="dropdown-item"><Link to="/epadmin">Edit Profile</Link></a>
                              <a class="dropdown-item"><Link to="/cpadmin">Change Password</Link></a>
                            </div>
                          </div>
                          <li className="nav-item">
                            <Link className="nav-link" to="/Logout">Logout</Link>
                          </li>

                        </ul>
                      </div>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </section>);
      }
      else if (localStorage.getItem("token") != undefined && localStorage.getItem("role") == "user") {
        setNavbarContent(<section className="header_section">
          <div className="container maynewclass">
            {/* Mobile Navbar */}
            <nav className="navbar navbar-expand-lg custom_nav-container d-lg-none">
              <Link className="navbar-brand" to="/">
                <div className="logo-box">
                  <img src="/assets/images/logo.png" alt="" />
                  <span>Shipping War</span>
                </div>
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav">
                  <li className="nav-item active">
                    <Link className="nav-link" to="/">UHome <span className="sr-only">(current)</span></Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/Listofcategory">Listofcategory</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/addproduct">Addproduct</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/showproduct">View</Link>
                  </li>
                 
                  <div class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" style={{ 'color': 'black' }} >Settings</a>
                    <div class="dropdown-menu rounded-0 m-0">
                      <a class="dropdown-item"><Link to="/epadmin">Edit Profile</Link></a>
                      <a class="dropdown-item"><Link to="/cpadmin">Change Password</Link></a>
                    </div>
                  </div>
                  <li className="nav-item">
                    <Link className="nav-link" to="/Logout">Logout</Link>
                  </li>

                </ul>
              </div>
            </nav>

            {/* Desktop Header */}
            <div className="header_container">
              <div className="logo-box">
                <img src="/assets/images/logo.png" alt="" />
                <span>Shipping War</span>
              </div>

              <div>
                <div className="header_top">
                  <div className="header_top-contact">
                    <a href="/" className="ml-4">
                      <div><img src="/assets/images/phone.png" alt="" /></div>
                      <span>(+91)258964785</span>
                    </a>
                    <a href="/" className="ml-4">
                      <div><img src="/assets/images/mail.png" alt="" /></div>
                      <span>Welcome {localStorage.getItem("email")}</span>
                    </a>
                  </div>

                  <div className="header_top-social">
                    <div><a href="/"><img src="/assets/images/fb.png" alt="" /></a></div>
                    <div><a href="/"><img src="/assets/images/twitter.png" alt="" /></a></div>
                    <div><a href="/"><img src="/assets/images/g-plus.png" alt="" /></a></div>
                    <div><a href="/"><img src="/assets/images/linkedin.png" alt="" /></a></div>
                  </div>
                </div>

                {/* Desktop Navbar */}
                <div className="header_btm">
                  <nav className="navbar navbar-expand-lg custom_nav-container pt-3">
                    <button
                      className="navbar-toggler"
                      type="button"
                      data-toggle="collapse"
                      data-target="#navbarSupportedContent"
                      aria-controls="navbarSupportedContent"
                      aria-expanded="false"
                      aria-label="Toggle navigation"
                    >
                      <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                      <div className="d-flex mx-auto flex-column flex-lg-row align-items-center">
                        <ul className="navbar-nav">
                          <li className="nav-item active">
                            <Link className="nav-link" to="/">UHome <span className="sr-only">(current)</span></Link>
                          </li>
                          <li className="nav-item">
                            <Link className="nav-link" to="/Listofcategory">Listofcategory</Link>
                          </li>
                          <li className="nav-item">
                            <Link className="nav-link" to="/addproduct">Addproduct</Link>
                          </li>
                          <li className="nav-item">
                            <Link className="nav-link" to="/showproduct">view</Link>
                          </li>
                          

                          <div class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" style={{ 'color': 'black' }} >Settings</a>
                            <div class="dropdown-menu rounded-0 m-0">
                              <a class="dropdown-item"><Link to="/epadmin">Edit Profile</Link></a>
                              <a class="dropdown-item"><Link to="/cpadmin">Change Password</Link></a>
                            </div>
                          </div>
                          <li className="nav-item">
                            <Link className="nav-link" to="/Logout">Logout</Link>
                          </li>

                        </ul>
                      </div>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </section>);
      }
      else {
        setNavbarContent(<section className="header_section ">
          <div className="container ">
            {/* Mobile Navbar */}
            <nav className="navbar navbar-expand-lg custom_nav-container d-lg-none" >
              <Link className="navbar-brand" to="/">
                <div className="logo-box">
                  <img src="/assets/images/logo.png" alt="" />
                  <span>Shipping War</span>
                </div>
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav">
                  <li className="nav-item active">
                    <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/About">About</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/Service">Service</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/Register">Register</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/Login">Login</Link>
                  </li>

                </ul>
              </div>
            </nav>

            {/* Desktop Header */}
            <div className="header_container">
              <div className="logo-box">
                <img src="/assets/images/logo.png" alt="" />
                <span>Shipping War</span>
              </div>

              <div>
                <div className="header_top">
                  <div className="header_top-contact">
                    <a href="/" className="ml-4">
                      <div><img src="/assets/images/phone.png" alt="" /></div>
                      <span>+91258964785</span>
                    </a>
                    <a href="/" className="ml-4">
                      <div><img src="/assets/images/mail.png" alt="" /></div>
                      <span>Welcome{localStorage.getItem("email")} </span>
                    </a>
                  </div>

                  <div className="header_top-social">
                    <div><a href="https://www.facebook.com/"><img src="/assets/images/fb.png" alt="" /></a></div>
                    <div><a href="https://www.facebook.com/TwitterInc/"><img src="/assets/images/twitter.png" alt="" /></a></div>
                    <div><a href="https://www.google.co.in/"><img src="/assets/images/g-plus.png" alt="" /></a></div>
                    <div><a href="
                    "><img src="/assets/images/linkedin.png" alt="" /></a></div>
                  </div>
                </div>

                {/* Desktop Navbar */}
                <div className="header_btm">
                  <nav className="navbar navbar-expand-lg custom_nav-container pt-3">
                    <button
                      className="navbar-toggler"
                      type="button"
                      data-toggle="collapse"
                      data-target="#navbarSupportedContent"
                      aria-controls="navbarSupportedContent"
                      aria-expanded="false"
                      aria-label="Toggle navigation"
                    >
                      <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                      <div className="d-flex mx-auto flex-column flex-lg-row align-items-center">
                        <ul className="navbar-nav">
                          <li className="nav-item active">
                            <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                          </li>


                          <li className="nav-item">
                            <Link className="nav-link" to="/About">About</Link>
                          </li>
                          <li className="nav-item">
                            <Link className="nav-link" to="/Service">Service</Link>
                          </li>
                          <li className="nav-item">
                            <Link className="nav-link" to="/Register">Register</Link>
                          </li>
                          <li className="nav-item">
                            <Link className="nav-link" to="/Login">Login</Link>
                          </li>


                        </ul>
                      </div>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </section>);
      }
    }, 1)
  }, []);


  return (
    <>
      {/* Header Start */}
      {<Auth />}
      {NavbarContent}
      {/* Header End */}
    </>
  )
}

export default Navbar;
