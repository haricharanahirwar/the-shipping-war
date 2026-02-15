import './Testimonial.css';

function Testimonial() {
  const testimonials = [
    {
      id: 1,
      name: 'Harry Rathore',
      role: 'Business Owner',
      image: '/assets/images/myprofile.jpeg',
      text: 'Excellent service! The shipping was fast and secure. Highly recommend their logistics solutions for any business needs.',
      rating: 5
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      role: 'E-commerce Manager',
      image: '/assets/images/pexels-mineiamartins-16765239.jpg',
      text: 'Professional team with great attention to detail. They handled our cargo with utmost care and delivered on time.',
      rating: 5
    },
    {
      id: 3,
      name: 'Michael Chen',
      role: 'Supply Chain Director',
      image: '/assets/images/pexels-frans-van-heerden-201846-2881632.jpg',
      text: 'Outstanding logistics partner! Their tracking system is top-notch and customer service is always responsive.',
      rating: 5
    },
    {
      id: 4,
      name: 'Emma Wilson',
      role: 'Operations Manager',
      image: '/assets/images/pexels-garrison-gao-56316964-30991960.jpg',
      text: 'Reliable and efficient shipping solutions. They have helped streamline our entire distribution process.',
      rating: 5
    }
  ];

  return (
    <>
      {/* Modern Testimonial Section */}
      <section className="client_section modern-section">
        <div className="container">
          <div className="text-center mb-5">
            <div className="section-badge">
              <i className="fas fa-users me-2"></i>
              Client Testimonials
            </div>
            <h2 className="modern-heading">
              What Our <span className="gradient-text">Clients Say</span>
            </h2>
            <p className="lead text-muted">
              Trusted by businesses worldwide for reliable shipping solutions
            </p>
          </div>

          <div className="row g-4">
            {testimonials.map((testimonial, index) => (
              <div className="col-lg-6 col-md-6 col-sm-12" key={testimonial.id}>
                <div 
                  className="testimonial-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="quote-icon-wrapper">
                    <i className="fas fa-quote-left"></i>
                  </div>
                  
                  <p className="testimonial-text">{testimonial.text}</p>
                  
                  <div className="testimonial-rating">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <i key={i} className="fas fa-star"></i>
                    ))}
                  </div>
                  
                  <div className="testimonial-footer">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="testimonial-img"
                    />
                    <div className="testimonial-info">
                      <h5 className="testimonial-name">{testimonial.name}</h5>
                      <p className="testimonial-role">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* End Testimonial Section */}
    </>
  );
}

export default Testimonial;
