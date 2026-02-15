import './Slider.css';
import { useState, useEffect } from 'react';

function Slider() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentBg, setCurrentBg] = useState(0);
  const [nextBg, setNextBg] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Rotating background images
  const backgroundImages = [
    '/assets/images/pexels-bogdankrupin-16663684.jpg',
    '/assets/images/pexels-gaion-17070585.jpg',
    '/assets/images/pexels-junsu-18087861.jpg',
    '/assets/images/pexels-rdne-7580787.jpg',
    '/assets/images/ttt.jpg',
    '/assets/images/photo_6237868432238428760_x.jpg'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setNextBg((prev) => (prev + 1) % backgroundImages.length);
      
      setTimeout(() => {
        setCurrentBg((prev) => (prev + 1) % backgroundImages.length);
        setIsTransitioning(false);
      }, 1000);
    }, 4000);

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching for: ${searchQuery}`);
  };

  return (
    <>
      <div className="hero_area modern-hero">
        {/* Background Layer 1 - Current Image */}
        <div 
          className="hero-bg-layer"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(102, 126, 234, 0.4) 0%, rgba(118, 75, 162, 0.4) 100%), url(${backgroundImages[currentBg]})`,
            opacity: 1
          }}
        />
        
        {/* Background Layer 2 - Next Image for Crossfade */}
        <div 
          className="hero-bg-layer"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(102, 126, 234, 0.4) 0%, rgba(118, 75, 162, 0.4) 100%), url(${backgroundImages[nextBg]})`,
            opacity: isTransitioning ? 1 : 0
          }}
        />
        
        <section className="slider_section">
          <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
              <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
            </ol>
            
            <div className="carousel-inner">
              {[1, 2, 3, 4].map((item) => (
                <div className={`carousel-item ${item === 1 ? 'active' : ''}`} key={item}>
                  <div className="container">
                    <div className="slider_item-container">
                      <div className="row align-items-center">
                        <div className="col-md-6">
                          <div className="slider_item-detail">
                            <div className="slider_form-box modern-search-box">
                              <form onSubmit={handleSearch}>
                                <div className="search_input">
                                  <input
                                    type="text"
                                    placeholder="Search for shipping services..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                  />
                                  <i className="fas fa-search search-icon"></i>
                                </div>
                                <button type="submit" className="btn btn-primary-modern">
                                  <i className="fas fa-search me-2"></i>
                                  Search
                                </button>
                              </form>
                            </div>
                            
                            <div className="hero-content">
                              <h1 className="hero-title">
                                Unbeatable <br />
                                <span className="gradient-text">Trucking & Transport</span> <br />
                                Services
                              </h1>

                              <div className="d-flex gap-3 mt-4">
                                <button className="btn btn-primary-modern">
                                  <span>Read More</span>
                                  <i className="fas fa-arrow-right ms-2"></i>
                                </button>
                                <button className="btn btn-secondary-modern">
                                  <span>Get A Quote</span>
                                  <i className="fas fa-file-invoice ms-2"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="col-md-6">
                          <div className="slider_img-box">
                            <div className="hero-illustration">
                              <i className="fas fa-truck-moving"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Slider;
