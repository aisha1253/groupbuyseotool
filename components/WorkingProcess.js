const WorkingProcess = () => {
  const steps = [
    {
      step: "Step 01",
      title: "Browse & Discover Tools",
      description: "Explore thousands of digital tools including SEO tools, streaming accounts, AI tools, and course accounts at affordable prices",
      icon: "assets/img/working-process/icon-1.png",
      gridClass: "div1"
    },
    {
      step: "Step 02",
      title: "Compare Prices & Reviews",
      description: "Compare prices from verified sellers and read authentic reviews from real buyers to make informed decisions",
      icon: "assets/img/working-process/icon-2.png",
      gridClass: "div2"
    },
    {
      step: "Step 03",
      title: "Buy or Sell Securely",
      description: "Complete secure transactions with verified sellers or list your tools and start selling to thousands of buyers",
      icon: "assets/img/working-process/icon-3.png",
      gridClass: "div3"
    },
    {
      step: "Step 04",
      title: "Save Money & Grow",
      description: "Get premium tools at up to 80% cheaper prices and grow your business or personal projects with verified accounts",
      icon: "assets/img/working-process/icon-4.png",
      gridClass: "div4"
    }
  ];

  return (
    <section className="working-section-2 section-padding" style={{ backgroundColor: '#EDF2F8', padding: '80px 0' }}>
      <div className="container" style={{ maxWidth: '1200px', paddingLeft: '3rem', paddingRight: '3rem' }}>
        <div className="section-title text-center" style={{ marginBottom: '50px' }}>
          <span className="sub-content wow fadeInUp" style={{ fontSize: '0.75rem', padding: '4px 10px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px', width: 'fit-content' }}>
            <img src="assets/img/bale.png" alt="img" style={{ width: '14px', height: '14px' }} />
            How It Works
          </span>
          <h2 className="wow fadeInUp" data-wow-delay=".3s" style={{ color: '#101828', marginTop: '20px' }}>
            How to Buy &amp; Sell Tools at Cheap Prices <br />
            Simple Steps for Buyers &amp; Sellers
          </h2>
        </div>
        
        <div className="outerdiv" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="innerdiv" style={{
            transform: 'scale(0.9)',
            margin: '1rem',
            display: 'grid',
            gridGap: '1.5rem',
            gridTemplateRows: 'repeat(2, 22rem)',
            gridTemplateColumns: 'repeat(4, 17rem)'
          }}>
            <div className={`div1 eachdiv`} style={{
              padding: '1rem 2rem',
              borderRadius: '0.8rem',
              boxShadow: '5px 5px 20px #6d6b6b6b',
              color: 'white',
              background: '#733FC8',
              gridColumn: '1/3',
              gridRow: '1/2',
              backgroundImage: 'url(https://raw.githubusercontent.com/RahulSahOfficial/testimonials_grid_section/5532c958b7d3c9b910a216b198fdd21c73112d84/images/bg-pattern-quotation.svg)',
              backgroundRepeat: 'no-repeat',
              backgroundPositionX: '25rem'
            }}>
              <div className="userdetails" style={{ display: 'flex', marginBottom: '15px' }}>
                <div className="imgbox" style={{ marginRight: '1rem' }}>
                  <img src={steps[0].icon} alt="icon" style={{ borderRadius: '50%', width: '3rem', height: '3rem', objectFit: 'contain', backgroundColor: 'rgba(255,255,255,0.2)', padding: '8px' }} />
                </div>
                <div className="detbox" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <p className="name" style={{ margin: 0, color: 'hsl(0, 0%, 81%)', fontSize: '0.9rem', marginBottom: '0.1rem', fontWeight: '600' }}>{steps[0].step}</p>
                  <p className="designation" style={{ margin: 0, color: 'hsl(0, 0%, 81%)', opacity: '50%', fontSize: '0.8rem' }}>Get Started</p>
                </div>
              </div>
              <div className="review">
                <h4 style={{ fontSize: '1.4rem', color: '#F3DEFF', fontWeight: '600', lineHeight: '1.5', marginBottom: '0.8rem' }}>{steps[0].title}</h4>
                <p style={{ fontSize: '0.95rem', color: '#F3DEFF', fontWeight: '500', opacity: '50%', lineHeight: '1.5' }}>{steps[0].description}</p>
              </div>
            </div>

            <div className={`div2 eachdiv`} style={{
              padding: '1rem 2rem',
              borderRadius: '0.8rem',
              boxShadow: '5px 5px 20px #6d6b6b6b',
              color: 'white',
              background: '#49556B',
              gridColumn: '3/4',
              gridRow: '1/2'
            }}>
              <div className="userdetails" style={{ display: 'flex', marginBottom: '15px' }}>
                <div className="imgbox" style={{ marginRight: '1rem' }}>
                  <img src={steps[1].icon} alt="icon" style={{ borderRadius: '50%', width: '3rem', height: '3rem', objectFit: 'contain', backgroundColor: 'rgba(255,255,255,0.2)', padding: '8px' }} />
                </div>
                <div className="detbox" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <p className="name" style={{ margin: 0, color: 'hsl(0, 0%, 81%)', fontSize: '0.9rem', marginBottom: '0.1rem', fontWeight: '600' }}>{steps[1].step}</p>
                  <p className="designation" style={{ margin: 0, color: 'hsl(0, 0%, 81%)', opacity: '50%', fontSize: '0.8rem' }}>Compare & Choose</p>
                </div>
              </div>
              <div className="review">
                <h4 style={{ fontSize: '1.4rem', color: '#F3DEFF', fontWeight: '600', lineHeight: '1.5', marginBottom: '0.8rem' }}>{steps[1].title}</h4>
                <p style={{ fontSize: '0.95rem', color: '#F3DEFF', fontWeight: '500', opacity: '50%', lineHeight: '1.5' }}>{steps[1].description}</p>
              </div>
            </div>

            <div className={`div3 eachdiv`} style={{
              padding: '1rem 2rem',
              borderRadius: '0.8rem',
              boxShadow: '5px 5px 20px #6d6b6b6b',
              color: 'black',
              background: 'white',
              gridColumn: '4/5',
              gridRow: '1/3'
            }}>
              <div className="userdetails" style={{ display: 'flex', marginBottom: '15px' }}>
                <div className="imgbox" style={{ marginRight: '1rem' }}>
                  <img src={steps[2].icon} alt="icon" style={{ borderRadius: '50%', width: '3rem', height: '3rem', objectFit: 'contain', backgroundColor: 'rgba(245, 137, 103, 0.1)', padding: '8px' }} />
                </div>
                <div className="detbox" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <p className="name dark" style={{ margin: 0, color: '#49505A', fontSize: '0.9rem', marginBottom: '0.1rem', fontWeight: '600' }}>{steps[2].step}</p>
                  <p className="designation dark" style={{ margin: 0, color: '#49505A', opacity: '50%', fontSize: '0.8rem' }}>Secure Transaction</p>
                </div>
              </div>
              <div className="review dark">
                <h4 style={{ fontSize: '1.4rem', color: '#4B5258', fontWeight: '600', lineHeight: '1.5', marginBottom: '0.8rem' }}>{steps[2].title}</h4>
                <p style={{ fontSize: '0.95rem', color: '#0e0e0e', fontWeight: '500', opacity: '50%', lineHeight: '1.5' }}>{steps[2].description}</p>
              </div>
            </div>

            <div className={`div4 eachdiv`} style={{
              padding: '1rem 2rem',
              borderRadius: '0.8rem',
              boxShadow: '5px 5px 20px #6d6b6b6b',
              color: 'black',
              background: 'white',
              gridColumn: '1/2',
              gridRow: '2/3'
            }}>
              <div className="userdetails" style={{ display: 'flex', marginBottom: '15px' }}>
                <div className="imgbox" style={{ marginRight: '1rem' }}>
                  <img src={steps[3].icon} alt="icon" style={{ borderRadius: '50%', width: '3rem', height: '3rem', objectFit: 'contain', backgroundColor: 'rgba(245, 137, 103, 0.1)', padding: '8px' }} />
                </div>
                <div className="detbox" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <p className="name dark" style={{ margin: 0, color: '#49505A', fontSize: '0.9rem', marginBottom: '0.1rem', fontWeight: '600' }}>{steps[3].step}</p>
                  <p className="designation dark" style={{ margin: 0, color: '#49505A', opacity: '50%', fontSize: '0.8rem' }}>Save & Grow</p>
                </div>
              </div>
              <div className="review dark">
                <h4 style={{ fontSize: '1.4rem', color: '#4B5258', fontWeight: '600', lineHeight: '1.5', marginBottom: '0.8rem' }}>{steps[3].title}</h4>
                <p style={{ fontSize: '0.95rem', color: '#0e0e0e', fontWeight: '500', opacity: '50%', lineHeight: '1.5' }}>{steps[3].description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @media only screen and (max-width: 1000px) {
          .innerdiv {
            transform: scale(0.7) !important;
          }
        }
        @media only screen and (max-width: 800px) {
          .innerdiv {
            transform: scale(0.6) !important;
          }
        }
        @media only screen and (max-width: 600px) {
          .div1 {
            background-position-x: 10rem !important;
          }
          .innerdiv {
            display: flex !important;
            flex-direction: column !important;
            transform: scale(1) !important;
            margin: 2rem !important;
            margin-bottom: 5rem !important;
            grid-template-rows: auto !important;
            grid-template-columns: 1fr !important;
          }
          .eachdiv {
            grid-column: 1 !important;
            grid-row: auto !important;
          }
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
