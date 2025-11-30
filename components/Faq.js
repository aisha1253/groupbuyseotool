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
    <section className="process" style={{ padding: '70px 0', fontFamily: 'Rubik, system-ui, -apple-system, sans-serif' }}>
      <div className="process__container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 15px' }}>
        <div className="process__intro intro" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '2.5rem',
          marginBottom: '80px'
        }}>
          <h2 className="process__title title" style={{
            fontSize: '40px',
            fontWeight: '500',
            lineHeight: '127.5%',
            position: 'relative',
            textTransform: 'capitalize',
            display: 'inline-flex',
            fontFamily: 'Rubik, system-ui, -apple-system, sans-serif',
            padding: '0 7px',
            margin: 0
          }}>
            Frequently Asked Questions
            <span style={{
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: -1,
              backgroundColor: '#F58967',
              borderRadius: '0.4375rem'
            }}></span>
          </h2>
          <div className="process__text text" style={{
            fontSize: '18px',
            lineHeight: '127%',
            maxWidth: '18.25rem',
            color: '#667085'
          }}>
            Step-by-Step Guide to Getting Started
          </div>
        </div>

        <div className="process__accordions">
          <ul className="accordions__list" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.8rem',
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
                  borderRadius: '2.8rem',
                  overflow: 'hidden',
                  transition: '0.5s cubic-bezier(0.65, 0.2, 0.65, 1)',
                  boxShadow: '0px 5px 0px 0px #101828',
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
                    padding: '40px 60px',
                    width: '100%',
                    position: 'relative',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <span className="accordions__number" style={{
                    fontSize: '60px',
                    fontFamily: 'Rubik, system-ui, -apple-system, sans-serif',
                    paddingRight: '1.5625rem',
                    fontWeight: '500',
                    color: '#101828',
                    flexShrink: 0
                  }}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="accordions__title" style={{
                    fontFamily: 'Rubik, system-ui, -apple-system, sans-serif',
                    fontSize: '30px',
                    fontWeight: '500',
                    textTransform: 'capitalize',
                    flex: '1 1 auto',
                    display: 'flex',
                    lineHeight: '120%',
                    paddingRight: '1.25rem',
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
                      flex: '0 0 58px',
                      display: 'flex',
                      width: '58px',
                      height: '58px',
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
                    padding: openIndex === index ? '20px 60px 40px 60px' : '0 60px',
                    maxHeight: openIndex === index ? '1000px' : '0',
                    overflow: 'hidden',
                    willChange: 'max-height',
                    transition: '0.5s cubic-bezier(0.65, 0.2, 0.65, 1)',
                    boxSizing: 'content-box',
                    position: 'relative',
                    zIndex: 5,
                    fontSize: '18px',
                    lineHeight: '127%',
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

      <style dangerouslySetInnerHTML={{__html: `
        .accordions__icon::before {
          content: "";
          width: 1.5625rem;
          height: 0.3125rem;
          background-color: #101828;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .accordions__icon::after {
          content: "";
          width: 1.5625rem;
          height: 0.3125rem;
          background-color: #101828;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(90deg);
        }
        @media (max-width: 991.98px) {
          .process__intro {
            margin-bottom: 32px !important;
          }
        }
        @media (max-width: 767.98px) {
          .process {
            padding: 30px 0 !important;
          }
          .process__intro {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 0.8rem !important;
          }
          .process__title {
            font-size: 36px !important;
          }
          .accordions__control {
            padding: 30px !important;
          }
          .accordions__number {
            font-size: 40px !important;
            padding-right: 0.625rem !important;
          }
          .accordions__title {
            font-size: 20px !important;
          }
          .accordions__content {
            padding: 0 30px !important;
          }
          .open .accordions__content {
            padding: 20px 30px !important;
          }
        }
        @media (max-width: 479.98px) {
          .process__title {
            font-size: 28px !important;
          }
          .process__text {
            font-size: 16px !important;
          }
          .accordions__list {
            gap: 1.25rem !important;
          }
          .accordions__item {
            border-radius: 1.5rem !important;
          }
          .accordions__control {
            padding: 20px !important;
          }
          .accordions__number {
            font-size: 20px !important;
          }
          .accordions__icon {
            flex: 0 0 32px !important;
            width: 32px !important;
            height: 32px !important;
          }
          .accordions__icon::before,
          .accordions__icon::after {
            width: 15px !important;
            height: 2px !important;
          }
          .accordions__content {
            padding: 0 20px !important;
          }
          .open .accordions__content {
            padding: 0px 20px 20px 20px !important;
          }
        }
      `}} />
    </section>
  );
};

export default Faq;
