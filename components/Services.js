import Link from "next/link";

const Services = () => {
  return (
    <section
      className="service-section-4 fix bg-cover section-padding"
      style={{
        backgroundColor: '#ffffff',
        position: 'relative',
      }}
      id="services"
    >
      <div className="container" style={{ maxWidth: '1200px', paddingLeft: '3rem', paddingRight: '3rem' }}>
        <div className="section-title text-center">
          <span className="sub-content bg-color-3 wow fadeInUp" style={{ fontSize: '0.75rem', padding: '4px 10px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px', width: 'fit-content' }}>
            <img src="assets/img/bale.png" alt="img" style={{ width: '14px', height: '14px' }} />
            Popular Tools
          </span>
          <h2 className="wow fadeInUp" data-wow-delay=".3s" style={{ color: '#101828' }}>
            Buy &amp; Sell Digital Tools at Cheap Prices <br />
            Best Marketplace for Buyers &amp; Sellers <br /> to Trade Tools
          </h2>
        </div>
        <div className="row">
          <div
            className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp"
            data-wow-delay=".3s"
          >
            <div className="service-box-items">
              <div className="icon">
                <i className="flaticon-keywords" />
              </div>
              <div className="content">
                <h3>
                  <Link href="service-details">SEO Tools</Link>
                </h3>
                <p>
                  Buy and sell SEO tools at cheap prices. Ahrefs, SEMrush, Moz and more premium tools available.
                </p>
              </div>
            </div>
          </div>
          <div
            className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp"
            data-wow-delay=".5s"
          >
            <div className="service-box-items active">
              <div className="icon">
                <i className="flaticon-social-media" />
              </div>
              <div className="content">
                <h3>
                  <Link href="service-details">Streaming Accounts</Link>
                </h3>
                <p>
                  Get Netflix, Spotify, Disney+, Hulu and other streaming accounts at affordable prices.
                </p>
              </div>
            </div>
          </div>
          <div
            className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp"
            data-wow-delay=".7s"
          >
            <div className="service-box-items">
              <div className="icon">
                <i className="flaticon-email-marketing" />
              </div>
              <div className="content">
                <h3>
                  <Link href="service-details">AI Tools</Link>
                </h3>
                <p>
                  Access ChatGPT, Midjourney, Claude and other premium AI tools at cheap prices.
                </p>
              </div>
            </div>
          </div>
          <div
            className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp"
            data-wow-delay=".3s"
            style={{ marginTop: '30px' }}
          >
            <div className="service-box-items">
              <div className="icon">
                <i className="flaticon-copy-writing" />
              </div>
              <div className="content">
                <h3>
                  <Link href="service-details">Course Accounts</Link>
                </h3>
                <p>
                  Buy Udemy, Coursera, Skillshare and educational platform accounts at affordable rates.
                </p>
              </div>
            </div>
          </div>
          <div
            className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp"
            data-wow-delay=".5s"
            style={{ marginTop: '30px' }}
          >
            <div className="service-box-items">
              <div className="icon">
                <i className="flaticon-software-development" />
              </div>
              <div className="content">
                <h3>
                  <Link href="service-details">Design Tools</Link>
                </h3>
                <p>
                  Get Adobe Creative Cloud, Figma, Canva Pro and design tools at cheap prices.
                </p>
              </div>
            </div>
          </div>
          <div
            className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp"
            data-wow-delay=".7s"
            style={{ marginTop: '30px' }}
          >
            <div className="service-box-items">
              <div className="icon">
                <i className="flaticon-www" />
              </div>
              <div className="content">
                <h3>
                  <Link href="service-details">Software Tools</Link>
                </h3>
                <p>
                  Buy and sell premium software licenses, subscriptions and tools at affordable prices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .service-section-4 {
          position: relative;
        }
        .service-section-4::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          --s: 200px;
          --c1: rgba(29, 29, 29, 0.15);
          --c2: rgba(78, 79, 81, 0.12);
          --c3: rgba(60, 60, 60, 0.1);
          background: repeating-conic-gradient(
                from 30deg,
                #0000 0 120deg,
                var(--c3) 0 180deg
              )
              calc(0.5 * var(--s)) calc(0.5 * var(--s) * 0.577),
            repeating-conic-gradient(
              from 30deg,
              var(--c1) 0 60deg,
              var(--c2) 0 120deg,
              var(--c3) 0 180deg
            );
          background-size: var(--s) calc(var(--s) * 0.577);
          z-index: 0;
          opacity: 0.4;
        }
        .service-section-4 > * {
          position: relative;
          z-index: 1;
        }
        .service-section-4 .service-box-items {
          background-color: #ffffff !important;
          border: 2px solid transparent;
          transition: all 0.3s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
          min-height: 280px;
        }
        .service-section-4 .service-box-items .content {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .service-section-4 .service-box-items .content p {
          flex: 1;
        }
        .service-section-4 .service-box-items:hover {
          background-color: #ffffff !important;
          border-color: #F58967 !important;
        }
        .service-section-4 .row > div {
          display: flex;
        }
        .service-section-4 .row > div > div {
          width: 100%;
        }
        .service-section-4 h2 {
          color: #101828 !important;
        }
        .service-section-4 .service-box-items h3 a {
          color: #101828 !important;
        }
        .service-section-4 .service-box-items p {
          color: #696969 !important;
        }
        .service-section-4 .service-box-items .icon {
          color: #F58967 !important;
        }
        .service-section-4 .service-box-items:hover .icon {
          color: #F58967 !important;
        }
      `}} />
    </section>
  );
};
export default Services;

export const Service2 = ({ paddingTop = 0, title = "Popular Services" }) => {
  return (
    <section
      className={`service-section section-padding pt-${paddingTop}`}
      id="services"
    >
      <div className="container" style={{ maxWidth: '1200px', paddingLeft: '3rem', paddingRight: '3rem' }}>
        <div className="section-title text-center">
          <span className="sub-content wow fadeInUp" style={{ fontSize: '0.75rem', padding: '4px 10px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px', width: 'fit-content' }}>
            <img src="assets/img/bale.png" alt="img" style={{ width: '14px', height: '14px' }} />
            {title}
          </span>
          <h2 className="wow fadeInUp" data-wow-delay=".3s">
            We Provide Best Modern SEO <br />
            Service For Your Business
          </h2>
        </div>
        <div className="row">
          <div
            className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp"
            data-wow-delay=".3s"
          >
            <div className="service-popular-items">
              <div className="service-image">
                <img src="assets/img/service/08.png" alt="img" />
              </div>
              <div className="service-content">
                <h3>
                  <Link href="service-details">Keyword Research</Link>
                </h3>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error voluptatem
                  accusantium
                </p>
                <Link href="service-details" className="theme-btn bg-2">
                  Learn More <i className="far fa-arrow-right" />
                </Link>
              </div>
            </div>
          </div>
          <div
            className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp"
            data-wow-delay=".5s"
          >
            <div className="service-popular-items">
              <div className="service-image">
                <img src="assets/img/service/09.png" alt="img" />
              </div>
              <div className="service-content">
                <h3>
                  <Link href="service-details">Content Writing</Link>
                </h3>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error voluptatem
                  accusantium
                </p>
                <Link href="service-details" className="theme-btn bg-2">
                  Learn More <i className="far fa-arrow-right" />
                </Link>
              </div>
            </div>
          </div>
          <div
            className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp"
            data-wow-delay=".7s"
          >
            <div className="service-popular-items">
              <div className="service-image">
                <img src="assets/img/service/10.png" alt="img" />
              </div>
              <div className="service-content">
                <h3>
                  <Link href="service-details">Site Optimizations</Link>
                </h3>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error voluptatem
                  accusantium
                </p>
                <Link href="service-details" className="theme-btn bg-2">
                  Learn More <i className="far fa-arrow-right" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
