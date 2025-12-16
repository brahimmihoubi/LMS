import React, { useState } from 'react';
import { LayoutDashboard, Book, Users, Repeat, LogOut, Menu, Bell, Search, X, Settings, BarChart3, HelpCircle } from 'lucide-react';
import { User } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  user: User;
  onLogout: () => void;
  currentPath: string;
}

const SidebarItem = ({ icon: Icon, label, path, active, to }: { icon: any, label: string, path: string, active: boolean, to: string }) => (
  <a href={to} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none' : 'text-slate-500 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400'}`}>
    <Icon size={20} className={`transition-transform duration-200 ${active ? '' : 'group-hover:scale-110'}`} />
    <span className="font-medium">{label}</span>
  </a>
);

export const Layout: React.FC<LayoutProps> = ({ children, user, onLogout, currentPath }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex transition-colors duration-300">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/20 z-40 lg:hidden backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transform transition-transform duration-300 lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col`}>
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-200">
              L
            </div>
            <span className="text-xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">LibraSync</span>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-slate-400">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
          <SidebarItem icon={LayoutDashboard} label="Dashboard" path="/" active={currentPath === '/'} to="#/" />
          <SidebarItem icon={Book} label="Books Inventory" path="/books" active={currentPath === '/books'} to="#/books" />
          <SidebarItem icon={Users} label="Members" path="/members" active={currentPath === '/members'} to="#/members" />
          <SidebarItem icon={Repeat} label="Loans & Returns" path="/loans" active={currentPath === '/loans'} to="#/loans" />
          <SidebarItem icon={BarChart3} label="Reports" path="/reports" active={currentPath === '/reports'} to="#/reports" />
          
          <div className="my-4 border-t border-slate-100"></div>
          
          <SidebarItem icon={Settings} label="Settings" path="/settings" active={currentPath === '/settings'} to="#/settings" />
          <SidebarItem icon={HelpCircle} label="Help & Support" path="/help" active={currentPath === '/help'} to="#/help" />
        </nav>

        <div className="p-4 border-t border-slate-100">
          <a href="#/profile" className={`bg-slate-50 rounded-xl p-4 flex items-center gap-3 mb-3 hover:bg-indigo-50 transition-colors group ${currentPath === '/profile' ? 'ring-2 ring-indigo-500 ring-offset-2' : ''}`}>
            <img src={user.avatarUrl} alt={user.name} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate group-hover:text-indigo-700">{user.name}</p>
              <p className="text-xs text-slate-500 truncate capitalize">{user.role.toLowerCase()}</p>
            </div>
          </a>
          <button onClick={onLogout} className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors font-medium">
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 lg:px-10 transition-colors duration-300">
          <div className="flex items-center gap-4">
            <button onClick={toggleSidebar} className="lg:hidden text-slate-500 hover:text-slate-700">
              <Menu size={24} />
            </button>
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-full text-sm focus:ring-2 focus:ring-indigo-100 dark:text-slate-200 w-64 transition-all"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="#/notifications" className={`relative p-2 transition-colors ${currentPath === '/notifications' ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg' : 'text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400'}`}>
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900"></span>
            </a>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 p-6 lg:p-10 transition-colors duration-300">
          <div className="max-w-7xl mx-auto animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
