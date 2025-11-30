"use client";

import Faq from "@/components/Faq";
import Services from "@/components/Services";
import {
  TestimonialSlider4,
  TestimonialSlider5,
} from "@/components/TestimonialSlider";
import NextLayout from "@/layouts/NextLayout";
import Link from "next/link";
import Counter from "@/components/Counter";

const page = () => {
  return (
    <NextLayout header={2} footer={4} single>
      {/* Hero Section Start */}
      <section className="hero-section hero-4" style={{ backgroundColor: '#ffffff', position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="container" style={{ maxWidth: '1200px', paddingLeft: '3rem', paddingRight: '3rem', width: '100%' }}>
          <div className="row g-4 align-items-center justify-content-between" style={{ minHeight: 'calc(100vh - 160px)', alignItems: 'center' }}>
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
              <div className="hero-image" style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem', position: 'relative', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ position: 'relative', width: '100%', height: '700px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {/* 2.webp - Center/Middle image, larger size */}
                  <img
                    src="assets/img/hero/2.webp"
                    alt="img"
                    style={{ 
                      width: '120%', 
                      maxWidth: '600px',
                      height: 'auto', 
                      objectFit: 'contain',
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      zIndex: 1,
                      mixBlendMode: 'normal',
                      filter: 'drop-shadow(0px 20px 60px rgba(0, 0, 0, 0.2))'
                    }}
                  />
                  {/* 3.webp - Top/Foreground image */}
                  <img
                    src="assets/img/hero/3.webp"
                    alt="img"
                    style={{ 
                      width: '130%', 
                      height: 'auto', 
                      maxWidth: '800px',
                      objectFit: 'contain',
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      zIndex: 2,
                      mixBlendMode: 'normal'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <style dangerouslySetInnerHTML={{__html: `
          .hero-section.hero-4 {
            background-color: #ffffff !important;
            min-height: 100vh;
            display: flex;
            align-items: center;
            padding-top: 80px;
            padding-bottom: 80px;
            position: relative;
          }
          .hero-section.hero-4::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
            --s: 125px;
            --c1: rgba(245, 137, 103, 0.08);
            --c2: rgba(245, 137, 103, 0.04);
            --_g: var(--c1) 90deg, var(--c2) 0 135deg, #0000 0;
            background: conic-gradient(
                from -45deg at calc(100% / 3) calc(100% / 3),
                var(--c1) 90deg,
                #0000 0
              ),
              conic-gradient(from -135deg at calc(100% / 3) calc(2 * 100% / 3), var(--_g)),
              conic-gradient(
                from 135deg at calc(2 * 100% / 3) calc(2 * 100% / 3),
                var(--_g)
              ),
              conic-gradient(
                from 45deg at calc(2 * 100% / 3) calc(100% / 3),
                var(--_g),
                var(--c1) 0 225deg,
                var(--c2) 0
              );
            background-size: var(--s) var(--s);
            z-index: 0;
            opacity: 0.3;
          }
          .hero-section.hero-4 > * {
            position: relative;
            z-index: 1;
          }
          .hero-section.hero-4 .container {
            position: relative;
            z-index: 1;
          }
          .hero-section.hero-4 .hero-image img {
            background: transparent !important;
            background-color: transparent !important;
          }
          .hero-section.hero-4 .row {
            min-height: calc(100vh - 160px);
            align-items: center;
          }
          @media (max-width: 991px) {
            .hero-section.hero-4 {
              min-height: auto;
              padding-top: 60px;
              padding-bottom: 60px;
            }
            .hero-section.hero-4 .row {
              min-height: auto;
            }
            .hero-section.hero-4 .hero-image {
              height: 500px !important;
              margin-top: 40px;
            }
            .hero-section.hero-4 .hero-image img[src*="3.webp"] {
              width: 120% !important;
              max-width: 700px !important;
            }
            .hero-section.hero-4 .hero-image img[src*="2.webp"] {
              width: 100% !important;
              max-width: 500px !important;
            }
          }
          @media (max-width: 767px) {
            .hero-section.hero-4 {
              padding-top: 40px;
              padding-bottom: 40px;
            }
            .hero-section.hero-4 .hero-image {
              height: 400px !important;
            }
            .hero-section.hero-4 .hero-image img[src*="3.webp"] {
              width: 110% !important;
              max-width: 600px !important;
            }
            .hero-section.hero-4 .hero-image img[src*="2.webp"] {
              width: 100% !important;
              max-width: 400px !important;
            }
          }
        `}} />
      </section>

      <style dangerouslySetInnerHTML={{__html: `
        /* Reduce text sizes in all sections after hero */
        section:not(.hero-section) h1,
        section:not(.hero-section) h2,
        section:not(.hero-section) h3,
        section:not(.hero-section) h4,
        section:not(.hero-section) h5,
        section:not(.hero-section) h6 {
          font-size: 0.85em !important;
        }
        section:not(.hero-section) p {
          font-size: 0.9em !important;
        }
        section:not(.hero-section) .section-title h2 {
          font-size: 1.8rem !important;
        }
        section:not(.hero-section) .section-title h3 {
          font-size: 1.5rem !important;
        }
        section:not(.hero-section) .section-title h4 {
          font-size: 1.3rem !important;
        }
        section:not(.hero-section) .section-title h5 {
          font-size: 1.1rem !important;
        }
        section:not(.hero-section) .section-title h6 {
          font-size: 1rem !important;
        }
        section:not(.hero-section) .content p,
        section:not(.hero-section) .about-content p,
        section:not(.hero-section) .service-content p {
          font-size: 0.9em !important;
        }
        @media (max-width: 991px) {
          section:not(.hero-section) .section-title h2 {
            font-size: 1.5rem !important;
          }
        }
        @media (max-width: 767px) {
          section:not(.hero-section) .section-title h2 {
            font-size: 1.3rem !important;
          }
        }
      `}} />

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
                color: #F58967 !important;
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

      {/* Stats Section Start */}
      <section className="stats-section" style={{ 
        backgroundColor: '#0F1F3E',
        padding: '40px 0'
      }}>
        <div className="container" style={{ maxWidth: '1200px', paddingLeft: '3rem', paddingRight: '3rem' }}>
          <div className="row justify-content-center">
            <div className="col-lg-3 col-md-6 col-sm-6 mb-4 mb-lg-0">
              <div className="stat-item text-center wow fadeInUp" data-wow-delay=".3s">
                <h3 style={{ fontSize: '200px', fontWeight: '700', color: '#ffffff', marginBottom: '20px', lineHeight: '1' }}>
                  <span className="count">
                    <Counter end={50} />
                  </span>+
                </h3>
                <p style={{ fontSize: '42px', color: '#ffffff', margin: 0, opacity: 0.9, fontWeight: '500' }}>Premium SEO Tools</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 mb-4 mb-lg-0">
              <div className="stat-item text-center wow fadeInUp" data-wow-delay=".5s">
                <h3 style={{ fontSize: '200px', fontWeight: '700', color: '#ffffff', marginBottom: '20px', lineHeight: '1' }}>
                  <span className="count">
                    <Counter end={10} />
                  </span>K+
                </h3>
                <p style={{ fontSize: '42px', color: '#ffffff', margin: 0, opacity: 0.9, fontWeight: '500' }}>Happy Customers</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 mb-4 mb-lg-0">
              <div className="stat-item text-center wow fadeInUp" data-wow-delay=".7s">
                <h3 style={{ fontSize: '200px', fontWeight: '700', color: '#ffffff', marginBottom: '20px', lineHeight: '1' }}>
                  <span className="count">
                    <Counter end={99} />
                  </span>%
                </h3>
                <p style={{ fontSize: '42px', color: '#ffffff', margin: 0, opacity: 0.9, fontWeight: '500' }}>Uptime Guarantee</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 mb-4 mb-lg-0">
              <div className="stat-item text-center wow fadeInUp" data-wow-delay=".9s">
                <h3 style={{ fontSize: '200px', fontWeight: '700', color: '#ffffff', marginBottom: '20px', lineHeight: '1' }}>24/7</h3>
                <p style={{ fontSize: '42px', color: '#ffffff', margin: 0, opacity: 0.9, fontWeight: '500' }}>Customer Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Section Start */}
      <Services />


      {/* Testimonial Section Start */}
      <section
        className="testimonial-section-4 fix section-padding"
        id="testimonial"
        style={{ backgroundColor: '#ffffff', position: 'relative', overflow: 'hidden' }}
      >
        <div className="container" style={{ maxWidth: '1200px', paddingLeft: '3rem', paddingRight: '3rem' }}>
          <div className="section-title text-center">
            <span className="sub-content wow fadeInUp" style={{ fontSize: '0.75rem', padding: '4px 10px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px', width: 'fit-content' }}>
              <img src="assets/img/bale.png" alt="img" style={{ width: '14px', height: '14px' }} />
              Testimonials
            </span>
            <h2 className="wow fadeInUp" data-wow-delay=".3s" style={{ color: '#101828' }}>
              What Our Buyers &amp; Sellers Say About Us
            </h2>
          </div>
        </div>

        <div className="testimonial-scroll-wrapper" style={{ 
          overflow: 'hidden', 
          width: '100%', 
          position: 'relative',
          padding: '60px 0'
        }}>
          <div className="testimonial-scroll-container" style={{
            display: 'flex',
            gap: '30px',
            animation: 'scrollTestimonials 30s linear infinite',
            width: 'fit-content'
          }}>
            {[
              { quote: "GroupBuy Tools helped me save hundreds on SEO tools. The platform is reliable and the sellers are verified. Highly recommended!", name: "Sarah Johnson", company: "Digital Marketing Pro" },
              { quote: "As a seller, I've found great buyers here. The transaction process is smooth and secure. Best marketplace for digital tools!", name: "Michael Chen", company: "Tool Seller" },
              { quote: "I've been buying tools here for 6 months. Great prices, fast delivery, and excellent customer support. 5 stars!", name: "Emily Rodriguez", company: "SEO Agency" },
              { quote: "The best place to buy premium tools at affordable prices. I've saved so much money compared to direct subscriptions!", name: "David Kim", company: "Freelancer" },
              { quote: "Selling tools here has been amazing. The platform is user-friendly and I get paid quickly. Love it!", name: "Lisa Anderson", company: "Digital Tools Reseller" },
              { quote: "GroupBuy Tools is a game changer! I can now access all premium SEO tools without breaking the bank.", name: "James Wilson", company: "Marketing Consultant" },
            ].map((testimonial, index) => (
              <figure key={index} className="snip1533" style={{
                boxShadow: '0 0 5px rgba(0, 0, 0, 0.15)',
                color: '#9e9e9e',
                display: 'inline-block',
                fontSize: '16px',
                margin: '35px 10px 10px',
                maxWidth: '310px',
                minWidth: '250px',
                position: 'relative',
                textAlign: 'center',
                width: '100%',
                backgroundColor: '#ffffff',
                borderRadius: '5px',
                borderTop: '5px solid #F58967',
                flexShrink: 0
              }}>
                <figcaption style={{ padding: '13% 10% 12%', position: 'relative' }}>
                  <div style={{
                    transform: 'translateX(-50%)',
                    backgroundColor: '#fff',
                    borderRadius: '50%',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.25)',
                    color: '#F58967',
                    content: '"\\f10e"',
                    fontFamily: 'FontAwesome',
                    fontSize: '32px',
                    fontStyle: 'normal',
                    left: '50%',
                    lineHeight: '60px',
                    position: 'absolute',
                    top: '-30px',
                    width: '60px',
                    height: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <i className="fas fa-quote-right" style={{ fontSize: '32px', color: '#F58967' }} />
                  </div>
                  <blockquote style={{
                    fontStyle: 'italic',
                    fontWeight: '300',
                    margin: '0 0 20px',
                    fontSize: '15px',
                    lineHeight: '1.6',
                    color: '#696969'
                  }}>
                    {testimonial.quote}
                  </blockquote>
                  <h3 style={{
                    color: '#3c3c3c',
                    fontSize: '20px',
                    fontWeight: '300',
                    lineHeight: '24px',
                    margin: '10px 0 5px'
                  }}>
                    {testimonial.name}
                  </h3>
                  <h4 style={{
                    fontWeight: '400',
                    margin: '0',
                    opacity: '0.5',
                    fontSize: '14px',
                    color: '#9e9e9e'
                  }}>
                    {testimonial.company}
                  </h4>
                </figcaption>
              </figure>
            ))}
            {/* Duplicate for seamless loop */}
            {[
              { quote: "GroupBuy Tools helped me save hundreds on SEO tools. The platform is reliable and the sellers are verified. Highly recommended!", name: "Sarah Johnson", company: "Digital Marketing Pro" },
              { quote: "As a seller, I've found great buyers here. The transaction process is smooth and secure. Best marketplace for digital tools!", name: "Michael Chen", company: "Tool Seller" },
              { quote: "I've been buying tools here for 6 months. Great prices, fast delivery, and excellent customer support. 5 stars!", name: "Emily Rodriguez", company: "SEO Agency" },
            ].map((testimonial, index) => (
              <figure key={`dup-${index}`} className="snip1533" style={{
                boxShadow: '0 0 5px rgba(0, 0, 0, 0.15)',
                color: '#9e9e9e',
                display: 'inline-block',
                fontSize: '16px',
                margin: '35px 10px 10px',
                maxWidth: '310px',
                minWidth: '250px',
                position: 'relative',
                textAlign: 'center',
                width: '100%',
                backgroundColor: '#ffffff',
                borderRadius: '5px',
                borderTop: '5px solid #F58967',
                flexShrink: 0
              }}>
                <figcaption style={{ padding: '13% 10% 12%', position: 'relative' }}>
                  <div style={{
                    transform: 'translateX(-50%)',
                    backgroundColor: '#fff',
                    borderRadius: '50%',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.25)',
                    color: '#F58967',
                    fontFamily: 'FontAwesome',
                    fontSize: '32px',
                    fontStyle: 'normal',
                    left: '50%',
                    lineHeight: '60px',
                    position: 'absolute',
                    top: '-30px',
                    width: '60px',
                    height: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <i className="fas fa-quote-right" style={{ fontSize: '32px', color: '#F58967' }} />
                  </div>
                  <blockquote style={{
                    fontStyle: 'italic',
                    fontWeight: '300',
                    margin: '0 0 20px',
                    fontSize: '15px',
                    lineHeight: '1.6',
                    color: '#696969'
                  }}>
                    {testimonial.quote}
                  </blockquote>
                  <h3 style={{
                    color: '#3c3c3c',
                    fontSize: '20px',
                    fontWeight: '300',
                    lineHeight: '24px',
                    margin: '10px 0 5px'
                  }}>
                    {testimonial.name}
                  </h3>
                  <h4 style={{
                    fontWeight: '400',
                    margin: '0',
                    opacity: '0.5',
                    fontSize: '14px',
                    color: '#9e9e9e'
                  }}>
                    {testimonial.company}
                  </h4>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <style dangerouslySetInnerHTML={{__html: `
          @keyframes scrollTestimonials {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .testimonial-section-4 {
            background-color: #ffffff;
          }
          .testimonial-section-4 .snip1533 {
            transition: all 0.3s ease;
          }
          .testimonial-section-4 .snip1533:hover {
            transform: translateY(-5px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2) !important;
          }
          @media (max-width: 767px) {
            .testimonial-scroll-container {
              gap: 20px !important;
            }
            .testimonial-section-4 .snip1533 {
              min-width: 200px !important;
              maxWidth: 280px !important;
            }
          }
        `}} />
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
            <div className="col-lg-8 text-center">
              <div className="section-title">
                <span className="sub-content wow fadeInUp" style={{ fontSize: '0.75rem', padding: '4px 10px', display: 'inline-flex', alignItems: 'center', gap: '6px', width: 'fit-content', margin: '0 auto' }}>
                  <img src="assets/img/bale.png" alt="img" style={{ width: '14px', height: '14px' }} />
                  Ready to Start?
                </span>
                <h2 className="wow fadeInUp" data-wow-delay=".3s" style={{ marginTop: '20px' }}>
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
