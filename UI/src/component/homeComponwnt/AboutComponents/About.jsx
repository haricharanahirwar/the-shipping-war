import './About.css';

function About() {
  return (
    <>
      {/* Modern About Section */}
      <section className="about_section modern-section">
        <div className="container">
          <div className="row mb-5">
            <div className="col text-center">
              <div className="section-badge">
                <i className="fas fa-info-circle me-2"></i>
                About Our Company
              </div>
              <h2 className="modern-heading">
                Your Trusted Partner in <br />
                <span className="gradient-text">Global Shipping Solutions</span>
              </h2>
              <p className="lead text-muted">
                Delivering excellence in shipping and logistics services worldwide
              </p>
            </div>
          </div>

          <div className="row align-items-center g-5 mb-5">
            <div className="col-lg-6">
              <div className="about-image-wrapper">
                <img 
                  src="/assets/images/pexels-gaion-17070585.jpg" 
                  alt="About Shipping War" 
                  className="img-fluid about-main-image"
                />
                <div className="about-badge">
                  <div className="badge-content">
                    <h3>20+</h3>
                    <p>Years Experience</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6">
              <div className="about-content">
                <h3 className="about-title">
                  Leading the Way in Logistics Excellence
                </h3>
                <p className="about-description">
                  Shipping War is a premier logistics and transportation company dedicated to providing 
                  seamless shipping solutions across the globe. With over two decades of experience, 
                  we've built a reputation for reliability, efficiency, and customer satisfaction.
                </p>
                <p className="about-description">
                  Our state-of-the-art fleet and dedicated team ensure your cargo reaches its 
                  destination safely and on time. We leverage cutting-edge technology and industry 
                  expertise to deliver exceptional service at competitive prices.
                </p>

                <div className="about-features">
                  <div className="feature-box">
                    <div className="feature-icon">
                      <i className="fas fa-shield-alt"></i>
                    </div>
                    <div className="feature-content">
                      <h5>Secure & Safe</h5>
                      <p>Advanced tracking and security measures</p>
                    </div>
                  </div>

                  <div className="feature-box">
                    <div className="feature-icon">
                      <i className="fas fa-clock"></i>
                    </div>
                    <div className="feature-content">
                      <h5>On-Time Delivery</h5>
                      <p>98% on-time delivery success rate</p>
                    </div>
                  </div>

                  <div className="feature-box">
                    <div className="feature-icon">
                      <i className="fas fa-headset"></i>
                    </div>
                    <div className="feature-content">
                      <h5>24/7 Support</h5>
                      <p>Round-the-clock customer assistance</p>
                    </div>
                  </div>
                </div>

                <div className="about-cta">
                  <button className="btn btn-primary-modern">
                    <span>Learn More About Us</span>
                    <i className="fas fa-arrow-right ms-2"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="row g-4">
            <div className="col-md-3 col-sm-6">
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-truck"></i>
                </div>
                <h3 className="stat-number">500+</h3>
                <p className="stat-label">Fleet Vehicles</p>
              </div>
            </div>

            <div className="col-md-3 col-sm-6">
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-box"></i>
                </div>
                <h3 className="stat-number">10K+</h3>
                <p className="stat-label">Deliveries Made</p>
              </div>
            </div>

            <div className="col-md-3 col-sm-6">
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-globe"></i>
                </div>
                <h3 className="stat-number">50+</h3>
                <p className="stat-label">Countries Served</p>
              </div>
            </div>

            <div className="col-md-3 col-sm-6">
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-smile"></i>
                </div>
                <h3 className="stat-number">5K+</h3>
                <p className="stat-label">Happy Clients</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End About Section */}
    </>
  );
}

export default About;
