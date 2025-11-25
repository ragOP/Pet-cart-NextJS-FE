const supportTopics = [
  {
    title: "Account Assistance",
    description: "Help with login, profile settings, and account-related queries.",
  },
  {
    title: "Technical Support",
    description: "Guidance for app or website issues, errors, or performance problems.",
  },
  {
    title: "General Queries",
    description: "Information about features, usage, and commonly asked questions.",
  },
  {
    title: "Feedback & Suggestions",
    description: "Share your ideas to help us improve and enhance your experience.",
  },
];

const SupportPage = () => {
  return (
    <section className="min-h-screen bg-[#f8fafc] py-12 px-4">
      <div className="mx-auto max-w-4xl space-y-10">
        <header className="space-y-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#f19813]">
            Support
          </p>
          <h1 className="text-3xl font-bold text-slate-900">
            We’re here to help you get the best experience possible.
          </h1>
          <p className="text-base text-slate-600">
            If you have questions, encounter an issue, or need guidance, our support team is always
            ready to assist.
          </p>
        </header>

        <div className="space-y-5 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">How We Can Help</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {supportTopics.map((topic) => (
              <div key={topic.title} className="rounded-xl border border-slate-100 p-5 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">{topic.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{topic.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">Response Expectations</h2>
          <p className="mt-3 text-base text-slate-600">
            Our team works hard to reply as quickly as possible. You can expect clear communication
            and timely updates for any ongoing issues.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-md">
          <h2 className="text-2xl font-semibold">Need Support?</h2>
          <p className="mt-2 text-base text-slate-600">
            Reach out using any of the channels below and we’ll get back to you shortly.
          </p>
          <div className="mt-6 space-y-4 text-lg font-semibold">
            <p>Phone: <a href="tel:9510684143" className="text-[#0888B1] hover:underline">9510684143</a></p>
            <p>Email: <a href="mailto:support@petcaart.com" className="text-[#0888B1] hover:underline">support@petcaart.com</a></p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportPage;

