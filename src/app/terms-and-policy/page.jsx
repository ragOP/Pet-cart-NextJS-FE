const TermsAndConditionsPage = () => {
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
          <h1 className="text-4xl font-bold text-slate-900">Terms and Conditions</h1>
          <p className="text-base text-slate-600">
            Last updated: {currentDate}
          </p>
        </header>

        {/* Introduction */}
        <div className="rounded-2xl bg-white p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">1. Introduction</h2>
          <p className="text-base text-slate-600 leading-relaxed">
            By using PetCaart, you agree to these terms.
          </p>
        </div>

        {/* Use of Platform */}
        <div className="rounded-2xl bg-white p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">2. Use of Platform</h2>
          <ul className="list-disc list-inside space-y-2 text-base text-slate-600 ml-4">
            <li>Provide accurate information</li>
            <li>Do not misuse the platform</li>
          </ul>
        </div>

        {/* Product Information */}
        <div className="rounded-2xl bg-white p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">3. Product Information</h2>
          <p className="text-base text-slate-600 leading-relaxed">
            We aim for accuracy but errors may occur.
          </p>
        </div>

        {/* Pricing */}
        <div className="rounded-2xl bg-white p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">4. Pricing</h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Prices may change without notice.
          </p>
        </div>

        {/* Orders & Cancellations */}
        <div className="rounded-2xl bg-white p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">5. Orders & Cancellations</h2>
          <ul className="list-disc list-inside space-y-2 text-base text-slate-600 ml-4">
            <li>We may cancel suspicious orders</li>
            <li>Orders may be cancelled if stock is unavailable</li>
          </ul>
        </div>

        {/* Intellectual Property */}
        <div className="rounded-2xl bg-white p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">6. Intellectual Property</h2>
          <p className="text-base text-slate-600 leading-relaxed">
            All content belongs to PetCaart.
          </p>
        </div>

        {/* Limitation of Liability */}
        <div className="rounded-2xl bg-white p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">7. Limitation of Liability</h2>
          <p className="text-base text-slate-600 leading-relaxed">
            PetCaart is not responsible for courier delays, misuse, or third-party failures.
          </p>
        </div>

        {/* User Responsibilities */}
        <div className="rounded-2xl bg-white p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">8. User Responsibilities</h2>
          <p className="text-base text-slate-600 leading-relaxed">
            You must maintain account and password security.
          </p>
        </div>

        {/* Contact */}
        <div className="rounded-2xl bg-white p-6 md:p-8 shadow-md">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">9. Contact</h2>
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

export default TermsAndConditionsPage;

