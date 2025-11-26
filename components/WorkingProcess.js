const WorkingProcess = () => {
  return (
    <section className="working-section-2 section-padding">
      <div className="container" style={{ maxWidth: '1200px', paddingLeft: '3rem', paddingRight: '3rem' }}>
        <div className="section-title text-center">
          <span className="sub-content wow fadeInUp" style={{ fontSize: '0.75rem', padding: '4px 10px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px', width: 'fit-content' }}>
            <img src="assets/img/bale.png" alt="img" style={{ width: '14px', height: '14px' }} />
            How It Works
          </span>
          <h2 className="wow fadeInUp" data-wow-delay=".3s">
            How to Buy &amp; Sell Tools at Cheap Prices <br />
            Simple Steps for Buyers &amp; Sellers
          </h2>
        </div>
        <div className="row align-items-center justify-content-between">
          <div className="col-lg-8 wow fadeInUp" data-wow-delay=".3s">
            <div className="working-card-items" style={{ padding: '20px 50px' }}>
              <div className="icon">
                <img src="assets/img/working-process/icon-1.png" alt="img" />
              </div>
              <div className="content">
                <span className="sub-title" style={{ fontSize: '14px', padding: '6px 15px', marginBottom: '12px' }}>Step 01</span>
                <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>Browse &amp; Discover Tools</h3>
                <p style={{ fontSize: '14px', lineHeight: '1.5', marginBottom: '0' }}>
                  Explore thousands of digital tools including SEO tools, <br />{" "}
                  streaming accounts, AI tools, and course accounts at affordable prices
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 wow fadeInUp" data-wow-delay=".5s">
            <div className="arrow-image">
              <img src="assets/img/working-process/arrow-down.png" alt="img" />
            </div>
          </div>
          <div className="col-lg-3 wow fadeInUp" data-wow-delay=".3s">
            <div className="arrow-image text-center">
              <img
                src="assets/img/working-process/arrow-revers.png"
                alt="img"
              />
            </div>
          </div>
          <div className="col-lg-8 wow fadeInUp" data-wow-delay=".5s">
            <div className="working-card-items" style={{ padding: '20px 50px' }}>
              <div className="content">
                <span className="sub-title" style={{ fontSize: '14px', padding: '6px 15px', marginBottom: '12px' }}>Step 02</span>
                <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>Compare Prices &amp; Reviews</h3>
                <p style={{ fontSize: '14px', lineHeight: '1.5', marginBottom: '0' }}>
                  Compare prices from verified sellers and read authentic <br />{" "}
                  reviews from real buyers to make informed decisions
                </p>
              </div>
              <div className="icon">
                <img src="assets/img/working-process/icon-2.png" alt="img" />
              </div>
            </div>
          </div>
          <div className="col-lg-8 wow fadeInUp" data-wow-delay=".3s">
            <div className="working-card-items" style={{ padding: '20px 50px' }}>
              <div className="icon">
                <img src="assets/img/working-process/icon-3.png" alt="img" />
              </div>
              <div className="content">
                <span className="sub-title" style={{ fontSize: '14px', padding: '6px 15px', marginBottom: '12px' }}>Step 03</span>
                <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>Buy or Sell Securely</h3>
                <p style={{ fontSize: '14px', lineHeight: '1.5', marginBottom: '0' }}>
                  Complete secure transactions with verified sellers or <br />{" "}
                  list your tools and start selling to thousands of buyers
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 wow fadeInUp" data-wow-delay=".5s">
            <div className="arrow-image">
              <img src="assets/img/working-process/arrow-down.png" alt="img" />
            </div>
          </div>
          <div className="col-lg-3 wow fadeInUp" data-wow-delay=".3s">
            <div className="arrow-image text-center">
              <img
                src="assets/img/working-process/arrow-revers.png"
                alt="img"
              />
            </div>
          </div>
          <div className="col-lg-8 wow fadeInUp" data-wow-delay=".5s">
            <div className="working-card-items" style={{ padding: '20px 50px' }}>
              <div className="content">
                <span className="sub-title" style={{ fontSize: '14px', padding: '6px 15px', marginBottom: '12px' }}>Step 04</span>
                <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>Save Money &amp; Grow</h3>
                <p style={{ fontSize: '14px', lineHeight: '1.5', marginBottom: '0' }}>
                  Get premium tools at up to 80% cheaper prices and <br />{" "}
                  grow your business or personal projects with verified accounts
                </p>
              </div>
              <div className="icon">
                <img src="assets/img/working-process/icon-4.png" alt="img" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .working-card-items {
          transition: all 0.3s ease-in-out;
        }
        .working-card-items:hover {
          background-color: #5C30FD !important;
        }
        .working-card-items:hover h3 {
          color: #ffffff !important;
        }
        .working-card-items:hover p {
          color: #ffffff !important;
        }
        .working-card-items:hover .sub-title {
          background-color: rgba(255, 255, 255, 0.2) !important;
          color: #ffffff !important;
        }
      `}} />
    </section>
  );
};
export default WorkingProcess;

export const WorkingProcess2 = () => {
  return (
    <section className="working-process-section section-padding pt-0">
      <div className="container">
        <div className="section-title text-center">
          <span className="sub-content wow fadeInUp" style={{ fontSize: '0.75rem', padding: '4px 10px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px', width: 'fit-content' }}>
            <img src="assets/img/bale.png" alt="img" style={{ width: '14px', height: '14px' }} />
            Working Process
          </span>
          <h2 className="wow fadeInUp" data-wow-delay=".3s">
            We Complete Our Work to Follow <br />
            Some Easy Ways
          </h2>
        </div>
        <div className="work-process-wrapper">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="work-process-content">
                <div
                  className="work-process-items wow fadeInUp"
                  data-wow-delay=".3s"
                >
                  <div className="digit-box">01</div>
                  <h4>Market Research</h4>
                  <p>
                    Quis autem vel eum iure reprehenderit qui in ea voluptate
                    velit esse quam nihil molestiae
                  </p>
                </div>
                <div
                  className="work-process-items wow fadeInUp"
                  data-wow-delay=".5s"
                >
                  <div className="digit-box">02</div>
                  <h4>Process and Analysis</h4>
                  <p>
                    Quis autem vel eum iure reprehenderit qui in ea voluptate
                    velit esse quam nihil molestiae
                  </p>
                </div>
                <div
                  className="work-process-items wow fadeInUp"
                  data-wow-delay=".7s"
                >
                  <div className="digit-box">03</div>
                  <h4>Successful Project</h4>
                  <p>
                    Quis autem vel eum iure reprehenderit qui in ea voluptate
                    velit esse quam nihil molestiae
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div
                className="work-process-image wow fadeInUp"
                data-wow-delay=".4s"
              >
                <img src="assets/img/business-mens-grsl.jpg" alt="img" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
