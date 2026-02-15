import './Contact.css';
import { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for contacting us! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <>
      {/* Modern Contact Section */}
      <section className="contact_section modern-section">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="modern-heading">
              <i className="fas fa-envelope me-3"></i>
              Contact Us
            </h2>
            <p className="lead text-muted">
              Get in touch with us for any inquiries or support
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-6">
              <div className="modern-card h-100">
                <h3 className="modern-subheading mb-4">
                  <i className="fas fa-map-marker-alt me-2"></i>
                  Our Location
                </h3>
                <div className="contact-info">
                  <div className="info-item">
                    <i className="fas fa-phone"></i>
                    <div>
                      <h5>Phone</h5>
                      <p>+91 1234567890</p>
                    </div>
                  </div>
                  <div className="info-item">
                    <i className="fas fa-envelope"></i>
                    <div>
                      <h5>Email</h5>
                      <p>info@shippingwar.com</p>
                    </div>
                  </div>
                  <div className="info-item">
                    <i className="fas fa-map-marker-alt"></i>
                    <div>
                      <h5>Address</h5>
                      <p>123 Shipping Street, Logistics City, India</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="modern-card contact-form-card">
                <h3 className="modern-subheading mb-4">
                  <i className="fas fa-paper-plane me-2"></i>
                  Send Message
                </h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label-modern">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-control form-control-modern"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label-modern">Your Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control form-control-modern"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label-modern">Your Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="form-control form-control-modern"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="message" className="form-label-modern">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      className="form-control form-control-modern"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Enter your message"
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary-modern w-100">
                    <i className="fas fa-paper-plane me-2"></i>
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Contact Section */}
    </>
  );
}

export default Contact;
