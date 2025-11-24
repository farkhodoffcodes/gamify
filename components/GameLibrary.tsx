
import React, { useEffect, useState, useRef } from 'react';
import { Game } from '../types';
import { fetchGames } from '../services/gameService';
import { Play, Star, Search, Monitor, Globe, Filter, ChevronRight, ChevronLeft, Zap } from 'lucide-react';

interface GameLibraryProps {
  onLaunchGame: (game: Game) => void;
}

interface GameCardProps {
  game: Game;
  wide?: boolean;
  onLaunchGame: (game: Game) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, wide = false, onLaunchGame }) => {
    // Random "Concurrent Players" number for realism
    const players = Math.floor(Math.random() * (50000 - 1000) + 1000).toLocaleString();

    return (
        <div 
            className={`group relative flex-none bg-slate-900 rounded-sm overflow-hidden border border-slate-800 transition-all duration-500 cursor-pointer ${wide ? 'w-[450px]' : 'w-[300px]'} hover:z-20 hover:scale-105 hover:shadow-[0_0_40px_rgba(0,242,234,0.15)]`}
            onClick={() => onLaunchGame(game)}
        >
            {/* Glow Effect Border */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-brand-500/50 transition-colors duration-300 pointer-events-none z-20"></div>
            
            <div className="aspect-video overflow-hidden relative bg-slate-950">
                <img 
                    src={game.imageUrl} 
                    alt={game.title} 
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-110"
                />
                {/* Live Badge */}
                <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider rounded-sm flex items-center shadow-lg">
                    <div className="w-1.5 h-1.5 bg-white rounded-full mr-1.5 animate-pulse"></div>
                    LIVE
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]">
                    <div className="w-16 h-16 bg-brand-500 text-slate-950 rounded-full flex items-center justify-center transform scale-50 group-hover:scale-100 transition-transform duration-300 shadow-[0_0_30px_rgba(0,242,234,0.6)]">
                        <Play className="w-6 h-6 fill-current ml-1" />
                    </div>
                </div>
            </div>
            
            <div className="p-5 relative bg-slate-900 group-hover:bg-slate-800 transition-colors">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-display font-bold text-white text-xl truncate pr-2 group-hover:text-brand-400 transition-colors">{game.title}</h3>
                    <div className="flex items-center bg-slate-950 px-2 py-1 rounded border border-slate-800">
                        <Star className="w-3 h-3 text-yellow-500 fill-current mr-1" />
                        <span className="text-xs font-bold text-white">{game.rating}</span>
                    </div>
                </div>
                
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                    <span className="font-mono text-brand-500/80 uppercase tracking-wider">{game.genre}</span>
                    <span>{players} Playing</span>
                </div>
                
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed group-hover:text-slate-300 transition-colors">
                    {game.description}
                </p>
            </div>
        </div>
    );
};

