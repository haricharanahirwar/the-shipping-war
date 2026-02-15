import './Company.css';

function Company() {
  return (
    <>
      {/* Modern Company Section */}
      <section className="company_section modern-section">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-6">
              <div className="company-content">
                <div className="section-badge">
                  <i className="fas fa-building me-2"></i>
                  About Our Company
                </div>
                
                <h2 className="modern-heading">
                  Leading the Way in <br />
                  <span className="gradient-text">Logistics Excellence</span>
                </h2>
                
                <p className="company-description">
                  With over 20 years of experience in the shipping and logistics industry, 
                  we've built a reputation for reliability, efficiency, and customer satisfaction. 
                  Our state-of-the-art fleet and dedicated team ensure your cargo reaches its 
                  destination safely and on time.
                </p>

                <div className="company-features">
                  <div className="feature-item">
                    <div className="feature-icon">
                      <i className="fas fa-check-circle"></i>
                    </div>
                    <div className="feature-text">
                      <h5>24/7 Support</h5>
                      <p>Round-the-clock customer service</p>
                    </div>
                  </div>

                  <div className="feature-item">
                    <div className="feature-icon">
                      <i className="fas fa-shield-alt"></i>
                    </div>
                    <div className="feature-text">
                      <h5>Secure Shipping</h5>
                      <p>Advanced tracking and security</p>
                    </div>
                  </div>

                  <div className="feature-item">
                    <div className="feature-icon">
                      <i className="fas fa-clock"></i>
                    </div>
                    <div className="feature-text">
                      <h5>On-Time Delivery</h5>
                      <p>98% on-time delivery rate</p>
                    </div>
                  </div>
                </div>

                <div className="company-stats">
                  <div className="stat-box">
                    <h3>500+</h3>
                    <p>Trucks</p>
                  </div>
                  <div className="stat-box">
                    <h3>10K+</h3>
                    <p>Deliveries</p>
                  </div>
                  <div className="stat-box">
                    <h3>50+</h3>
                    <p>Countries</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="company-images">
                <div className="main-image">
                  <img 
                    src="/assets/images/pexels-bogdankrupin-16663684.jpg" 
                    alt="Company Main" 
                    className="img-fluid"
                  />
                  <div className="image-badge">
                    <i className="fas fa-award"></i>
                    <span>20+ Years</span>
                  </div>
                </div>
                
                <div className="secondary-image">
                  <img 
                    src="/assets/images/pexels-junsu-18087861.jpg" 
                    alt="Truck Fleet" 
                    className="img-fluid"
                  />
                </div>

                <div className="floating-card">
                  <div className="card-icon">
                    <i className="fas fa-truck-loading"></i>
                  </div>
                  <div className="card-content">
                    <h4>Fast Delivery</h4>
                    <p>Express shipping available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Company Section */}
    </>
  );
}

export default Company;