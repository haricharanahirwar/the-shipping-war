import './Service.css';

function Service() {
  const services = [
    {
      id: 1,
      title: 'CARGO',
      image: '/assets/images/pexels-gaion-17070585.jpg',
      icon: 'fas fa-box',
      description: 'Reliable cargo services with real-time tracking and secure handling for all your shipping needs.'
    },
    {
      id: 2,
      title: 'LOGISTIC SERVICE',
      image: '/assets/images/pexels-junsu-18087861.jpg',
      icon: 'fas fa-shipping-fast',
      description: 'Comprehensive logistics solutions designed to optimize your supply chain and reduce costs.'
    },
    {
      id: 3,
      title: 'STORAGE',
      image: '/assets/images/pexels-bogdankrupin-16663684.jpg',
      icon: 'fas fa-warehouse',
      description: 'Secure storage facilities with climate control and 24/7 monitoring for your valuable goods.'
    }
  ];

  return (
    <>
      {/* Modern Service Section */}
      <section className="service_section modern-section">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="modern-heading">
              <i className="fas fa-concierge-bell me-3"></i>
              Our Services
            </h2>
            <p className="lead text-muted">
              Comprehensive shipping solutions tailored to your needs
            </p>
          </div>

          <div className="row g-4">
            {services.map((service) => (
              <div className="col-md-4" key={service.id}>
                <div className="modern-card service-card h-100">
                  <div className="service-image-container">
                    <img src={service.image} alt={service.title} className="img-fluid" />
                    <div className="service-overlay">
                      <i className={`${service.icon} service-icon`}></i>
                    </div>
                  </div>
                  <div className="service-content">
                    <h3 className="service-title">{service.title}</h3>
                    <p className="text-muted mb-4">{service.description}</p>
                    <button className="btn btn-secondary-modern w-100">
                      <span>Learn More</span>
                      <i className="fas fa-arrow-right ms-2"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* End Service Section */}
    </>
  );
}

export default Service;
