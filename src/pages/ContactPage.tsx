import React, { useState } from 'react';
import { SEOHead } from '../components/seo/SEOHead';
import { Mail, Send, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Contact', path: '/contact' },
  ];

  const contactJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact CoinFlip.io Support',
    description: 'Get in touch with the CoinFlip.io development team for inquiries, bug reports, and educational partnerships.',
    url: 'https://coinfliptool.netlify.app/contact',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <SEOHead
        title="Contact Us – CoinFlip.io Support & Feedback"
        description="Have questions or suggestions about our virtual coin flip tool or probability lab? Contact the CoinFlip.io team."
        keywords="contact coin flip, coinflip support, feedback, bug report"
        canonicalPath="/contact"
        breadcrumbs={breadcrumbs}
        jsonLd={contactJsonLd}
      />

      <div className="space-y-10 max-w-2xl mx-auto">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            Get In Touch
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white flex items-center justify-center gap-2.5">
            <Mail className="w-8 h-8 text-amber-500" />
            Contact & Support
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto">
            Questions, probability feedback, or ideas for educational features? We would love to hear from you.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
          {submitted ? (
            <div className="py-8 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Thank You for Reaching Out!
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Your feedback has been noted. Because CoinFlip.io is 100% frontend, all inquiries are processed locally or via open source issue tracking.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label htmlFor="name" className="text-xs font-bold uppercase text-slate-700 dark:text-slate-300">
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="e.g. Jane Doe"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="email" className="text-xs font-bold uppercase text-slate-700 dark:text-slate-300">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="jane@example.com"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="message" className="text-xs font-bold uppercase text-slate-700 dark:text-slate-300">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Share your thoughts or questions..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Submit Feedback</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};
