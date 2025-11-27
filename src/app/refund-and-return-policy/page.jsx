const RefundAndReturnPolicyPage = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <section className="min-h-screen bg-[#f8fafc] py-12 px-4">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Header */}
        <header className="space-y-4 text-center">
          <h1 className="text-4xl font-bold text-slate-900">Refund & Return Policy</h1>
          <p className="text-base text-slate-600">
            Last updated: {currentDate}
          </p>
        </header>

        {/* Eligibility */}
        <div className="rounded-2xl bg-white p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">1. Eligibility</h2>
          <ul className="list-disc list-inside space-y-2 text-base text-slate-600 ml-4">
            <li>Damaged items</li>
            <li>Wrong items received</li>
            <li>Manufacturing defects</li>
            <li>Expired items</li>
            <li>Requests must be made within 48 hours</li>
          </ul>
        </div>

        {/* Conditions */}
        <div className="rounded-2xl bg-white p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">2. Conditions</h2>
          <ul className="list-disc list-inside space-y-2 text-base text-slate-600 ml-4">
            <li>Product must be unused</li>
            <li>Original packaging must be intact</li>
            <li>Opened food products are not eligible</li>
          </ul>
        </div>

        {/* Refund Process */}
        <div className="rounded-2xl bg-white p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">3. Refund Process</h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Refunds are processed within 3–7 working days after inspection.
          </p>
        </div>

        {/* Non-Returnable Items */}
        <div className="rounded-2xl bg-white p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">4. Non-Returnable Items</h2>
          <ul className="list-disc list-inside space-y-2 text-base text-slate-600 ml-4">
            <li>Opened food products</li>
            <li>Used items</li>
            <li>Items missing parts</li>
            <li>Customized products</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="rounded-2xl bg-white p-6 md:p-8 shadow-md">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">5. Contact</h2>
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

export default RefundAndReturnPolicyPage;

