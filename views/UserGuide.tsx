import React, { useState } from 'react';
import { Book, ChevronRight } from 'lucide-react';

export const UserGuide: React.FC = () => {
  const [activeSection, setActiveSection] = useState('getting-started');

  const sections = [
    { id: 'getting-started', title: 'Getting Started' },
    { id: 'books', title: 'Managing Books' },
    { id: 'members', title: 'Member Management' },
    { id: 'loans', title: 'Loans & Returns' },
    { id: 'reports', title: 'Reports & Analytics' },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'getting-started':
        return (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Getting Started with LibraSync</h2>
              <p className="text-slate-600 leading-relaxed">
                Welcome to LibraSync, your comprehensive Library Management System. This guide will help you navigate the core features and get your library up and running efficiently.
              </p>
            </div>
            
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-indigo-900 mb-2">Quick Start Checklist</h3>
              <ul className="space-y-3">
                {[
                  "Log in with your administrator credentials",
                  "Configure basic library settings (Settings > General)",
                  "Add your first book to the inventory",
                  "Register a library member",
                  "Process a test loan"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-indigo-800">
                    <div className="w-6 h-6 rounded-full bg-indigo-200 text-indigo-700 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                      {i + 1}
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      case 'books':
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Managing Books</h2>
            
            <div className="prose prose-slate max-w-none">
              <h3 className="text-lg font-semibold text-slate-800">Adding New Books</h3>
              <p className="text-slate-600 mb-4">
                Navigate to the <strong>Books Inventory</strong> section and click the <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded text-xs font-mono">Add New Book</span> button.
                You'll need to provide:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-1 mb-6 ml-4">
                <li>Title & Author</li>
                <li>ISBN (13-digit preferred)</li>
                <li>Category/Genre</li>
                <li>Quantity (Total copies owned)</li>
              </ul>

              <h3 className="text-lg font-semibold text-slate-800">Updating Inventory</h3>
              <p className="text-slate-600">
                To edit a book's details or update the quantity, click the <span className="text-slate-500 font-mono text-sm">Edit</span> icon next to any book in the list.
                Deleting a book is only possible if there are no active loans for it.
              </p>
            </div>
          </div>
        );
      case 'members':
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Member Management</h2>
            <p className="text-slate-600">
              The <strong>Members</strong> section allows you to manage library patrons. 
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="border border-slate-200 rounded-lg p-4">
                <h4 className="font-semibold text-slate-800 mb-2">Active Members</h4>
                <p className="text-sm text-slate-500">Members in good standing who can borrow books. They have cleared all major fines.</p>
              </div>
              <div className="border border-slate-200 rounded-lg p-4 bg-rose-50 border-rose-100">
                <h4 className="font-semibold text-rose-800 mb-2">Suspended Members</h4>
                <p className="text-sm text-rose-600">Members who are temporarily blocked from borrowing due to lost books or excessive unpaid fines.</p>
              </div>
            </div>
          </div>
        );
      case 'loans':
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Loans & Returns</h2>
            <p className="text-slate-600 mb-4">
              This is the heart of the daily operations. The <strong>Loans</strong> dashboard gives you a quick overview of all active, returned, and overdue items.
            </p>

            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600">
                  <Book size={16} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800">Issuing a Loan</h4>
                  <p className="text-sm text-slate-600 mt-1">
                    Click "New Loan", select a Member and a Book. The system will automatically calculate the due date (default: 14 days).
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 text-green-600">
                  <Book size={16} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800">Processing Returns</h4>
                  <p className="text-sm text-slate-600 mt-1">
                    Find the active loan and click "Return". If the book is overdue, the system will prompt you with the calculated fine amount before closing the loan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
       case 'reports':
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Reports & Analytics</h2>
            <p className="text-slate-600">
              Gain insights into your library's performance. The reports section provides visual data on:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
              <li>Most popular books and categories</li>
              <li>Member activity trends</li>
              <li>Financial overview (fines collected)</li>
              <li>Inventory status (lost vs. available books)</li>
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden min-h-[600px] flex flex-col md:flex-row transition-colors duration-300">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-slate-50 dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 p-4">
        <h3 className="font-bold text-slate-400 text-xs uppercase tracking-wider mb-4 px-3">Table of Contents</h3>
        <div className="space-y-1">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-between group ${
                activeSection === section.id 
                  ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              {section.title}
              {activeSection === section.id && <ChevronRight size={14} />}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-8 overflow-y-auto bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
        <div className="prose dark:prose-invert prose-slate max-w-none">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};
