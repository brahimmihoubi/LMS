import React, { useState } from 'react';
import { User, Lock, ArrowRight } from 'lucide-react';
import { Button, Input } from '../components/UI';
import { AuthService } from '../services/store';
import { User as UserType } from '../types';

interface LoginProps {
  onLogin: (user: UserType) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // Mock auth ignores password for now, just checks username "admin" or "lib"
      const user = await AuthService.login(username);
      onLogin(user);
    } catch (err) {
      setError('Invalid credentials. Try "admin" or "lib".');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden animate-slide-up">
        <div className="bg-indigo-600 p-8 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl mx-auto flex items-center justify-center backdrop-blur-sm mb-4">
            <span className="text-3xl font-bold text-white">L</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
          <p className="text-indigo-200 mt-2">Sign in to LibraSync LMS</p>
        </div>
        
        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="p-3 bg-rose-50 text-rose-600 text-sm rounded-lg text-center font-medium animate-pulse">
                {error}
              </div>
            )}
            
            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-9 text-slate-400" size={20} />
                <Input 
                  label="Username" 
                  value={username} 
                  onChange={e => setUsername(e.target.value)} 
                  className="pl-10"
                  placeholder="e.g., admin"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-9 text-slate-400" size={20} />
                <Input 
                  label="Password" 
                  type="password" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  className="pl-10"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <Button className="w-full py-3 text-lg" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'} <ArrowRight size={20} />
            </Button>

            <div className="text-center text-xs text-slate-400 mt-4">
              Demo Users: <b>admin</b> or <b>lib</b> (Password: anything)
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
