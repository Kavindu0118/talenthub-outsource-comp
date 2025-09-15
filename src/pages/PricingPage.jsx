import React, { useState } from "react";
import styles from "../styles/components/PricingPage.module.css";

export default function PricingPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Do I get a discount if I pay annually?",
      answer:
        "Yes. Annual billing gives you nearly a 10–15% discount compared to paying month-to-month. Many of our clients choose yearly billing to save costs while securing long-term hiring support. You can still upgrade your plan anytime during the year if your hiring needs increase.",
    },
    {
      question: "What is the minimum contract length?",
      answer:
        "Our Basic and Pro plans start with a 3-month minimum commitment. This ensures a smooth recruitment cycle and better integration of your new hires. Enterprise clients can customize contract durations to match project timelines or company goals.",
    },
    {
      question: "Can I upgrade or downgrade my plan later?",
      answer:
        "Absolutely. You can switch between plans at any point. If you upgrade mid-cycle, we’ll apply prorated billing so you only pay for what you use. Downgrades take effect from the next billing cycle.",
    },
    {
      question: "What happens if a hire doesn’t work out?",
      answer:
        "Talentphere provides a satisfaction guarantee. If a candidate leaves or isn’t the right fit within the first 30 days, we’ll rematch you with another qualified professional at no additional cost.",
    },
    {
      question: "How does Talentphere screen and vet candidates?",
      answer:
        "All professionals undergo a multi-step vetting process including skills assessments, background verification, and client feedback checks. You’re only connected with pre-vetted, job-ready talent.",
    },
    {
      question: "Is there a limit to how many candidates I can hire?",
      answer:
        "The Basic and Pro plans have monthly hire limits (10 or 30 hires). Enterprise clients enjoy unlimited hires with a dedicated account manager to streamline the process.",
    },
    {
      question: "What kind of support will I receive?",
      answer:
        "Every plan includes responsive email support. Pro and Enterprise clients also receive priority support and a dedicated account manager. Enterprise clients can request 24/7 support.",
    },
    {
      question: "Do you provide global hiring support?",
      answer:
        "Yes. Talentphere works with clients and professionals worldwide. Whether you’re hiring locally or remotely, our platform ensures smooth onboarding, compliance guidance, and secure contract management.",
    },
  ];

  return (
    <div className={styles.pricingPage}>
      {/* Pricing Section */}
      <section className={styles.pricingSection}>
        <h1>Our Pricing Plans</h1>
        <div className={styles.pricingCards}>
          <div className={styles.card}>
            <h2>Basic</h2>
            <p>$199 / month</p>
            <ul>
              <li>Up to 10 hires</li>
              <li>Email support</li>
              <li>Standard vetting</li>
            </ul>
            <button>Get Started</button>
          </div>

          <div className={styles.card}>
            <h2>Pro</h2>
            <p>$499 / month</p>
            <ul>
              <li>Up to 30 hires</li>
              <li>Priority support</li>
              <li>Dedicated account manager</li>
            </ul>
            <button>Get Started</button>
          </div>

          <div className={styles.card}>
            <h2>Enterprise</h2>
            <p>Custom Pricing</p>
            <ul>
              <li>Unlimited hires</li>
              <li>24/7 premium support</li>
              <li>Custom solutions</li>
            </ul>
            <button>Contact Us</button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.faqSection}>
        <h2>Frequently Asked Questions</h2>
        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <div key={index} className={styles.faqItem}>
              <button
                className={styles.question}
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                <span className={styles.icon}>
                  {openIndex === index ? "-" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <div className={styles.answer}>{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
