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
    name: 'Contact coinfliptool Support',
    description: 'Get in touch with creator Shoaib Arif for inquiries, bug reports, and educational partnerships.',
    url: 'https://coin-flip-tool.netlify.app/contact',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <SEOHead
        title="Contact Us – coinfliptool Creator & Support"
        description="Have questions or suggestions about our virtual coin flip tool or probability lab? Contact creator Shoaib Arif."
        keywords="contact coinfliptool, shoaib arif, coin flip support, feedback, bug report"
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
            Questions, probability feedback, or ideas for educational features? Reach out directly to creator Shoaib Arif.
          </p>
        </div>

        {/* Creator Direct Channels */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <a
            href="https://shoaibarif.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 hover:border-amber-500 flex flex-col items-center text-center gap-1.5 transition-all group shadow-sm hover:shadow-md"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
            </div>
            <span className="text-xs font-black text-slate-900 dark:text-white">Portfolio</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">shoaibarif.vercel.app</span>
          </a>

          <a
            href="https://github.com/shoaibmarif"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 hover:border-amber-500 flex flex-col items-center text-center gap-1.5 transition-all group shadow-sm hover:shadow-md"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-500/10 text-slate-700 dark:text-slate-300 flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5 fill-currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </div>
            <span className="text-xs font-black text-slate-900 dark:text-white">GitHub</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">@shoaibmarif</span>
          </a>

          <a
            href="https://www.linkedin.com/in/shoaibmarif/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 hover:border-amber-500 flex flex-col items-center text-center gap-1.5 transition-all group shadow-sm hover:shadow-md"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5 fill-currentColor" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
            </div>
            <span className="text-xs font-black text-slate-900 dark:text-white">LinkedIn</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">in/shoaibmarif</span>
          </a>
        </div>

        <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
          {submitted ? (
            <div className="py-8 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Thank You for Reaching Out!
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Your feedback has been noted. You can also connect directly with Shoaib on LinkedIn or GitHub.
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
