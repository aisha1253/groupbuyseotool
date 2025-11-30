"use client";

import { useState } from "react";

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

  return (
    <section className="faq-section section-padding">
      <div className="container" style={{ maxWidth: '1200px', paddingLeft: '3rem', paddingRight: '3rem' }}>
        <div className="section-title text-center">
          <span className="sub-content wow fadeInUp" style={{ fontSize: '0.75rem', padding: '4px 10px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px', width: 'fit-content' }}>
            <img src="assets/img/bale.png" alt="img" style={{ width: '14px', height: '14px' }} />
            Some Question
          </span>
          <h2 className="wow fadeInUp" data-wow-delay=".3s">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="faq-content">
              <div className="faq-accordion">
                <div className="accordion" id="accordion">
                  {faqs.map((faq, index) => (
                    <div
                      key={index}
                      className="accordion-item wow fadeInUp"
                      data-wow-delay={`${0.3 + index * 0.2}s`}
                    >
                      <h4 className="accordion-header">
                        <button
                          className={`accordion-button ${openIndex === index ? '' : 'collapsed'}`}
                          type="button"
                          onClick={() => toggleAccordion(index)}
                          aria-expanded={openIndex === index}
                          aria-controls={`faq${index + 1}`}
                          style={{ cursor: 'pointer' }}
                        >
                          {faq.question}
                        </button>
                      </h4>
                      <div
                        id={`faq${index + 1}`}
                        className={`accordion-collapse ${openIndex === index ? 'show' : 'collapse'}`}
                      >
                        <div className="accordion-body">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .accordion-button {
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .accordion-button:not(.collapsed) {
          background-color: #F58967;
          color: #ffffff;
        }
        .accordion-button:not(.collapsed)::after {
          filter: brightness(0) invert(1);
        }
        .accordion-body {
          padding: 1rem 1.25rem;
          background-color: #ffffff;
          color: #696969;
          line-height: 1.6;
        }
        .accordion-item {
          border: 1px solid #E6E6E6;
          border-radius: 8px;
          margin-bottom: 15px;
          overflow: hidden;
        }
        .accordion-collapse {
          transition: all 0.3s ease;
          overflow: hidden;
        }
        .accordion-collapse.show {
          display: block !important;
          max-height: 1000px;
          opacity: 1;
        }
        .accordion-collapse.collapse:not(.show) {
          display: none !important;
        }
        .faq-section .accordion-body {
          display: block !important;
          visibility: visible !important;
        }
      `}} />
    </section>
  );
};
export default Faq;
