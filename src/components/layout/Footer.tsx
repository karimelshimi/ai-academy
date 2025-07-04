import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-900/50 mt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <Link to="/" className="text-2xl font-black mb-4 block">
              أكاديمية<span className="text-indigo-400"> حسام</span>
            </Link>
            <p className="text-slate-400 mb-6 max-w-md">
              منصة تعليمية متخصصة في الذكاء الاصطناعي، نقدم أحدث الكورسات والأدوات لتعلم وإتقان تقنيات الذكاء الاصطناعي.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <a
                href="https://www.facebook.com/ahmed4hossam"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-blue-500 transition-colors text-xl"
              >
                <i className="fab fa-facebook"></i>
              </a>
              <a
                href="https://wa.me/+010000000"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-green-500 transition-colors text-xl"
              >
                <i className="fab fa-whatsapp"></i>
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-red-500 transition-colors text-xl"
              >
                <i className="fab fa-youtube"></i>
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors text-xl"
              >
                <i className="fab fa-tiktok"></i>
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-pink-500 transition-colors text-xl"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-slate-400 hover:text-indigo-400 transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-slate-400 hover:text-indigo-400 transition-colors">
                  الكورسات
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-slate-400 hover:text-indigo-400 transition-colors">
                  الباقات
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-slate-400 hover:text-indigo-400 transition-colors">
                  لوحة التحكم
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">تواصل معنا</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 space-x-reverse text-slate-400">
                <i className="fas fa-phone-alt"></i>
                <span>+010000000</span>
              </li>
              <li className="flex items-center space-x-2 space-x-reverse text-slate-400">
                <i className="fas fa-envelope"></i>
                <span>info@ai-academy.com</span>
              </li>
              <li className="flex items-center space-x-2 space-x-reverse text-slate-400">
                <i className="fab fa-telegram"></i>
                <a
                  href="https://t.me/+WrGesCy1dh83MGU0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-indigo-400 transition-colors"
                >
                  انضم لمجتمعنا
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-slate-800 my-8" />

        <div className="text-center text-slate-500">
          <p>&copy; 2025 أكاديمية حسام للذكاء الاصطناعي. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;