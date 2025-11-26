"use client";

import Faq from "@/components/Faq";
import Services from "@/components/Services";
import {
  TestimonialSlider4,
  TestimonialSlider5,
} from "@/components/TestimonialSlider";
import WorkingProcess from "@/components/WorkingProcess";
import NextLayout from "@/layouts/NextLayout";
import Link from "next/link";

const page = () => {
  return (
    <NextLayout header={2} footer={4} single>
      {/* Hero Section Start */}
      <section className="hero-section hero-4" style={{ backgroundImage: 'url("assets/img/hero-image-bg.png")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', position: 'relative' }}>
        <div className="container" style={{ maxWidth: '1200px', paddingLeft: '3rem', paddingRight: '3rem' }}>
          <div className="row g-4 align-items-center justify-content-between align-items-center">
            <div className="col-lg-6">
              <div className="hero-content">
                <span className="sub-content wow fadeInUp" data-wow-delay=".2s" style={{ fontSize: '0.75rem', padding: '4px 10px', display: 'inline-flex', alignItems: 'center', gap: '6px', width: 'fit-content' }}>
                  <img src="assets/img/bale.png" alt="img" style={{ width: '14px', height: '14px' }} />
                  Digital Tools Marketplace
                </span>
                <h1 className="wow fadeInUp" data-wow-delay=".4s" style={{ fontSize: '2.5rem', lineHeight: '1.3', marginTop: '1rem', marginBottom: '1rem' }}>
                  Buy &amp; Sell Digital Tools at Cheap Prices - Best Marketplace for Buyers &amp; Sellers
                </h1>
                <p className="wow fadeInUp" data-wow-delay=".5s" style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                  Join thousands of buyers and sellers trading SEO tools, streaming accounts, AI tools, course accounts, and more at affordable prices.
                  <br />
                  Verified sellers, secure transactions, and the best deals for everyone.
                </p>
                <div className="about-author" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div
                    className="about-button wow fadeInUp"
                    data-wow-delay=".3s"
                  >
                    <Link href="/sign-up" className="theme-btn" style={{ padding: '16px 32px', fontSize: '1rem' }}>
                      Get Started
                      <i className="fas fa-long-arrow-right" />
                    </Link>
                  </div>
                  <div
                    className="author-image wow fadeInUp"
                    data-wow-delay=".5s"
                  >
                    <img
                      src="assets/img/about/face-mans-2.png"
                      alt="author-img"
                    />
                    <div className="content">
                      <h6>
                        Trusted by 10K+ users <br />
                        worldwide
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5 wow fadeInUp" data-wow-delay=".4s">
              <div className="hero-image" style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
                <img
                  src="assets/img/hero/digital-marketing-hero-img-min.png"
                  alt="img"
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
                <div className="circle-musk-shape float-bob-x">
                  <img src="assets/img/hero/circle-musk.png" alt="shape-img" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <style dangerouslySetInnerHTML={{__html: `
          .hero-section.hero-4::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(to bottom, rgba(92, 48, 253, 0.1), rgba(92, 48, 253, 0.3));
            z-index: 0;
          }
          .hero-section.hero-4 > * {
            position: relative;
            z-index: 1;
          }
        `}} />
      </section>

      {/* Brand Section Start */}
      <section className="brand-section-2 fix">
        <div className="container-fluid">
          <div className="brand-wrapper-2">
            <div className="radius-shape">
              <img src="assets/img/brand/radius-left.png" alt="shape-img" />
            </div>
            <div className="radius-shape-2">
              <img src="assets/img/brand/radius-right.png" alt="shape-img" />
            </div>
            <h5 className="wow fadeInUp" data-wow-delay=".3s">
              Trusted by <span>1000+</span> Buyers &amp; Sellers Worldwide. Join Our Growing Community
            </h5>
            <div className="brand-slider-wrapper" style={{ overflow: 'hidden', width: '100%', position: 'relative' }}>
              {/* First Line - Left to Right */}
              <div className="brand-slider brand-slider-1" style={{ 
                display: 'flex', 
                animation: 'slideBrandsLeft 25s linear infinite',
                whiteSpace: 'nowrap',
                gap: '60px',
                marginBottom: '20px'
              }}>
                {['Ahrefs', 'SEMrush', 'Moz', 'Envato', 'GTmetrix', 'Ubersuggest', 'Screaming Frog', 'Majestic', 'SpyFu', 'Ahrefs', 'SEMrush', 'Moz', 'Envato', 'GTmetrix', 'Ubersuggest', 'Screaming Frog', 'Majestic', 'SpyFu'].map((tool, index) => (
                  <div key={`left-${index}`} className="brand-text-item" style={{
                    fontSize: '24px',
                    fontWeight: '600',
                    color: '#101828',
                    padding: '20px 40px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: 'fit-content'
                  }}>
                    {tool}
                  </div>
                ))}
              </div>
              {/* Second Line - Right to Left */}
              <div className="brand-slider brand-slider-2" style={{ 
                display: 'flex', 
                animation: 'slideBrandsRight 25s linear infinite',
                whiteSpace: 'nowrap',
                gap: '60px'
              }}>
                {['SpyFu', 'Majestic', 'Screaming Frog', 'Ubersuggest', 'GTmetrix', 'Envato', 'Moz', 'SEMrush', 'Ahrefs', 'SpyFu', 'Majestic', 'Screaming Frog', 'Ubersuggest', 'GTmetrix', 'Envato', 'Moz', 'SEMrush', 'Ahrefs'].map((tool, index) => (
                  <div key={`right-${index}`} className="brand-text-item" style={{
                    fontSize: '24px',
                    fontWeight: '600',
                    color: '#101828',
                    padding: '20px 40px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: 'fit-content'
                  }}>
                    {tool}
                  </div>
                ))}
              </div>
            </div>
            <style dangerouslySetInnerHTML={{__html: `
              @keyframes slideBrandsLeft {
                0% {
                  transform: translateX(-50%);
                }
                100% {
                  transform: translateX(0);
                }
              }
              @keyframes slideBrandsRight {
                0% {
                  transform: translateX(0);
                }
                100% {
                  transform: translateX(-50%);
                }
              }
              .brand-text-item {
                transition: all 0.3s ease;
              }
              .brand-text-item:hover {
                color: #5C30FD !important;
                transform: scale(1.1);
              }
            `}} />
          </div>
        </div>
      </section>

      {/* About Section Start */}
      <section className="about-section fix section-padding" id="about">
        <div className="container" style={{ maxWidth: '1200px', paddingLeft: '3rem', paddingRight: '3rem' }}>
          <div className="about-wrapper">
            <div className="row g-4 align-items-center justify-content-between">
              <div className="col-lg-6 wow fadeInUp" data-wow-delay=".3s">
                <div className="digital-about-image">
                  <img
                    src="assets/img/about/digittal-about-img.png"
                    alt="img"
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="about-content">
                  <div className="section-title">
                    <span className="sub-content wow fadeInUp" style={{ fontSize: '0.75rem', padding: '4px 10px', display: 'inline-flex', alignItems: 'center', gap: '6px', width: 'fit-content' }}>
                      <img src="assets/img/bale.png" alt="img" style={{ width: '14px', height: '14px' }} />
                      About GroupBuy Tools
                    </span>
                    <h2 className="wow fadeInUp" data-wow-delay=".3s">
                      The Best Marketplace for Buyers &amp; Sellers to Trade Digital Tools at Cheap Prices
                    </h2>
                  </div>
                  <p className="mt-3 mt-md-0 wow fadeInUp" data-wow-delay=".5s">
                    GroupBuy Tools connects buyers and sellers in a trusted marketplace where you can buy and sell digital tools at affordable prices. Whether you're looking for cheap SEO tools, streaming accounts, AI tools, or course accounts, or want to sell your tools, we provide a secure platform with verified sellers and transparent pricing.
                  </p>
                  <ul
                    className="about-list style-2 wow fadeInUp"
                    data-wow-delay=".3s"
                  >
                    <li>
                      <i className="fas fa-check-circle" />
                      Buy Tools at Cheap Prices from Verified Sellers
                    </li>
                    <li>
                      <i className="fas fa-check-circle" />
                      Sell Your Tools &amp; Grow Your Business
                    </li>
                    <li>
                      <i className="fas fa-check-circle" />
                      Secure Transactions &amp; Transparent Reviews
                    </li>
                  </ul>
                  <div
                    className="about-button wow fadeInUp"
                    data-wow-delay=".5s"
                  >
                    <Link href="/sign-up" className="theme-btn bg-2">
                      Join Now
                      <i className="far fa-arrow-right" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Section Start */}
      <Services />

      {/* Working Process Section Start */}
      <WorkingProcess />

      {/* Testimonial Section Start */}
      <section
        className="testimonial-section-4 fix section-padding"
        id="testimonial"
      >
        <div className="container" style={{ maxWidth: '1200px', paddingLeft: '3rem', paddingRight: '3rem' }}>
          <div className="section-title text-center">
            <span className="sub-content wow fadeInUp" style={{ fontSize: '0.75rem', padding: '4px 10px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px', width: 'fit-content' }}>
              <img src="assets/img/bale.png" alt="img" style={{ width: '14px', height: '14px' }} />
              Testimonials
            </span>
            <h2 className="text-white wow fadeInUp" data-wow-delay=".3s">
              What Our Buyers &amp; Sellers Say About Us
            </h2>
          </div>
        </div>

        <TestimonialSlider4 />
        <TestimonialSlider5 />
      </section>

      {/* Faq Section Start */}
      <Faq />

      {/* News Section Start */}
      <section className="news-section section-padding pt-0" id="blog">
        <div className="container" style={{ maxWidth: '1200px', paddingLeft: '3rem', paddingRight: '3rem' }}>
          <div className="section-title text-center">
            <span className="sub-content wow fadeInUp" style={{ fontSize: '0.75rem', padding: '4px 10px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px', width: 'fit-content' }}>
              <img src="assets/img/bale.png" alt="img" style={{ width: '14px', height: '14px' }} />
              News &amp; Blog
            </span>
            <h2 className="wow fadeInUp" data-wow-delay=".3s">
              Latest Tips &amp; Guides for Buyers &amp; Sellers
            </h2>
          </div>
          <div className="row">
            <div
              className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp"
              data-wow-delay=".3s"
            >
              <div className="news-card-items style-2" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div
                  className="news-image bg-cover"
                  style={{ 
                    backgroundImage: 'url("assets/img/image1.png")',
                    height: '180px',
                    width: '100%',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    borderRadius: '10px'
                  }}
                />
                <div className="news-content" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px', margin: '-35px 25px 0' }}>
                  <p style={{ fontSize: '13px', marginBottom: '8px' }}>November 25, 2024</p>
                  <h4 style={{ flex: 1, fontSize: '18px', lineHeight: '1.4', marginBottom: '12px' }}>
                    <Link href="/blog/buy-seo-tools-cheap-prices">
                      How to Buy SEO Tools at Cheap Prices - Buyer's Guide
                    </Link>
                  </h4>
                  <Link className="link-btn" href="/blog/buy-seo-tools-cheap-prices" style={{ fontSize: '14px' }}>
                    Read More
                    <i className="far fa-arrow-right" />
                  </Link>
                </div>
              </div>
            </div>
            <div
              className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp"
              data-wow-delay=".5s"
            >
              <div className="news-card-items style-2" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div
                  className="news-image bg-cover"
                  style={{ 
                    backgroundImage: 'url("assets/img/image2.png")',
                    height: '180px',
                    width: '100%',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    borderRadius: '10px'
                  }}
                />
                <div className="news-content" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px', margin: '-35px 25px 0' }}>
                  <p style={{ fontSize: '13px', marginBottom: '8px' }}>November 25, 2024</p>
                  <h4 style={{ flex: 1, fontSize: '18px', lineHeight: '1.4', marginBottom: '12px' }}>
                    <Link href="/blog/sell-digital-tools-successfully">
                      How to Sell Digital Tools Successfully - Seller's Guide
                    </Link>
                  </h4>
                  <Link className="link-btn" href="/blog/sell-digital-tools-successfully" style={{ fontSize: '14px' }}>
                    Read More
                    <i className="far fa-arrow-right" />
                  </Link>
                </div>
              </div>
            </div>
            <div
              className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp"
              data-wow-delay=".7s"
            >
              <div className="news-card-items style-2" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div
                  className="news-image bg-cover"
                  style={{ 
                    backgroundImage: 'url("assets/img/image.png")',
                    height: '180px',
                    width: '100%',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    borderRadius: '10px'
                  }}
                />
                <div className="news-content" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px', margin: '-35px 25px 0' }}>
                  <p style={{ fontSize: '13px', marginBottom: '8px' }}>November 25, 2024</p>
                  <h4 style={{ flex: 1, fontSize: '18px', lineHeight: '1.4', marginBottom: '12px' }}>
                    <Link href="/blog/why-groupbuy-tools-best">
                      Why GroupBuy Tools is Best for Cheap Digital Tools
                    </Link>
                  </h4>
                  <Link className="link-btn" href="/blog/why-groupbuy-tools-best" style={{ fontSize: '14px' }}>
                    Read More
                    <i className="far fa-arrow-right" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section Start */}
      <section className="contact-section fix section-padding pt-0 fix">
        <div className="pattern-shape">
          <img src="assets/img/box-pattern.png" alt="radius-shape" />
        </div>
        <div className="container" style={{ maxWidth: '1200px', paddingLeft: '3rem', paddingRight: '3rem' }}>
          <div className="row g-4 justify-content-center align-items-center">
            <div className="col-lg-1" />
            <div className="col-lg-4 wow fadeInUp" data-wow-delay=".3s">
              <div className="contact-image">
                <img src="assets/img/contact.jpg" alt="img" />
                <div className="circle-musk-shape float-bob-x">
                  <img src="assets/img/hero/circle-musk.png" alt="shape-img" />
                </div>
              </div>
            </div>
            <div className="col-lg-1" />
            <div className="col-lg-6">
              <div className="section-title">
                <span className="sub-content wow fadeInUp" style={{ fontSize: '0.75rem', padding: '4px 10px', display: 'inline-flex', alignItems: 'center', gap: '6px', width: 'fit-content' }}>
                  <img src="assets/img/bale.png" alt="img" style={{ width: '14px', height: '14px' }} />
                  Ready to Start?
                </span>
                <h2 className="wow fadeInUp" data-wow-delay=".3s">
                  Ready to Buy or Sell Digital Tools <br />
                  at Cheap Prices ?
                </h2>
              </div>
              <p className="mt-3 mt-md-0 wow fadeInUp" data-wow-delay=".5s">
                Join thousands of buyers finding affordable tools and sellers growing their business.
                <br /> Start buying or selling today at GroupBuy Tools.
              </p>
              <Link
                href="/sign-up"
                className="theme-btn mt-4 wow fadeInUp"
                data-wow-delay=".3s"
              >
                Get Started
                <i className="far fa-arrow-right" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </NextLayout>
  );
};

export default page;
