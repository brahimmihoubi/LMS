import React, { useState } from 'react';
import { ArrowLeftRight, CheckCircle, AlertCircle } from 'lucide-react';
import { Book, Loan, Member } from '../types';
import { Button, Input, Modal, Badge } from '../components/UI';
import { LoanService } from '../services/store';

interface LoansViewProps {
  loans: Loan[];
  books: Book[];
  members: Member[];
  onUpdate: () => void;
}

export const LoansView: React.FC<LoansViewProps> = ({ loans, books, members, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState('');
  const [selectedMember, setSelectedMember] = useState('');
  const [error, setError] = useState('');

  const handleIssueBook = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      LoanService.create(selectedBook, selectedMember);
      onUpdate();
      setIsModalOpen(false);
      setSelectedBook('');
      setSelectedMember('');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleReturn = (id: string) => {
    if (confirm('Confirm return of this book?')) {
      LoanService.returnBook(id);
      onUpdate();
    }
  };

  const activeLoans = loans.filter(l => l.status !== 'RETURNED');
  const historyLoans = loans.filter(l => l.status === 'RETURNED').sort((a, b) => b.returnDate!.localeCompare(a.returnDate!));

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Loans & Returns</h1>
          <p className="text-slate-500">Track borrowed books and manage returns.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <ArrowLeftRight size={18} /> Issue Book
        </Button>
      </div>

      {/* Active Loans Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 font-semibold text-gray-800 bg-slate-50/50">
          Active Loans
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-medium">
              <tr>
                <th className="px-6 py-3">Book</th>
                <th className="px-6 py-3">Member</th>
                <th className="px-6 py-3">Due Date</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {activeLoans.map(loan => {
                const book = books.find(b => b.id === loan.bookId);
                const member = members.find(m => m.id === loan.memberId);
                return (
                  <tr key={loan.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-900">{book?.title || 'Unknown Book'}</td>
                    <td className="px-6 py-4 text-slate-600">{member?.name || 'Unknown Member'}</td>
                    <td className="px-6 py-4 text-slate-600">{loan.dueDate}</td>
                    <td className="px-6 py-4">
                      <Badge color={loan.status === 'OVERDUE' ? 'red' : 'blue'}>{loan.status}</Badge>
                      {loan.fine > 0 && <span className="ml-2 text-xs text-rose-600 font-bold">+${loan.fine.toFixed(2)} Fine</span>}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="secondary" onClick={() => handleReturn(loan.id)} className="text-xs px-3 py-1 h-auto">
                        Return
                      </Button>
                    </td>
                  </tr>
                );
              })}
              {activeLoans.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-400">No active loans currently.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* History Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden opacity-75 hover:opacity-100 transition-opacity">
        <div className="px-6 py-4 border-b border-slate-100 font-semibold text-gray-800 bg-slate-50/50">
          Return History
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-medium">
              <tr>
                <th className="px-6 py-3">Book</th>
                <th className="px-6 py-3">Member</th>
                <th className="px-6 py-3">Returned On</th>
                <th className="px-6 py-3">Fine Paid</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {historyLoans.map(loan => {
                const book = books.find(b => b.id === loan.bookId);
                const member = members.find(m => m.id === loan.memberId);
                return (
                  <tr key={loan.id}>
                    <td className="px-6 py-4 text-slate-700">{book?.title}</td>
                    <td className="px-6 py-4 text-slate-600">{member?.name}</td>
                    <td className="px-6 py-4 text-slate-500">{loan.returnDate}</td>
                    <td className="px-6 py-4">
                      {loan.fine > 0 ? <span className="text-rose-600 font-medium">${loan.fine.toFixed(2)}</span> : <span className="text-emerald-600">None</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Issue New Loan">
        <form onSubmit={handleIssueBook} className="space-y-4">
          {error && <div className="p-3 bg-rose-50 text-rose-600 text-sm rounded-lg flex items-center gap-2"><AlertCircle size={16}/> {error}</div>}
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Select Member</label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              value={selectedMember}
              onChange={e => setSelectedMember(e.target.value)}
              required
            >
              <option value="">-- Choose Member --</option>
              {members.filter(m => m.status === 'ACTIVE').map(m => (
                <option key={m.id} value={m.id}>{m.name} ({m.email})</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Select Book</label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              value={selectedBook}
              onChange={e => setSelectedBook(e.target.value)}
              required
            >
              <option value="">-- Choose Book --</option>
              {books.filter(b => b.available > 0).map(b => (
                <option key={b.id} value={b.id}>{b.title} (Qty: {b.available})</option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit">Confirm Issue</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
