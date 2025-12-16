import React, { useState, useRef } from 'react';
import { User, Mail, Shield, Key, History, Camera, Save } from 'lucide-react';
import { Card, Button, Input, Badge } from '../components/UI';
import { AuthService, UserService } from '../services/store';
import { User as UserType } from '../types';

interface ProfileProps {
  user: UserType;
  onUpdate?: (updatedUser: UserType) => void;
}

export const ProfileView: React.FC<ProfileProps> = ({ user, onUpdate }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email || '');
  const [bio, setBio] = useState(user.bio || '');
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (onUpdate) {
      setIsSaving(true);
      // Simulate API call
      setTimeout(() => {
        const updatedUser = {
          ...user,
          name,
          email,
          bio,
          avatarUrl,
        };
        UserService.update(updatedUser);
        onUpdate(updatedUser);
        setIsSaving(false);
      }, 800);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">My Profile</h1>
        <p className="text-slate-500 dark:text-slate-400">Manage your account settings and view activity.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="md:col-span-1 text-center">
          <div className="relative inline-block mb-4 group cursor-pointer" onClick={handleImageClick}>
            <img 
              src={avatarUrl} 
              alt={name} 
              className="w-32 h-32 rounded-full object-cover border-4 border-slate-50 dark:border-slate-800 shadow-lg transition-opacity group-hover:opacity-75"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="text-white drop-shadow-lg" size={32} />
            </div>
            <div className="absolute bottom-0 right-0 bg-green-500 w-6 h-6 rounded-full border-4 border-white dark:border-slate-900"></div>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">{name}</h2>
          <div className="flex justify-center mt-2">
            <Badge color="blue">{user.role}</Badge>
          </div>
          <div className="mt-6 space-y-3 text-left">
            <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
              <User size={16} className="text-slate-400" />
              <span>@{user.username}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
              <Mail size={16} className="text-slate-400" />
              <span className="truncate">{email || 'No email provided'}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
              <Shield size={16} className="text-slate-400" />
              <span>Full Access</span>
            </div>
          </div>
        </Card>

        {/* Details & Security */}
        <div className="md:col-span-2 space-y-6">
          <Card title="Account Details">
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
              <Input 
                label="Full Name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
              />
              <Input 
                label="Email Address" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
               <div className="space-y-1">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Bio</label>
                <textarea 
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:text-white transition-all text-sm resize-none"
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us a little about yourself..."
                />
              </div>
              
              <div className="flex justify-end pt-2">
                <Button 
                  variant="primary" 
                  className="text-sm flex items-center gap-2"
                  disabled={isSaving}
                  onClick={handleSave}
                >
                  <Save size={16} />
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </Card>

          <Card title="Security">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                    <Key size={18} className="text-slate-600 dark:text-slate-400" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">Password</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Last changed 3 months ago</p>
                  </div>
                </div>
                <Button variant="secondary" className="text-xs px-3">Change</Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                    <History size={18} className="text-slate-600 dark:text-slate-400" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">Login Session</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Currently active on this device</p>
                  </div>
                </div>
                <Button variant="danger" className="text-xs px-3 bg-white dark:bg-slate-800 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900 hover:bg-rose-50 dark:hover:bg-rose-900/20">Log out other sessions</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};