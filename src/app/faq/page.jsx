const FAQPage = () => {
  const faqs = [
    {
      question: "What is PetCaart?",
      answer: "PetCaart is an ecommerce platform for pet essentials."
    },
    {
      question: "Do I need an account?",
      answer: "Yes, an account is needed to place and track orders."
    },
    {
      question: "What payment methods do you accept?",
      answer: "UPI, debit/credit cards, and digital wallets."
    },
    {
      question: "How long does delivery take?",
      answer: "1–5 working days depending on your location."
    },
    {
      question: "Can I cancel my order?",
      answer: "You may cancel before the order is shipped."
    },
    {
      question: "What items are eligible for return?",
      answer: "Damaged, wrong, or defective items."
    },
    {
      question: "How do I track my order?",
      answer: "You will receive a tracking link via SMS/email."
    },
    {
      question: "Are products genuine?",
      answer: "Yes, all products are from verified suppliers."
    }
  ];

  return (
    <section className="min-h-screen bg-[#f8fafc] py-12 px-4">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Header */}
        <header className="space-y-4 text-center">
          <h1 className="text-4xl font-bold text-slate-900">Frequently Asked Questions (FAQ)</h1>
        </header>

        {/* FAQ Items */}
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="rounded-2xl bg-white p-6 md:p-8 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900 mb-3">
                {faq.question}
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        {/* Support Contact */}
        <div className="rounded-2xl bg-white p-6 md:p-8 shadow-md">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Support Contact</h2>
          <div className="space-y-3 text-base">
            <p className="text-slate-600">
              Email: <a href="mailto:support@petcaart.com" className="text-[#0888B1] hover:underline font-medium">support@petcaart.com</a>
            </p>
            <p className="text-slate-600">
              Phone: <a href="tel:+919510684143" className="text-[#0888B1] hover:underline font-medium">+91 95106 84143</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQPage;

