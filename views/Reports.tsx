import React, { useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from 'recharts';
import { Download, Calendar, DollarSign, TrendingUp, BookOpen } from 'lucide-react';
import { Button, Card } from '../components/UI';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const MONTHLY_DATA = [
  { name: 'Jan', loans: 65, returns: 40 },
  { name: 'Feb', loans: 59, returns: 45 },
  { name: 'Mar', loans: 80, returns: 60 },
  { name: 'Apr', loans: 81, returns: 70 },
  { name: 'May', loans: 56, returns: 50 },
  { name: 'Jun', loans: 95, returns: 85 },
];

const CATEGORY_DATA = [
  { name: 'Fiction', value: 400 },
  { name: 'Technology', value: 300 },
  { name: 'History', value: 300 },
  { name: 'Science', value: 200 },
  { name: 'Arts', value: 150 },
];

export const ReportsView: React.FC = () => {
  const reportRef = useRef<HTMLDivElement>(null);

  const handleExportPDF = async () => {
    if (reportRef.current) {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2, // Improve quality
        backgroundColor: document.documentElement.classList.contains('dark') ? '#0f172a' : '#f8fafc', // Handle theme bg
        ignoreElements: (element) => element.classList.contains('no-print')
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('librasync-report.pdf');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in" ref={reportRef}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Analytics & Reports</h1>
          <p className="text-slate-500 dark:text-slate-400">Deep dive into library performance and statistics.</p>
        </div>
        <div className="flex gap-2 no-print">
          <Button variant="secondary">
            <Calendar size={18} /> Last 6 Months
          </Button>
          <Button onClick={handleExportPDF}>
            <Download size={18} /> Export PDF
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white shadow-lg shadow-indigo-200 dark:shadow-none">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <DollarSign size={24} />
            </div>
            <span className="font-medium opacity-90">Fines Collected</span>
          </div>
          <h3 className="text-3xl font-bold">$1,245.50</h3>
          <p className="text-indigo-100 text-sm mt-2">+12% from last month</p>
        </div>
        
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-lg">
              <TrendingUp size={24} />
            </div>
            <span className="font-medium text-slate-600 dark:text-slate-400">Growth Rate</span>
          </div>
          <h3 className="text-3xl font-bold text-slate-800 dark:text-white">24%</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">New member registrations</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg">
              <BookOpen size={24} />
            </div>
            <span className="font-medium text-slate-600 dark:text-slate-400">Inventory Value</span>
          </div>
          <h3 className="text-3xl font-bold text-slate-800 dark:text-white">$12,850</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">Total asset estimation</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Loans vs Returns Trends">
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MONTHLY_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" strokeOpacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                <Tooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: '#1e293b', color: '#fff'}} 
                />
                <Legend iconType="circle" />
                <Line type="monotone" dataKey="loans" stroke="#4f46e5" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                <Line type="monotone" dataKey="returns" stroke="#10b981" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Books by Category">
          <div className="h-80 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={CATEGORY_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {CATEGORY_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: '#1e293b', color: '#fff'}} />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Top Borrowers Table */}
      <Card title="Top Borrowers (This Month)">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-medium">
              <tr>
                <th className="px-6 py-3">Member</th>
                <th className="px-6 py-3">Books Borrowed</th>
                <th className="px-6 py-3">On-Time Returns</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">John Doe</td>
                <td className="px-6 py-4 dark:text-slate-300">12</td>
                <td className="px-6 py-4 text-emerald-600 dark:text-emerald-400 font-medium">100%</td>
                <td className="px-6 py-4"><span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-semibold">Gold Reader</span></td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">Sarah Connor</td>
                <td className="px-6 py-4 dark:text-slate-300">9</td>
                <td className="px-6 py-4 text-emerald-600 dark:text-emerald-400 font-medium">88%</td>
                <td className="px-6 py-4"><span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-semibold">Silver Reader</span></td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">Michael Scott</td>
                <td className="px-6 py-4 dark:text-slate-300">5</td>
                <td className="px-6 py-4 text-amber-600 dark:text-amber-400 font-medium">40%</td>
                <td className="px-6 py-4"><span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full text-xs font-semibold">Standard</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
