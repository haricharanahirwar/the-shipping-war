import './Features.css';

function Features() {
  const features = [
    {
      icon: 'fa-file-invoice',
      title: 'Quote',
      description: 'Get instant shipping quotes',
      color: '#667eea'
    },
    {
      icon: 'fa-calendar-check',
      title: 'Booking',
      description: 'Book your shipment online',
      color: '#764ba2'
    },
    {
      icon: 'fa-file-alt',
      title: 'Customs Clearance',
      description: 'Smooth customs processing',
      color: '#f093fb'
    },
    {
      icon: 'fa-map-marker-alt',
      title: 'Tracking',
      description: 'Real-time shipment tracking',
      color: '#4facfe'
    },
    {
      icon: 'fa-comments',
      title: 'Communication',
      description: 'Direct operator contact',
      color: '#43e97b'
    },
    {
      icon: 'fa-credit-card',
      title: 'Settlement',
      description: 'Easy payment processing',
      color: '#fa709a'
    }
  ];

  return (
    <section className="features-section">
      <div className="container">
        <div className="features-header">
          <h2 className="section-title">
            All Services in <span className="gradient-text">One Platform</span>
          </h2>
          <p className="section-subtitle">
            From instant quotes to booking and settlement - everything you need for seamless logistics
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div 
              className="feature-card" 
              key={index}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="feature-icon-wrapper" style={{ background: feature.color }}>
                <i className={`fas ${feature.icon}`}></i>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <div className="feature-arrow">
                <i className="fas fa-arrow-right"></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
