import React, { useState } from 'react';
import { Save, Bell, Moon, Sun, Globe, Shield } from 'lucide-react';
import { Button, Card, Input } from '../components/UI';

export const SettingsView: React.FC = () => {
  const [libraryName, setLibraryName] = useState('LibraSync Central Library');
  const [fineAmount, setFineAmount] = useState('0.50');
  const [notifications, setNotifications] = useState(true);
  
  // Theme & Language State
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return document.documentElement.classList.contains('dark');
  });
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'en');

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    if (lang === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
    }
    // Force reload to apply potential text direction/font changes globally if needed
    // window.location.reload(); 
    // Just direction and state for now as requested
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Settings saved successfully!');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Settings</h1>
        <p className="text-slate-500">Configure your library system preferences.</p>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card title="General Preferences">
            <div className="space-y-4">
              <Input 
                label="Library Name" 
                value={libraryName} 
                onChange={e => setLibraryName(e.target.value)} 
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input 
                  label="Default Daily Fine ($)" 
                  type="number" 
                  step="0.01"
                  value={fineAmount} 
                  onChange={e => setFineAmount(e.target.value)} 
                />
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">Currency</label>
                  <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white">
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                    <option>GBP (£)</option>
                  </select>
                </div>
              </div>
            </div>
          </Card>

          <Card title="Notifications & Alerts">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                    <Bell size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">Email Notifications</p>
                    <p className="text-sm text-slate-500">Receive digests for overdue books.</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={notifications} onChange={e => setNotifications(e.target.checked)} className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
                    <Shield size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">Security Alerts</p>
                    <p className="text-sm text-slate-500">Notify on suspicious login attempts.</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="Appearance">
            <div className="space-y-4">
              {/* Dark Mode Toggle */}
              <button 
                type="button" 
                onClick={toggleDarkMode}
                className="w-full flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {isDarkMode ? <Sun size={20} className="text-amber-500" /> : <Moon size={20} className="text-slate-400" />}
                  <span className="text-slate-700 dark:text-slate-200">Dark Mode</span>
                </div>
                <div className={`w-11 h-6 rounded-full relative transition-colors ${isDarkMode ? 'bg-indigo-600' : 'bg-slate-200'}`}>
                   <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${isDarkMode ? 'left-[calc(100%-1.375rem)]' : 'left-0.5'}`}></div>
                </div>
              </button>

              {/* Language Selector */}
              <div className="w-full flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800 transition-colors">
                <div className="flex items-center gap-3">
                  <Globe size={20} className="text-slate-400" />
                  <span className="text-slate-700 dark:text-slate-200">Language</span>
                </div>
                <select 
                  value={language}
                  onChange={(e) => changeLanguage(e.target.value)}
                  className="bg-transparent text-sm font-medium text-slate-600 focus:outline-none cursor-pointer"
                >
                  <option value="en">English (EN)</option>
                  <option value="fr">French (FR)</option>
                  <option value="ar">Arabic (AR)</option>
                </select>
              </div>
            </div>
          </Card>
          
          <Button type="submit" className="w-full py-3">
            <Save size={20} /> Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};