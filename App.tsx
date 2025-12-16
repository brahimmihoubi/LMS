import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './views/Dashboard';
import { BooksView } from './views/Books';
import { MembersView } from './views/Members';
import { LoansView } from './views/Loans';
import { SettingsView } from './views/Settings';
import { ProfileView } from './views/Profile';
import { ReportsView } from './views/Reports';
import { NotificationsView } from './views/Notifications';
import { HelpView } from './views/Help';
import { Login } from './views/Login';
import { BookService, MemberService, LoanService } from './services/store';
import { User, Book, Member, Loan } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentPath, setCurrentPath] = useState('/');
  
  // Data State
  const [books, setBooks] = useState<Book[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [loans, setLoans] = useState<Loan[]>([]);

  // Hash Router Logic
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || '/';
      setCurrentPath(hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Init

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Data Fetching
  const refreshData = () => {
    setBooks(BookService.getAll());
    setMembers(MemberService.getAll());
    setLoans(LoanService.getAll());
  };

  useEffect(() => {
    if (user) {
      refreshData();
    }
  }, [user]);

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  const renderContent = () => {
    switch (currentPath) {
      case '/':
        return <Dashboard books={books} loans={loans} members={members} />;
      case '/books':
        return <BooksView books={books} onUpdate={refreshData} userRole={user.role} />;
      case '/members':
        return <MembersView members={members} onUpdate={refreshData} />;
      case '/loans':
        return <LoansView loans={loans} books={books} members={members} onUpdate={refreshData} />;
      case '/reports':
        return <ReportsView />;
      case '/notifications':
        return <NotificationsView />;
      case '/settings':
        return <SettingsView />;
      case '/help':
        return <HelpView />;
      case '/profile':
        return <ProfileView user={user} onUpdate={setUser} />;
      default:
        return <Dashboard books={books} loans={loans} members={members} />;
    }
  };

  return (
    <Layout user={user} onLogout={() => setUser(null)} currentPath={currentPath}>
      {renderContent()}
    </Layout>
  );
};

export default App;
