
import React, { useState, useEffect, useRef } from 'react';
import { Game, StreamStats } from '../types';
import { CloudStreamClient } from '../services/webrtcService';
import { 
  X, MessageSquare, 
  Mic, Activity, RotateCcw, ExternalLink,
  Keyboard, Gamepad2, MousePointer2, Maximize, Wifi, Battery, Cpu
} from 'lucide-react';
import { GeminiAssistant } from './GeminiAssistant';

interface VirtualPCProps {
  game: Game;
  onExit: () => void;
}

export const VirtualPC: React.FC<VirtualPCProps> = ({ game, onExit }) => {
  const [status, setStatus] = useState<'booting' | 'connecting' | 'connected' | 'error'>('booting');
  const [stats, setStats] = useState<StreamStats | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showControls, setShowControls] = useState(false);
  
  const streamClient = useRef<CloudStreamClient | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    streamClient.current = new CloudStreamClient();
    
    const bootSequence = async () => {
      try {
        setStatus('booting');
        await new Promise(r => setTimeout(r, 2000)); 
        setStatus('connecting');
        await streamClient.current?.connect(game.id);
        setStatus('connected');
      } catch (err) {
        setStatus('error');
      }
    };

    bootSequence();
    const statsInterval = setInterval(() => {
      if (streamClient.current && status === 'connected') {
        setStats(streamClient.current.getStats());
      }
    }, 1000);

    return () => {
      clearInterval(statsInterval);
      streamClient.current?.disconnect();
    };
  }, [game.id]);

  const handleFocusGame = () => {
    setIsActive(true);
    setTimeout(() => {
        if (iframeRef.current) iframeRef.current.focus();
    }, 100);
  };

  const handleFullscreen = () => {
    if (containerRef.current?.requestFullscreen) {
      containerRef.current.requestFullscreen();
    }
  };

  if (status === 'booting' || status === 'connecting') {
    return (
      <div className="fixed inset-0 bg-slate-950 z-[100] flex flex-col items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614726365723-49cfae988ecc?auto=format&fit=crop&w=2000&q=80')] bg-cover opacity-10 blur-xl"></div>
        
        <div className="relative z-10 w-full max-w-2xl p-12 bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-white/5 shadow-2xl">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 mb-8 relative">
                 <div className="absolute inset-0 rounded-full border-4 border-slate-800"></div>
                 <div className="absolute inset-0 rounded-full border-4 border-brand-500 border-t-transparent animate-spin"></div>
                 <Gamepad2 className="absolute inset-0 m-auto w-10 h-10 text-brand-500 animate-pulse" />
            </div>
            
            <h2 className="text-4xl font-display font-bold mb-2 text-white tracking-wider">SYSTEM INITIALIZING</h2>
            <div className="font-mono text-brand-400 mb-8 animate-pulse">
              {status === 'booting' ? '>> ALLOCATING GPU RESOURCES...' : '>> ESTABLISHING SECURE UPLINK...'}
            </div>

            <div className="w-full grid grid-cols-3 gap-4">
                 <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800 text-center">
                    <Cpu className="w-6 h-6 text-slate-500 mx-auto mb-2" />
                    <div className="text-xs text-slate-500 uppercase">CPU Status</div>
                    <div className="text-green-400 font-bold">READY</div>
                 </div>
                 <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800 text-center">
                    <Wifi className="w-6 h-6 text-slate-500 mx-auto mb-2" />
                    <div className="text-xs text-slate-500 uppercase">Network</div>
                    <div className="text-green-400 font-bold">OPTIMAL</div>
                 </div>
                 <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800 text-center">
                    <Battery className="w-6 h-6 text-slate-500 mx-auto mb-2" />
                    <div className="text-xs text-slate-500 uppercase">Power</div>
                    <div className="text-green-400 font-bold">100%</div>
                 </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black z-[90] overflow-hidden flex flex-col font-sans select-none">
      
      {/* TOP HUD BAR */}
      <div className="h-16 bg-slate-950/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-8 shrink-0 z-50 relative">
         <div className="flex items-center space-x-6">
             <button onClick={onExit} className="text-slate-400 hover:text-white transition-colors">
                 <div className="flex items-center space-x-2">
                     <div className="w-8 h-8 bg-red-500/20 rounded flex items-center justify-center border border-red-500/30 group hover:bg-red-500 hover:border-red-500 transition-all">
                         <X className="w-5 h-5 text-red-400 group-hover:text-white" />
                     </div>
                     <span className="font-bold text-sm hidden sm:block">EXIT SESSION</span>
                 </div>
             </button>
             
             <div className="h-8 w-px bg-slate-800"></div>

             <div className="flex flex-col">
                 <h1 className="font-display font-bold text-white text-lg leading-none tracking-wide uppercase">{game.title}</h1>
                 <div className="flex items-center space-x-2 mt-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-xs text-green-400 font-mono">LIVE • 12ms • 60FPS</span>
                 </div>
             </div>
         </div>

         <div className="flex items-center space-x-3">
              <button onClick={() => iframeRef.current && (iframeRef.current.src = iframeRef.current.src)} className="p-3 bg-slate-900 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800">
                 <RotateCcw className="w-5 h-5" />
              </button>
              <button onClick={() => setShowControls(!showControls)} className={`p-3 rounded-lg border transition-all ${showControls ? 'bg-brand-500 text-black border-brand-500' : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-brand-500/50'}`}>
                 <Keyboard className="w-5 h-5" />
              </button>
              <button onClick={handleFullscreen} className="p-3 bg-slate-900 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800">
                 <Maximize className="w-5 h-5" />
              </button>
              <button onClick={() => setShowChat(!showChat)} className={`flex items-center space-x-2 px-5 py-3 rounded-lg border transition-all ${showChat ? 'bg-brand-500 text-black border-brand-500' : 'bg-slate-900 text-brand-400 border-brand-500/30 hover:bg-brand-500/10'}`}>
                 <MessageSquare className="w-5 h-5" />
                 <span className="font-bold">AI ASSIST</span>
              </button>
         </div>
      </div>

      {/* MAIN GAME VIEWPORT */}
      <div 
        ref={containerRef}
        className="relative flex-1 bg-black flex items-center justify-center overflow-hidden"
      >
        {/* IFRAME */}
        <div className={`w-full h-full transition-all duration-700 ${isActive ? 'opacity-100 scale-100' : 'opacity-40 scale-95 blur-sm'}`}>
             <iframe
                ref={iframeRef}
                src={game.gameUrl}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen; pointer-lock; gamepad; microphone; midi; keyboard-map"
                sandbox="allow-same-origin allow-scripts allow-forms allow-pointer-lock allow-popups allow-modals allow-orientation-lock allow-presentation"
                title={game.title}
            />
        </div>

        {/* PAUSE/FOCUS OVERLAY */}
        {!isActive && (
          <div className="absolute inset-0 z-30 flex items-center justify-center">
             <div className="bg-slate-900/80 backdrop-blur-xl p-1 border-y border-brand-500/50 w-full">
                <div className="max-w-4xl mx-auto flex items-center justify-between px-8 py-12">
                    <div className="flex items-center space-x-8">
                        <div className="w-20 h-20 bg-brand-500/10 rounded-full flex items-center justify-center border border-brand-500/20 animate-[pulse_3s_infinite]">
                            <MousePointer2 className="w-8 h-8 text-brand-400" />
                        </div>
                        <div>
                            <h2 className="text-4xl font-display font-bold text-white mb-2">INPUT DISENGAGED</h2>
                            <p className="text-slate-400 text-lg">Click anywhere to resume control of the neural link.</p>
                        </div>
                    </div>
                    <button 
                        onClick={handleFocusGame}
                        className="px-12 py-6 bg-white text-black font-bold text-xl tracking-wider uppercase hover:bg-brand-400 transition-colors skew-x-[-10deg]"
                    >
                        <div className="skew-x-[10deg]">RESUME</div>
                    </button>
                </div>
             </div>
          </div>
        )}

        {/* CHAT SIDEBAR */}
        {showChat && (
          <div className="absolute right-4 top-4 bottom-4 w-96 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-40 overflow-hidden animate-in slide-in-from-right-8">
             <GeminiAssistant context={`Playing ${game.title}`} />
          </div>
        )}

        {/* CONTROLS POPUP */}
        {showControls && (
             <div className="absolute left-8 top-8 z-40 bg-slate-900/90 backdrop-blur border border-slate-700 p-6 rounded-xl text-slate-300 shadow-2xl max-w-sm animate-in fade-in zoom-in-95">
                <div className="flex justify-between items-center mb-6">
                    <h4 className="font-bold text-white text-lg flex items-center gap-2"><Keyboard className="w-5 h-5 text-brand-400"/> KEY BINDINGS</h4>
                    <button onClick={() => setShowControls(false)}><X className="w-5 h-5" /></button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-950 p-3 rounded border border-slate-800 text-center">
                        <div className="font-mono text-brand-400 text-xl mb-1">WASD</div>
                        <div className="text-xs text-slate-500 uppercase">Movement</div>
                    </div>
                    <div className="bg-slate-950 p-3 rounded border border-slate-800 text-center">
                        <div className="font-mono text-brand-400 text-xl mb-1">SPACE</div>
                        <div className="text-xs text-slate-500 uppercase">Jump / Fly</div>
                    </div>
                    <div className="bg-slate-950 p-3 rounded border border-slate-800 text-center">
                        <div className="font-mono text-brand-400 text-xl mb-1">L-CLICK</div>
                        <div className="text-xs text-slate-500 uppercase">Primary Fire</div>
                    </div>
                    <div className="bg-slate-950 p-3 rounded border border-slate-800 text-center">
                        <div className="font-mono text-brand-400 text-xl mb-1">R-CLICK</div>
                        <div className="text-xs text-slate-500 uppercase">Aim / Scope</div>
                    </div>
                </div>
             </div>
        )}
      </div>
    </div>
  );
};
