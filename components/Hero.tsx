
import React from 'react';
import { AppView } from '../types';
import { Gamepad2, Sparkles, PlayCircle, MousePointer2 } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-slate-950 flex items-center justify-center">
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent z-10"></div>
        
        {/* High Quality Cyberpunk Cityscape */}
        <img 
            src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=2400&q=90" 
            alt="Background" 
            className="w-full h-full object-cover opacity-60 scale-105 animate-[pulse-slow_10s_infinite_alternate]"
        />
      </div>

      {/* Overlay Gradients */}
      <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-slate-950/20 to-slate-950"></div>

      {/* Content */}
      <div className="relative z-20 text-center max-w-5xl px-6 mt-20">
        
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 animate-in fade-in slide-in-from-top-4 duration-1000">
            <Sparkles className="w-4 h-4 text-brand-400 mr-2" />
            <span className="text-brand-100 text-sm tracking-widest uppercase font-bold">Web 3.0 Cloud Gaming</span>
        </div>

        {/* Main Title with Glitch/Gradient Effect */}
        <h1 className="text-7xl md:text-9xl font-display font-black text-white mb-6 leading-none tracking-tighter drop-shadow-2xl animate-in zoom-in-50 duration-700">
          <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-slate-400">BEYOND</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-accent-400 to-brand-500 pb-4">REALITY</span>
        </h1>

        <p className="text-xl md:text-2xl text-slate-300 mb-12 font-light max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
          Stream high-fidelity 3D games directly to your browser. 
          <br/> <span className="text-white font-medium">No installs. No latency. Pure skill.</span>
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
          <button 
            onClick={onStart}
            className="group relative px-12 py-6 bg-brand-500 text-slate-950 font-bold text-lg uppercase tracking-wider rounded-none skew-x-[-10deg] hover:bg-white transition-all duration-300 shadow-[0_0_40px_rgba(0,242,234,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)]"
          >
            <div className="skew-x-[10deg] flex items-center space-x-3">
                <PlayCircle className="w-6 h-6" />
                <span>Start Playing</span>
            </div>
          </button>
          
          <button 
            onClick={onStart}
            className="group relative px-12 py-6 bg-transparent border border-slate-600 text-white font-bold text-lg uppercase tracking-wider rounded-none skew-x-[-10deg] hover:border-brand-400 hover:text-brand-400 transition-all duration-300 backdrop-blur-sm"
          >
            <div className="skew-x-[10deg] flex items-center space-x-3">
                <MousePointer2 className="w-6 h-6" />
                <span>Browse Library</span>
            </div>
          </button>
        </div>

        {/* Footer Stats */}
        <div className="mt-24 grid grid-cols-3 gap-8 border-t border-white/10 pt-8 max-w-2xl mx-auto animate-in fade-in duration-1000 delay-700">
            <div className="text-center">
                <div className="text-3xl font-display font-bold text-white">1M+</div>
                <div className="text-xs text-slate-500 uppercase tracking-widest mt-1">Daily Players</div>
            </div>
            <div className="text-center border-l border-r border-white/10">
                <div className="text-3xl font-display font-bold text-brand-400">120</div>
                <div className="text-xs text-slate-500 uppercase tracking-widest mt-1">FPS Guaranteed</div>
            </div>
            <div className="text-center">
                <div className="text-3xl font-display font-bold text-white">0ms</div>
                <div className="text-xs text-slate-500 uppercase tracking-widest mt-1">Input Lag</div>
            </div>
        </div>

      </div>
    </div>
  );
};
