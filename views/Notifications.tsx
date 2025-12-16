import React, { useState } from 'react';
import { Bell, BookOpen, AlertCircle, Info, Check, Trash2 } from 'lucide-react';
import { Button } from '../components/UI';

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export const NotificationsView: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: '1', type: 'warning', title: 'Overdue Book Alert', message: 'The Great Gatsby borrowed by John Doe is now overdue by 3 days.', time: '2 hours ago', read: false },
    { id: '2', type: 'success', title: 'New Member Registered', message: 'Alice Wonderland has successfully registered as a new member.', time: '5 hours ago', read: false },
    { id: '3', type: 'info', title: 'System Maintenance', message: 'Scheduled maintenance will occur on Sunday at 2:00 AM EST.', time: '1 day ago', read: true },
    { id: '4', type: 'error', title: 'Payment Failed', message: 'Could not process fine payment for transaction #8823.', time: '2 days ago', read: true },
    { id: '5', type: 'info', title: 'Inventory Update', message: '15 new books added to the Science Fiction category.', time: '3 days ago', read: true },
  ]);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertCircle className="text-amber-500" size={24} />;
      case 'success': return <Check className="text-emerald-500" size={24} />;
      case 'error': return <AlertCircle className="text-rose-500" size={24} />;
      default: return <Info className="text-blue-500" size={24} />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'warning': return 'bg-amber-50';
      case 'success': return 'bg-emerald-50';
      case 'error': return 'bg-rose-50';
      default: return 'bg-blue-50';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Notifications</h1>
          <p className="text-slate-500">Manage your alerts and system messages.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={markAllRead}>
            <Check size={18} /> Mark all read
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {notifications.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-slate-100">
            <Bell size={48} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-lg font-medium text-slate-900">All caught up!</h3>
            <p className="text-slate-500">You have no new notifications.</p>
          </div>
        ) : (
          notifications.map(notification => (
            <div 
              key={notification.id} 
              className={`relative group p-4 rounded-xl border transition-all duration-200 ${notification.read ? 'bg-white border-slate-100' : 'bg-white border-indigo-100 shadow-sm ring-1 ring-indigo-50'}`}
            >
              <div className="flex gap-4">
                <div className={`p-3 rounded-full h-fit flex-shrink-0 ${getBgColor(notification.type)}`}>
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className={`font-semibold ${notification.read ? 'text-slate-700' : 'text-slate-900'}`}>
                      {notification.title}
                      {!notification.read && <span className="ml-2 inline-block w-2 h-2 bg-indigo-500 rounded-full"></span>}
                    </h3>
                    <span className="text-xs text-slate-400">{notification.time}</span>
                  </div>
                  <p className="text-slate-600 mt-1 text-sm leading-relaxed">{notification.message}</p>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); deleteNotification(notification.id); }}
                  className="opacity-0 group-hover:opacity-100 p-2 text-slate-300 hover:text-rose-500 transition-all absolute top-4 right-4"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
