import React, { useState } from 'react';
import { UserPlus, Search, MoreVertical, Trash2, AlertTriangle } from 'lucide-react';
import { Member } from '../types';
import { Button, Input, Modal, Badge } from '../components/UI';
import { MemberService } from '../services/store';

interface MembersViewProps {
  members: Member[];
  onUpdate: () => void;
}

export const MembersView: React.FC<MembersViewProps> = ({ members, onUpdate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMember, setCurrentMember] = useState<Partial<Member>>({});
  
  // Delete Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<string | null>(null);

  const filteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    MemberService.add(currentMember as Omit<Member, 'id' | 'status' | 'joinDate'>);
    onUpdate();
    setIsModalOpen(false);
    setCurrentMember({});
  };

  const toggleStatus = (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
    MemberService.updateStatus(id, newStatus);
    onUpdate();
  };

  const confirmDelete = (id: string) => {
    setMemberToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    if (memberToDelete) {
      MemberService.delete(memberToDelete);
      onUpdate();
      setIsDeleteModalOpen(false);
      setMemberToDelete(null);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Members</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage library members and access.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <UserPlus size={18} /> Add Member
        </Button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search members..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900 outline-none text-sm text-slate-700 dark:text-slate-200"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-medium">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Join Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredMembers.map(member => (
                <tr key={member.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900 dark:text-white">{member.name}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">ID: {member.id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-slate-700 dark:text-slate-300">{member.email}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">{member.phone}</div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{member.joinDate}</td>
                  <td className="px-6 py-4">
                    <Badge color={member.status === 'ACTIVE' ? 'green' : 'red'}>{member.status}</Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button 
                        onClick={() => toggleStatus(member.id, member.status)}
                        className={`text-xs font-medium hover:underline ${member.status === 'ACTIVE' ? 'text-amber-600 dark:text-amber-500' : 'text-emerald-600 dark:text-emerald-400'}`}
                      >
                        {member.status === 'ACTIVE' ? 'Suspend' : 'Activate'}
                      </button>
                      <button 
                        onClick={() => confirmDelete(member.id)}
                        className="text-slate-400 hover:text-rose-500 transition-colors"
                        title="Delete Member"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredMembers.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500 dark:text-slate-400">
                    No members found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Member Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Register New Member">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Full Name" value={currentMember.name || ''} onChange={e => setCurrentMember({...currentMember, name: e.target.value})} required />
          <Input label="Email Address" type="email" value={currentMember.email || ''} onChange={e => setCurrentMember({...currentMember, email: e.target.value})} required />
          <Input label="Phone Number" value={currentMember.phone || ''} onChange={e => setCurrentMember({...currentMember, phone: e.target.value})} required />
          <div className="flex justify-end gap-3 mt-6">
            <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit">Register Member</Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Confirm Deletion">
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400 rounded-lg">
            <AlertTriangle size={24} className="flex-shrink-0" />
            <p className="text-sm font-medium">Are you sure you want to delete this member? This action cannot be undone.</p>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="secondary" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
            <Button variant="danger" onClick={handleDelete}>Delete Member</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
