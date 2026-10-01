import { useEffect, useState } from "react";

import { getPrivacyPolicy } from "../services/privacyService";

const Privacy = () => {
  const [policy, setPolicy] = useState(null);

  useEffect(() => {
    const loadPolicy = async () => {
      try {
        const response = await getPrivacyPolicy();
        setPolicy(response?.policy || null);
      } catch {
        setPolicy(null);
      }
    };

    loadPolicy();
  }, []);

  return (
    <section className="min-h-screen bg-white px-4 py-20 dark:bg-slate-950">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
            Privacy
          </p>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white sm:text-5xl">
            {policy?.title || "Privacy Policy"}
          </h1>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-blue-600" />
        </div>

        <div className="space-y-8 rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8 lg:p-10">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Introduction</h2>
            <p className="mt-3 leading-8 text-slate-600 dark:text-slate-400">
              This Privacy Policy explains how Durga Bahadur Shrestha collects, uses, and protects
              information shared through this website, including contact form submissions and general
              portfolio visits.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Information we collect</h2>
            <p className="mt-3 leading-8 text-slate-600 dark:text-slate-400">
              We may collect your name, email address, phone number, message content, and any other
              information you voluntarily provide when contacting us or submitting an enquiry through
              the website.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">How we use this information</h2>
            <p className="mt-3 leading-8 text-slate-600 dark:text-slate-400">
              Information is used to respond to enquiries, provide services, review project requests,
              manage communication, and improve the user experience across the portfolio.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Data protection</h2>
            <p className="mt-3 leading-8 text-slate-600 dark:text-slate-400">
              Appropriate technical and organizational measures are used to protect personal
              information from unauthorized access, alteration, disclosure, or loss.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Cookies and analytics</h2>
            <p className="mt-3 leading-8 text-slate-600 dark:text-slate-400">
              This portfolio records aggregate page-view totals by day to understand overall site
              usage. Analytics does not store visitor names, IP addresses, or persistent visitor IDs.
            </p>
          </div>

          {policy?.summary && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Summary</h2>
              <p className="mt-3 leading-8 text-slate-600 dark:text-slate-400">{policy.summary}</p>
            </div>
          )}

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Policy details</h2>
            <p className="mt-3 whitespace-pre-line leading-8 text-slate-600 dark:text-slate-400">
              {policy?.content ||
                "This Privacy Policy explains how Durga Bahadur Shrestha collects, uses, and protects your personal information when you interact with this website, contact form, or download content. We are committed to protecting your privacy and using your data responsibly."}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Your rights</h2>
            <p className="mt-3 leading-8 text-slate-600 dark:text-slate-400">
              You may request access to, correction of, or deletion of your personal data, and you can
              contact us through the site if you have any questions about this policy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Privacy;
