import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Mail, MessageCircle, FileText, ExternalLink, ArrowLeft } from 'lucide-react';
import { Card, Button, Input } from '../components/UI';
import { UserGuide } from './UserGuide';
import { LiveChat } from '../components/LiveChat';

const FAQS = [
  { question: "How do I calculate fines for overdue books?", answer: "Fines are calculated automatically by the system based on the default daily rate set in Settings (default $0.50/day). You can see the total fine in the Return modal." },
  { question: "Can I extend a loan duration?", answer: "Currently, you must return the book and issue a new loan to extend the duration. An 'Extend Loan' feature is coming in v2.0." },
  { question: "How do I add multiple copies of the same book?", answer: "When adding a book, simply set the 'Quantity' field to the number of copies you have. The system tracks availability automatically." },
  { question: "Is my data backed up?", answer: "Yes, LibraSync performs automatic daily backups of all member and transaction data to our secure cloud servers." },
];

export const HelpView: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showDocs, setShowDocs] = useState(false);
  const [showChat, setShowChat] = useState(false);

  if (showDocs) {
    return (
      <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
        <button 
          onClick={() => setShowDocs(false)} 
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-medium transition-colors"
        >
          <ArrowLeft size={18} />
          Back to Help Center
        </button>
        <UserGuide />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">How can we help you?</h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg">Search our knowledge base or get in touch with support.</p>
        <div className="mt-6 max-w-xl mx-auto relative">
          <input 
            type="text" 
            placeholder="Search for answers..." 
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-white shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          onClick={() => setShowDocs(true)}
          className="bg-indigo-600 dark:bg-indigo-700 rounded-xl p-6 text-white text-center shadow-lg shadow-indigo-200 dark:shadow-none cursor-pointer hover:-translate-y-1 transition-transform"
        >
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
            <FileText size={24} />
          </div>
          <h3 className="font-bold text-lg">Documentation</h3>
          <p className="text-indigo-100 text-sm mt-2 mb-4">Read the full user guide</p>
          <div className="flex items-center justify-center gap-1 text-sm font-medium hover:underline">
            View Docs <ExternalLink size={14} />
          </div>
        </div>
        
        <a href="mailto:support@librasync.com" className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-100 dark:border-slate-800 text-center shadow-sm cursor-pointer hover:-translate-y-1 transition-transform block">
          <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Mail size={24} />
          </div>
          <h3 className="font-bold text-lg text-slate-800 dark:text-white">Email Support</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 mb-4">Get a response within 24h</p>
          <span className="text-indigo-600 dark:text-indigo-400 text-sm font-medium">support@librasync.com</span>
        </a>

        <div 
          onClick={() => setShowChat(true)}
          className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-100 dark:border-slate-800 text-center shadow-sm cursor-pointer hover:-translate-y-1 transition-transform"
        >
          <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-lg flex items-center justify-center mx-auto mb-4">
            <MessageCircle size={24} />
          </div>
          <h3 className="font-bold text-lg text-slate-800 dark:text-white">Live Chat</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 mb-4">Available Mon-Fri, 9am-5pm</p>
          <span className="text-indigo-600 dark:text-indigo-400 text-sm font-medium">Start Chat</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Frequently Asked Questions</h2>
          {FAQS.map((faq, index) => (
            <div key={index} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
              <button 
                className="w-full flex items-center justify-between p-4 text-left font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                {faq.question}
                {openFaq === index ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
              </button>
              {openFaq === index && (
                <div className="p-4 pt-0 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                  <div className="mt-3">{faq.answer}</div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div>
          <Card title="Contact Us">
            <form className="space-y-4">
              <Input label="Subject" placeholder="What is this about?" />
              <div className="flex flex-col gap-1 w-full">
                <label className="text-sm font-medium text-gray-700">Message</label>
                <textarea 
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow h-32 resize-none"
                  placeholder="Describe your issue..."
                ></textarea>
              </div>
              <Button className="w-full justify-center">Send Message</Button>
            </form>
          </Card>
        </div>
      </div>
      
      {showChat && <LiveChat onClose={() => setShowChat(false)} />}
    </div>
  );
};
