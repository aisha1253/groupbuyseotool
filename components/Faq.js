"use client";

import { useState, useEffect } from "react";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I buy digital tools at cheap prices?",
      answer: "Simply browse our marketplace, search for the tool you need, compare prices from verified sellers, and make a purchase. All sellers are verified and transactions are secure. You can save up to 80% compared to direct subscriptions."
    },
    {
      question: "How can I sell my digital tools on the platform?",
      answer: "Create a seller account, verify your identity, list your tools with descriptions and pricing, and start selling. Our platform handles secure transactions and you get paid quickly. We provide seller support and tools to help you grow your business."
    },
    {
      question: "Are the tools and accounts verified and safe?",
      answer: "Yes, all sellers go through a verification process. We verify seller identities and tool authenticity. All transactions are secure and we have a review system where buyers can rate sellers. We also offer buyer protection for secure transactions."
    },
    {
      question: "What types of digital tools can I buy or sell?",
      answer: "You can buy and sell SEO tools (Ahrefs, SEMrush, Moz), streaming accounts (Netflix, Spotify, Disney+), AI tools (ChatGPT, Midjourney, Claude), course accounts (Udemy, Coursera, Skillshare), design tools (Adobe, Figma, Canva Pro), and software licenses. We support a wide range of digital products."
    },
    {
      question: "How does the payment and refund process work?",
      answer: "Payments are processed securely through our platform. For buyers, we hold payment until you confirm the tool works. If there's an issue, we offer refunds within 24 hours. Sellers receive payment after successful delivery and buyer confirmation. All transactions are protected."
    }
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    // Update aria attributes and max-height when openIndex changes
    const items = document.querySelectorAll('.accordions__item');
    items.forEach((item, index) => {
      const control = item.querySelector('.accordions__control');
      const content = item.querySelector('.accordions__content');
      
      if (openIndex === index) {
        item.classList.add('open');
        if (control) control.setAttribute('aria-expanded', 'true');
        if (content) {
          content.setAttribute('aria-hidden', 'false');
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      } else {
        item.classList.remove('open');
        if (control) control.setAttribute('aria-expanded', 'false');
        if (content) {
          content.setAttribute('aria-hidden', 'true');
          content.style.maxHeight = '0';
        }
      }
    });
  }, [openIndex]);

  return (
    <section className="faq-section section-padding" style={{ padding: '70px 0', fontFamily: 'Rubik, system-ui, -apple-system, sans-serif' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', paddingLeft: '3rem', paddingRight: '3rem' }}>
        <div className="section-title text-center" style={{ marginBottom: '60px' }}>
          <span className="sub-content wow fadeInUp" style={{ 
            fontSize: '0.75rem', 
            padding: '4px 10px', 
            display: 'inline-flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '6px', 
            width: 'fit-content',
            marginBottom: '15px'
          }}>
            <img src="assets/img/bale.png" alt="img" style={{ width: '14px', height: '14px' }} />
            Some Question
          </span>
          <h2 className="wow fadeInUp" data-wow-delay=".3s" style={{ 
            fontSize: '2.5rem', 
            fontWeight: '700', 
            color: '#101828',
            marginBottom: '10px'
          }}>
            Frequently Asked Questions
          </h2>
          <p className="wow fadeInUp" data-wow-delay=".5s" style={{ 
            fontSize: '1rem', 
            color: '#667085',
            margin: 0
          }}>
            Step-by-Step Guide to Getting Started
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="process__accordions">
              <ul className="accordions__list" style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.2rem',
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                {faqs.map((faq, index) => (
                  <li 
                    key={index}
                    className={`accordions__item ${openIndex === index ? 'open' : ''}`}
                    style={{
                      backgroundColor: openIndex === index ? '#F58967' : '#f3f3f3',
                      borderRadius: '1.5rem',
                      overflow: 'hidden',
                      transition: '0.5s cubic-bezier(0.65, 0.2, 0.65, 1)',
                      boxShadow: '0px 3px 0px 0px #101828',
                      border: '1px solid #101828'
                    }}
                  >
                    <button 
                      className="accordions__control"
                      onClick={() => toggleAccordion(index)}
                      aria-expanded={openIndex === index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '24px 32px',
                        width: '100%',
                        position: 'relative',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        textAlign: 'left'
                      }}
                    >
                      <span className="accordions__number" style={{
                        fontSize: '36px',
                        fontFamily: 'Rubik, system-ui, -apple-system, sans-serif',
                        paddingRight: '1rem',
                        fontWeight: '500',
                        color: '#101828',
                        flexShrink: 0
                      }}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="accordions__title" style={{
                        fontFamily: 'Rubik, system-ui, -apple-system, sans-serif',
                        fontSize: '20px',
                        fontWeight: '500',
                        textTransform: 'capitalize',
                        flex: '1 1 auto',
                        display: 'flex',
                        lineHeight: '130%',
                        paddingRight: '1rem',
                        justifyContent: 'flex-start',
                        textAlign: 'left',
                        color: '#101828'
                      }}>
                        {faq.question}
                      </span>
                      <span 
                        className="accordions__icon"
                        data-open={openIndex === index}
                        style={{
                          flex: '0 0 40px',
                          display: 'flex',
                          width: '40px',
                          height: '40px',
                          backgroundColor: openIndex === index ? '#F58967' : '#f3f3f3',
                          border: '1px solid #101828',
                          borderRadius: '50%',
                          position: 'relative',
                          transition: '0.5s cubic-bezier(0.65, 0.2, 0.65, 1)',
                          transform: openIndex === index ? 'rotate(225deg)' : 'rotate(0deg)'
                        }}
                      ></span>
                    </button>
                    <div 
                      className="accordions__content text"
                      aria-hidden={openIndex !== index}
                      style={{
                        padding: openIndex === index ? '0 32px 24px 32px' : '0 32px',
                        maxHeight: openIndex === index ? '1000px' : '0',
                        overflow: 'hidden',
                        willChange: 'max-height',
                        transition: '0.5s cubic-bezier(0.65, 0.2, 0.65, 1)',
                        boxSizing: 'content-box',
                        position: 'relative',
                        zIndex: 5,
                        fontSize: '16px',
                        lineHeight: '160%',
                        color: '#101828'
                      }}
                    >
                      <p style={{ margin: 0, color: '#101828' }}>{faq.answer}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .accordions__icon::before {
          content: "";
          width: 1rem;
          height: 0.1875rem;
          background-color: #101828;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .accordions__icon::after {
          content: "";
          width: 1rem;
          height: 0.1875rem;
          background-color: #101828;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(90deg);
        }
        @media (max-width: 991.98px) {
          .faq-section {
            padding: 50px 0 !important;
          }
          .section-title {
            margin-bottom: 40px !important;
          }
        }
        @media (max-width: 767.98px) {
          .faq-section {
            padding: 40px 0 !important;
          }
          .section-title h2 {
            font-size: 2rem !important;
          }
          .accordions__control {
            padding: 20px 24px !important;
          }
          .accordions__number {
            font-size: 28px !important;
            padding-right: 0.75rem !important;
          }
          .accordions__title {
            font-size: 18px !important;
          }
          .accordions__icon {
            flex: 0 0 36px !important;
            width: 36px !important;
            height: 36px !important;
          }
          .accordions__content {
            padding: 0 24px !important;
            font-size: 15px !important;
          }
          .open .accordions__content {
            padding: 0 24px 20px 24px !important;
          }
        }
        @media (max-width: 479.98px) {
          .faq-section {
            padding: 30px 0 !important;
          }
          .section-title h2 {
            font-size: 1.75rem !important;
          }
          .section-title p {
            font-size: 0.9rem !important;
          }
          .accordions__list {
            gap: 1rem !important;
          }
          .accordions__item {
            border-radius: 1.2rem !important;
            box-shadow: 0px 2px 0px 0px #101828 !important;
          }
          .accordions__control {
            padding: 16px 20px !important;
          }
          .accordions__number {
            font-size: 24px !important;
            padding-right: 0.5rem !important;
          }
          .accordions__title {
            font-size: 16px !important;
          }
          .accordions__icon {
            flex: 0 0 32px !important;
            width: 32px !important;
            height: 32px !important;
          }
          .accordions__icon::before,
          .accordions__icon::after {
            width: 12px !important;
            height: 2px !important;
          }
          .accordions__content {
            padding: 0 20px !important;
            font-size: 14px !important;
          }
          .open .accordions__content {
            padding: 0px 20px 16px 20px !important;
          }
        }
      `}} />
    </section>
  );
};

export default Faq;
