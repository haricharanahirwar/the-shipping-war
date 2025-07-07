import './Service.css';
function Service(){
    return(
        <>
        {/* service section */}
      <section class="service_section layout_padding">
        <div class="container">
          <div class="d-flex justify-content-center">
            <h2 class="heading_style">
              Our Services
            </h2>
          </div>
          <div class="row layout_padding2-top">
            <div class="col-md-4">
              <div class="service_img-box s-b-1">
                <img src="/assets/images/service-1.jpg" alt="" />
                <div class="d-flex">
                  <h3>
                    CARGO

                  </h3>
                </div>
              </div>
              <div class="service-detail">
                <p>
                  aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.Excepteur
                </p>
                <div class="d-flex justify-content-end">
                  <a href="" class="service-btn">
                    See More
                  </a>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="service_img-box s-b-2">
                <img src="/assets/images/service-2.jpg" alt="" />
                <div class="d-flex">
                  <h3>
                    LOGISTIC SERVICE


                  </h3>
                </div>
              </div>
              <div class="service-detail">
                <p>
                  aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.Excepteur
                </p>
                <div class="d-flex justify-content-end">
                  <a href="" class="service-btn">
                    See More
                  </a>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="service_img-box s-b-3">
                <img src="/assets/images/service-3.jpg" alt="" />
                <div class="d-flex">
                  <h3>
                    STORAGE


                  </h3>
                </div>
              </div>
              <div class="service-detail">
                <p>
                  aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.Excepteur
                </p>
                <div class="d-flex justify-content-end">
                  <a href="" class="service-btn">
                    See More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* end service section */}

        </>
    )
}
export default Service;