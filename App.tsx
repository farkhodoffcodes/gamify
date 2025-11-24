import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { GameLibrary } from './components/GameLibrary';
import { VirtualPC } from './components/VirtualPC';
import { Pricing } from './components/Pricing';
import { AppView, Game } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.HOME);
  const [activeGame, setActiveGame] = useState<Game | null>(null);

  const handleLaunchGame = (game: Game) => {
    setActiveGame(game);
    setView(AppView.STREAM);
  };

  const handleExitGame = () => {
    setActiveGame(null);
    setView(AppView.LIBRARY);
  };

  const renderContent = () => {
    if (activeGame && view === AppView.STREAM) {
      return <VirtualPC game={activeGame} onExit={handleExitGame} />;
    }

    switch (view) {
      case AppView.HOME:
        return (
          <>
            <Hero onStart={() => setView(AppView.LIBRARY)} />
            <div className="bg-slate-900">
              <GameLibrary onLaunchGame={handleLaunchGame} />
            </div>
            <div className="bg-slate-900">
                <Pricing />
            </div>
          </>
        );
      case AppView.LIBRARY:
        return (
            <div className="min-h-screen bg-slate-900 pt-6">
                 <GameLibrary onLaunchGame={handleLaunchGame} />
            </div>
        );
      case AppView.PRICING:
        return (
            <div className="min-h-screen bg-slate-900 pt-6">
                <Pricing />
            </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-brand-500/30">
      {/* Only show Navbar if we are NOT in a game stream */}
      {view !== AppView.STREAM && (
        <Navbar currentView={view} setView={setView} />
      )}
      
      <main>
        {renderContent()}
      </main>

      {view !== AppView.STREAM && (
        <footer className="bg-slate-900 border-t border-slate-800 py-12">
          <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
            <p>&copy; 2024 Nebula Cloud Gaming. Powered by Gemini AI.</p>
            <div className="flex justify-center space-x-4 mt-4">
              <a href="#" className="hover:text-white">Terms</a>
              <a href="#" className="hover:text-white">Privacy</a>
              <a href="#" className="hover:text-white">Status</a>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;