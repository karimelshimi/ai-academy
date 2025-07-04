import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Menu, X, User, LogOut, BookOpen, Settings } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    setShowUserMenu(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 w-full z-50 glass-effect border-b border-slate-700/50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-black">
            أكاديمية<span className="text-indigo-400"> حسام</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 space-x-reverse">
            <Link
              to="/"
              className={`hover:text-indigo-400 transition-colors duration-300 ${
                isActive('/') ? 'text-indigo-400' : ''
              }`}
            >
              الرئيسية
            </Link>
            <Link
              to="/courses"
              className={`hover:text-indigo-400 transition-colors duration-300 ${
                isActive('/courses') ? 'text-indigo-400' : ''
              }`}
            >
              الكورسات
            </Link>
            <Link
              to="/pricing"
              className={`hover:text-indigo-400 transition-colors duration-300 ${
                isActive('/pricing') ? 'text-indigo-400' : ''
              }`}
            >
              الباقات
            </Link>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 space-x-reverse hover:text-indigo-400 transition-colors duration-300"
                >
                  <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                    {profile?.avatar_url ? (
                      <img
                        src={profile.avatar_url}
                        alt={profile.full_name || 'User'}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <User size={16} />
                    )}
                  </div>
                  <span>{profile?.full_name || 'المستخدم'}</span>
                </button>

                {showUserMenu && (
                  <div className="absolute left-0 mt-2 w-48 glass-effect rounded-lg shadow-lg py-2 border border-slate-700/50">
                    <Link
                      to="/dashboard"
                      className="flex items-center space-x-2 space-x-reverse px-4 py-2 hover:bg-slate-700/50 transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <BookOpen size={16} />
                      <span>لوحة التحكم</span>
                    </Link>
                    <Link
                      to="/profile"
                      className="flex items-center space-x-2 space-x-reverse px-4 py-2 hover:bg-slate-700/50 transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <Settings size={16} />
                      <span>الملف الشخصي</span>
                    </Link>
                    {profile?.role === 'admin' && (
                      <Link
                        to="/admin"
                        className="flex items-center space-x-2 space-x-reverse px-4 py-2 hover:bg-slate-700/50 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <Settings size={16} />
                        <span>إدارة النظام</span>
                      </Link>
                    )}
                    <hr className="my-2 border-slate-700" />
                    <button
                      onClick={handleSignOut}
                      className="flex items-center space-x-2 space-x-reverse px-4 py-2 hover:bg-slate-700/50 transition-colors w-full text-right text-red-400"
                    >
                      <LogOut size={16} />
                      <span>تسجيل الخروج</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4 space-x-reverse">
                <Link
                  to="/login"
                  className="hover:text-indigo-400 transition-colors duration-300"
                >
                  تسجيل الدخول
                </Link>
                <Link
                  to="/register"
                  className="btn-primary"
                >
                  إنشاء حساب
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-2xl"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 space-y-4 glass-effect border-t border-slate-700/50 pt-4">
            <Link
              to="/"
              className="block py-2 hover:text-indigo-400 transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              الرئيسية
            </Link>
            <Link
              to="/courses"
              className="block py-2 hover:text-indigo-400 transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              الكورسات
            </Link>
            <Link
              to="/pricing"
              className="block py-2 hover:text-indigo-400 transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              الباقات
            </Link>

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="block py-2 hover:text-indigo-400 transition-colors duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  لوحة التحكم
                </Link>
                <Link
                  to="/profile"
                  className="block py-2 hover:text-indigo-400 transition-colors duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  الملف الشخصي
                </Link>
                {profile?.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="block py-2 hover:text-indigo-400 transition-colors duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    إدارة النظام
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsOpen(false);
                  }}
                  className="block py-2 text-red-400 hover:text-red-300 transition-colors duration-300 w-full text-right"
                >
                  تسجيل الخروج
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block py-2 hover:text-indigo-400 transition-colors duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  تسجيل الدخول
                </Link>
                <Link
                  to="/register"
                  className="block py-2 btn-primary text-center"
                  onClick={() => setIsOpen(false)}
                >
                  إنشاء حساب
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;