const ScrollSection = ({ title, items, onLaunchGame }: { title: string, items: Game[], onLaunchGame: (g: Game) => void }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const scroll = (dir: 'left' | 'right') => {
        if (scrollRef.current) {
            const amount = dir === 'left' ? -600 : 600;
            scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
        }
    };

    if (items.length === 0) return null;

    return (
        <div 
            ref={sectionRef}
            className={`mb-16 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
            <div className="flex items-center justify-between px-8 md:px-16 mb-6">
                <div className="flex items-center space-x-4">
                    <div className="w-1.5 h-8 bg-gradient-to-b from-brand-400 to-accent-500 rounded-full"></div>
                    <h3 className="text-3xl font-display font-bold text-white tracking-wide uppercase">{title}</h3>
                </div>
                
                <div className="flex space-x-2">
                    <button onClick={() => scroll('left')} className="p-3 rounded-lg bg-slate-900 border border-slate-800 hover:border-brand-500 hover:text-brand-400 text-slate-400 transition-all group">
                        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                    </button>
                    <button onClick={() => scroll('right')} className="p-3 rounded-lg bg-slate-900 border border-slate-800 hover:border-brand-500 hover:text-brand-400 text-slate-400 transition-all group">
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                </div>
            </div>
            
            <div 
                ref={scrollRef}
                className="flex overflow-x-auto space-x-6 px-8 md:px-16 pb-12 scrollbar-hide snap-x"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {items.map((game) => (
                    <GameCard key={game.id} game={game} wide={title === 'Trending Now'} onLaunchGame={onLaunchGame} />
                ))}
            </div>
        </div>
    );
};

export const GameLibrary: React.FC<GameLibraryProps> = ({ onLaunchGame }) => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [featuredGame, setFeaturedGame] = useState<Game | null>(null);

  useEffect(() => {
    const loadGames = async () => {
      setLoading(true);
      const allGames = await fetchGames();
      setGames(allGames);
      // Find a really cool featured game
      const featured = allGames.find(g => g.title.includes('Ev.io')) || allGames[0];
      setFeaturedGame(featured);
      setLoading(false);
    };
    loadGames();
  }, []);

  const categories = ['All', 'Shooter', 'MMO', 'Strategy', 'Racing', 'Survival', 'Anime'];

  const filteredGames = games.filter(g => {
    const matchesSearch = g.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || g.genre.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const gamesByGenre = {
    'Trending Now': games.slice(0, 10),
    'Pro-League Shooters': games.filter(g => g.genre.includes('Shooter') || g.genre.includes('FPS')),
    'Massive Worlds': games.filter(g => g.genre.includes('MMO') || g.genre.includes('RPG')),
    'High Octane': games.filter(g => g.genre.includes('Racing')),
    'Tactical & Strategy': games.filter(g => g.genre.includes('Strategy')),
  };

  return (
    <div className="bg-slate-950 min-h-screen pb-32">
      
      {/* FILTERS & SEARCH */}
      <div className="sticky top-24 z-30 px-8 md:px-16 py-6 mb-8 bg-gradient-to-b from-slate-950 via-slate-950/95 to-transparent pointer-events-none">
        <div className="pointer-events-auto flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-900/50 backdrop-blur-xl border border-white/5 p-2 rounded-2xl shadow-2xl">
            <div className="flex items-center overflow-x-auto scrollbar-hide space-x-1 px-2">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-6 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-300 ${
                            selectedCategory === cat 
                            ? 'bg-brand-500 text-slate-950 shadow-[0_0_20px_rgba(0,242,234,0.3)]' 
                            : 'text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
            
            <div className="relative w-full md:w-96 mr-2">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input 
                    type="text" 
                    placeholder="Search library..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-950/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all placeholder-slate-600"
                />
            </div>
        </div>
      </div>

      {loading ? (
         <div className="flex items-center justify-center h-96">
            <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <span className="text-brand-500 font-mono text-sm animate-pulse">INITIALIZING LIBRARY...</span>
            </div>
         </div>
      ) : (
          <>
            {selectedCategory === 'All' && !searchQuery ? (
                <div className="space-y-8">
                    <ScrollSection title="Trending Now" items={gamesByGenre['Trending Now']} onLaunchGame={onLaunchGame} />
                    <ScrollSection title="Pro-League Shooters" items={gamesByGenre['Pro-League Shooters']} onLaunchGame={onLaunchGame} />
                    <ScrollSection title="Massive Worlds" items={gamesByGenre['Massive Worlds']} onLaunchGame={onLaunchGame} />
                    <ScrollSection title="High Octane" items={gamesByGenre['High Octane']} onLaunchGame={onLaunchGame} />
                    
                    {/* Infinite Grid Footer */}
                    <div className="mt-24 px-8 md:px-16 border-t border-slate-800/50 pt-16">
                         <div className="flex items-center mb-8">
                             <Zap className="w-6 h-6 text-brand-500 mr-3" />
                             <h3 className="text-2xl font-display font-bold text-white">Just Added</h3>
                         </div>
                         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-8 gap-6">
                             {games.slice(20, 60).map(game => (
                                 <GameCard key={`grid-${game.id}`} game={game} onLaunchGame={onLaunchGame} />
                             ))}
                         </div>
                    </div>
                </div>
            ) : (
                <div className="px-8 md:px-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-6 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
                    {filteredGames.map(game => (
                        <GameCard key={game.id} game={game} onLaunchGame={onLaunchGame} />
                    ))}
                </div>
            )}
          </>
      )}
    </div>
  );
};
