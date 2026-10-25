import React, { useState } from 'react';
import { UserAccount } from '../types';
import { login, signUp, getAllUsers } from '../db';
import { X, User, Mail, Lock, LogIn, UserPlus, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: UserAccount) => void;
  initialMode?: 'login' | 'signup';
}

const AVATAR_OPTIONS = ['🦉', '🦊', '🦁', '🚀', '💡', '⚡️', '🧠', '📚', '🎯', '💎', '🌿', '☕️'];

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  initialMode = 'login'
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatarEmoji, setAvatarEmoji] = useState('🦉');
  const [migrateGuestData, setMigrateGuestData] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [existingAccounts, setExistingAccounts] = useState<UserAccount[]>([]);

  React.useEffect(() => {
    setMode(initialMode);
    setErrorMessage('');
    if (isOpen) {
      getAllUsers().then(users => setExistingAccounts(users));
    }
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      if (mode === 'login') {
        const res = await login(email, password);
        if (res.success && res.user) {
          onSuccess(res.user);
          onClose();
        } else {
          setErrorMessage(res.error || 'Failed to log in. Please check credentials.');
        }
      } else {
        const res = await signUp(name, email, password, avatarEmoji, migrateGuestData);
        if (res.success && res.user) {
          onSuccess(res.user);
          onClose();
        } else {
          setErrorMessage(res.error || 'Failed to create account.');
        }
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{avatarEmoji}</span>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-slate-100">
                {mode === 'login' ? 'Welcome Back' : 'Create Free Account'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {mode === 'login' 
                  ? 'Access your personal reading progress & saved boards.' 
                  : 'Sync your learning habit and stashed mental models.'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher: Login vs Sign Up */}
        <div className="grid grid-cols-2 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 text-xs font-semibold">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setErrorMessage('');
            }}
            className={`flex items-center justify-center space-x-1.5 py-2 rounded-lg transition ${
              mode === 'login'
                ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setMode('signup');
              setErrorMessage('');
            }}
            className={`flex items-center justify-center space-x-1.5 py-2 rounded-lg transition ${
              mode === 'signup'
                ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>Sign Up</span>
          </button>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="flex items-center space-x-2 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-xs text-rose-700 dark:text-rose-300">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <>
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Maya Patel"
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Avatar Emoji Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Choose Avatar Icon
                </label>
                <div className="flex flex-wrap gap-2">
                  {AVATAR_OPTIONS.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setAvatarEmoji(emoji)}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg transition ${
                        avatarEmoji === emoji
                          ? 'bg-blue-100 dark:bg-blue-900/60 ring-2 ring-blue-500 shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Quick Select for Accounts Detected on This Device */}
          {mode === 'login' && existingAccounts.length > 0 && (
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Accounts on this device:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {existingAccounts.map(acc => (
                  <button
                    key={acc.id}
                    type="button"
                    onClick={() => setEmail(acc.email)}
                    className={`inline-flex items-center space-x-1.5 px-2 py-1 rounded-lg text-xs transition border cursor-pointer ${
                      email === acc.email
                        ? 'bg-blue-50 dark:bg-blue-950/50 border-blue-400 text-blue-700 dark:text-blue-300 font-semibold'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-300'
                    }`}
                  >
                    <span>{acc.avatarEmoji || '🦉'}</span>
                    <span className="font-medium">{acc.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">({acc.email})</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Migrate Guest Data Checkbox */}
          {mode === 'signup' && (
            <label className="flex items-start space-x-2 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={migrateGuestData}
                onChange={(e) => setMigrateGuestData(e.target.checked)}
                className="mt-0.5 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
              />
              <span className="text-xs text-slate-600 dark:text-slate-300">
                Keep and link my current guest reading progress, streaks, and saved idea boards to this account.
              </span>
            </label>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs sm:text-sm shadow-md transition disabled:opacity-50 cursor-pointer"
          >
            {isLoading 
              ? 'Processing...' 
              : mode === 'login' 
                ? 'Sign In' 
                : 'Create Account & Save Progress'}
          </button>
        </form>

        {/* Footer Toggle */}
        <div className="pt-2 text-center text-xs text-slate-500">
          {mode === 'login' ? (
            <p>
              Don't have an account yet?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('signup');
                  setErrorMessage('');
                }}
                className="font-bold text-blue-600 hover:underline cursor-pointer"
              >
                Sign up free
              </button>
            </p>
          ) : (
            <p>
              Already registered?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setErrorMessage('');
                }}
                className="font-bold text-blue-600 hover:underline cursor-pointer"
              >
                Sign in
              </button>
            </p>
          )}
        </div>

      </div>
    </div>
  );
};

