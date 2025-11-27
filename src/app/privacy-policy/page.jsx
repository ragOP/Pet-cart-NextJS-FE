const PrivacyPolicyPage = () => {
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
          <h1 className="text-4xl font-bold text-slate-900">Privacy Policy</h1>
          <p className="text-base text-slate-600">
            Last updated: {currentDate}
          </p>
        </header>

        {/* Introduction */}
        <div className="rounded-2xl bg-white p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">1. Introduction</h2>
          <p className="text-base text-slate-600 leading-relaxed">
            This Privacy Policy explains how PetCaart collects, uses, stores, and protects your information.
          </p>
        </div>

        {/* Information We Collect */}
        <div className="rounded-2xl bg-white p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">2. Information We Collect</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Personal Information:</h3>
              <ul className="list-disc list-inside space-y-2 text-base text-slate-600 ml-4">
                <li>Name</li>
                <li>Email</li>
                <li>Phone number</li>
                <li>Delivery address</li>
                <li>Order details</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Automatically Collected Information:</h3>
              <ul className="list-disc list-inside space-y-2 text-base text-slate-600 ml-4">
                <li>IP address</li>
                <li>Device details</li>
                <li>Browser type</li>
                <li>Usage data</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Account Information:</h3>
              <ul className="list-disc list-inside space-y-2 text-base text-slate-600 ml-4">
                <li>Order history</li>
                <li>Wishlist items</li>
                <li>Cart activity</li>
              </ul>
            </div>
          </div>
        </div>

        {/* How We Use Your Information */}
        <div className="rounded-2xl bg-white p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">3. How We Use Your Information</h2>
          <ul className="list-disc list-inside space-y-2 text-base text-slate-600 ml-4">
            <li>Process and deliver orders</li>
            <li>Provide customer support</li>
            <li>Improve our website/app</li>
            <li>Personalize recommendations</li>
            <li>Send order updates</li>
            <li>Prevent fraud</li>
          </ul>
        </div>

        {/* Sharing of Information */}
        <div className="rounded-2xl bg-white p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">4. Sharing of Information</h2>
          <p className="text-base text-slate-600 leading-relaxed">
            We may share your data with delivery partners, payment gateways, analytics providers, and service providers.
          </p>
        </div>

        {/* Cookies */}
        <div className="rounded-2xl bg-white p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">5. Cookies</h2>
          <p className="text-base text-slate-600 leading-relaxed">
            We use cookies to enhance user experience and analyze usage.
          </p>
        </div>

        {/* Data Security */}
        <div className="rounded-2xl bg-white p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">6. Data Security</h2>
          <p className="text-base text-slate-600 leading-relaxed">
            We use industry-standard security methods to protect your information.
          </p>
        </div>

        {/* Your Rights */}
        <div className="rounded-2xl bg-white p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">7. Your Rights</h2>
          <ul className="list-disc list-inside space-y-2 text-base text-slate-600 ml-4">
            <li>Access your information</li>
            <li>Request changes</li>
            <li>Request deletion</li>
            <li>Opt out of promotional messages</li>
          </ul>
        </div>

        {/* External Links */}
        <div className="rounded-2xl bg-white p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">8. External Links</h2>
          <p className="text-base text-slate-600 leading-relaxed">
            We are not responsible for the privacy practices of external websites.
          </p>
        </div>

        {/* Children's Privacy */}
        <div className="rounded-2xl bg-white p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">9. Children's Privacy</h2>
          <p className="text-base text-slate-600 leading-relaxed">
            PetCaart does not knowingly collect data from children under 13.
          </p>
        </div>

        {/* Contact */}
        <div className="rounded-2xl bg-white p-6 md:p-8 shadow-md">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">10. Contact</h2>
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

export default PrivacyPolicyPage;

