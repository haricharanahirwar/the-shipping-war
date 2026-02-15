import "./Footer.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function Footer() {
  const [newsletter, setNewsletter] = useState({
    name: '',
    email: ''
  });

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you ${newsletter.name}! You've subscribed to our newsletter.`);
    setNewsletter({ name: '', email: '' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Modern Footer Section */}
      <footer className="modern-footer">
        <div className="footer-gradient-bg">
          <div className="container">
            <div className="row g-4 py-5">
              {/* Company Info */}
              <div className="col-lg-3 col-md-6">
                <div className="footer-section">
                  <div className="footer-logo">
                    <i className="fas fa-shipping-fast"></i>
                    <span>Shipping War</span>
                  </div>
                  <p className="footer-description">
                    Your trusted platform for reverse auction shipping services. 
                    Get the best deals from competitive bidders.
                  </p>
                  <div className="footer-social">
                    <a href="#" className="social-icon">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" className="social-icon">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#" className="social-icon">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a href="#" className="social-icon">
                      <i className="fab fa-instagram"></i>
                    </a>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="col-lg-3 col-md-6">
                <div className="footer-section">
                  <h5 className="footer-heading">
                    <i className="fas fa-link me-2"></i>
                    Quick Links
                  </h5>
                  <ul className="footer-links">
                    <li>
                      <Link to="/">
                        <i className="fas fa-chevron-right"></i>
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link to="/about">
                        <i className="fas fa-chevron-right"></i>
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link to="/service">
                        <i className="fas fa-chevron-right"></i>
                        Services
                      </Link>
                    </li>
                    <li>
                      <Link to="/showproduct">
                        <i className="fas fa-chevron-right"></i>
                        Browse Products
                      </Link>
                    </li>
                    <li>
                      <Link to="/contact">
                        <i className="fas fa-chevron-right"></i>
                        Contact
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Contact Info */}
              <div className="col-lg-3 col-md-6">
                <div className="footer-section">
                  <h5 className="footer-heading">
                    <i className="fas fa-map-marker-alt me-2"></i>
                    Contact Info
                  </h5>
                  <ul className="footer-contact">
                    <li>
                      <i className="fas fa-map-marker-alt"></i>
                      <span>Ataldwar, LIG Colony<br />Indore, India</span>
                    </li>
                    <li>
                      <i className="fas fa-phone"></i>
                      <span>+91 8719912062</span>
                    </li>
                    <li>
                      <i className="fas fa-envelope"></i>
                      <a href="mailto:ShippingWar@gmail.com">
                        ahirwarharicharan8719@gmail.com
                      </a>
                    </li>
                    <li>
                      <i className="fas fa-clock"></i>
                      <span>Mon - Sat: 9:00 AM - 6:00 PM</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Newsletter */}
              <div className="col-lg-3 col-md-6">
                <div className="footer-section">
                  <h5 className="footer-heading">
                    <i className="fas fa-envelope-open-text me-2"></i>
                    Newsletter
                  </h5>
                  <p className="footer-newsletter-text">
                    Subscribe to get latest updates and offers!
                  </p>
                  <form onSubmit={handleNewsletterSubmit} className="footer-newsletter-form">
                    <div className="form-group mb-3">
                      <input
                        type="text"
                        className="form-control footer-input"
                        placeholder="Your Name"
                        value={newsletter.name}
                        onChange={(e) => setNewsletter({ ...newsletter, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group mb-3">
                      <input
                        type="email"
                        className="form-control footer-input"
                        placeholder="Your Email"
                        value={newsletter.email}
                        onChange={(e) => setNewsletter({ ...newsletter, email: e.target.value })}
                        required
                      />
                    </div>
                    <button type="submit" className="btn footer-subscribe-btn">
                      <i className="fas fa-paper-plane me-2"></i>
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* Footer Bottom */}
            <div className="footer-bottom">
              <div className="row align-items-center">
                <div className="col-md-6 text-center text-md-start">
                  <p className="footer-copyright">
                    © 2026 <strong>Shipping War</strong>. All Rights Reserved.
                  </p>
                </div>
                <div className="col-md-6 text-center text-md-end">
                  <div className="footer-bottom-links">
                    <Link to="/privacy">Privacy Policy</Link>
                    <span className="separator">|</span>
                    <Link to="/terms">Terms & Conditions</Link>
                    <span className="separator">|</span>
                    <button onClick={scrollToTop} className="back-to-top">
                      <i className="fas fa-arrow-up"></i>
                      Back to Top
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* End Modern Footer */}
    </>
  );
}

export default Footer;
