
import React from 'react';
import { Cloud, MonitorPlay, Gamepad2, CreditCard } from 'lucide-react';
import { AppView } from '../types';

interface NavbarProps {
  currentView: AppView;
  setView: (view: AppView) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, setView }) => {
  const navItemClass = (view: AppView) => 
    `flex items-center space-x-2 px-6 py-2 rounded-full transition-all duration-300 cursor-pointer ${
      currentView === view 
        ? 'bg-brand-500 text-slate-950 shadow-[0_0_20px_rgba(0,242,234,0.4)] font-bold scale-105' 
        : 'text-slate-400 hover:text-white hover:bg-white/10'
    }`;

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav className="pointer-events-auto bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl px-2 py-2 max-w-4xl w-full flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center space-x-3 pl-4 cursor-pointer group" onClick={() => setView(AppView.HOME)}>
            <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-accent-500 rounded-full flex items-center justify-center shadow-lg shadow-brand-500/20 group-hover:rotate-180 transition-transform duration-700">
              <Cloud className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-display font-bold tracking-widest text-white hidden sm:block">
              NEBULA
            </span>
          </div>
          
          {/* Menu */}
          <div className="hidden md:flex items-center space-x-1 bg-black/20 rounded-full p-1 border border-white/5">
            <button className={navItemClass(AppView.HOME)} onClick={() => setView(AppView.HOME)}>
              <span className="text-sm">Home</span>
            </button>
            <button className={navItemClass(AppView.LIBRARY)} onClick={() => setView(AppView.LIBRARY)}>
              <span className="text-sm">Games</span>
            </button>
            <button className={navItemClass(AppView.PRICING)} onClick={() => setView(AppView.PRICING)}>
              <span className="text-sm">Premium</span>
            </button>
          </div>

          {/* Status */}
          <div className="flex items-center space-x-4 pr-4">
            <div className="hidden sm:flex items-center space-x-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
              <span>ONLINE</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-slate-800 to-slate-700 border border-slate-600 flex items-center justify-center shadow-inner">
               <div className="w-full h-full rounded-full overflow-hidden p-0.5">
                   <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" className="bg-slate-800 rounded-full" />
               </div>
            </div>
          </div>

      </nav>
    </div>
  );
};
