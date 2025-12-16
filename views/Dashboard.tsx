import React, { useMemo } from 'react';
import { BookOpen, Users, Clock, AlertTriangle, TrendingUp } from 'lucide-react';
import { Card, Badge } from '../components/UI';
import { Book, Loan, Member } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  books: Book[];
  loans: Loan[];
  members: Member[];
}

const StatCard = ({ title, value, icon: Icon, color, trend }: any) => {
  const colorStyles = {
    indigo: "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400",
    emerald: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400",
    rose: "bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400",
    amber: "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400"
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 hover:-translate-y-1 transition-transform duration-300">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{value}</h3>
        </div>
        <div className={`p-3 rounded-xl ${colorStyles[color as keyof typeof colorStyles]}`}>
          <Icon size={24} />
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center text-sm">
          <TrendingUp size={14} className="text-emerald-500 mr-1" />
          <span className="text-emerald-600 dark:text-emerald-400 font-medium">{trend}</span>
          <span className="text-slate-400 dark:text-slate-500 ml-1">vs last month</span>
        </div>
      )}
    </div>
  );
};

export const Dashboard: React.FC<DashboardProps> = ({ books, loans, members }) => {
  const stats = useMemo(() => {
    const totalBooks = books.reduce((acc, b) => acc + b.quantity, 0);
    const activeLoans = loans.filter(l => l.status === 'ACTIVE' || l.status === 'OVERDUE').length;
    const overdueLoans = loans.filter(l => l.status === 'OVERDUE').length;
    const totalMembers = members.length;
    return { totalBooks, activeLoans, overdueLoans, totalMembers };
  }, [books, loans, members]);

  // Mock data for chart
  const chartData = [
    { name: 'Jan', loans: 40 },
    { name: 'Feb', loans: 30 },
    { name: 'Mar', loans: 20 },
    { name: 'Apr', loans: 27 },
    { name: 'May', loans: 18 },
    { name: 'Jun', loans: 23 },
    { name: 'Jul', loans: 34 },
  ];

  const recentActivity = loans.slice(-5).reverse();

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Dashboard</h1>
        <p className="text-slate-500 dark:text-slate-400">Welcome back, here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Books" value={stats.totalBooks} icon={BookOpen} color="indigo" trend="+12%" />
        <StatCard title="Active Members" value={stats.totalMembers} icon={Users} color="emerald" trend="+5%" />
        <StatCard title="Active Loans" value={stats.activeLoans} icon={Clock} color="amber" />
        <StatCard title="Overdue Books" value={stats.overdueLoans} icon={AlertTriangle} color="rose" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 h-96" title="Loan Statistics">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" strokeOpacity={0.2} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
              <Tooltip 
                cursor={{fill: 'rgba(241, 245, 249, 0.1)'}} 
                contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: '#1e293b', color: '#fff'}} 
              />
              <Bar dataKey="loans" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Recent Activity" className="h-96 overflow-y-auto">
          <div className="space-y-4">
            {recentActivity.map(loan => {
              const book = books.find(b => b.id === loan.bookId);
              const member = members.find(m => m.id === loan.memberId);
              return (
                <div key={loan.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <div className={`w-2 h-2 rounded-full ${loan.status === 'OVERDUE' ? 'bg-rose-500' : 'bg-emerald-500'}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">{book?.title}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{loan.status === 'RETURNED' ? 'Returned by' : 'Borrowed by'} {member?.name}</p>
                  </div>
                  <span className="text-xs text-slate-400 whitespace-nowrap">{loan.loanDate}</span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
};
