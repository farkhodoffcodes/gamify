
import { Game } from '../types';
import { GAMES } from '../constants';

// Fetching strictly BROWSER games to ensure they are playable (no Steam links)
const API_URL = 'https://www.freetogame.com/api/games?platform=browser';

const mapGames = (data: any[]): Game[] => {
    return data.map((item: any) => ({
      id: `api-${item.id}`,
      title: item.title,
      genre: item.genre,
      rating: '4.5', // Default placeholder rating
      imageUrl: item.thumbnail,
      description: item.short_description,
      gameUrl: item.game_url,
      platform: 'Web Browser', // Forced as we are filtering for browser
      publisher: item.publisher,
      releaseDate: item.release_date,
      specs: {
        gpu: 'Virtual Cloud GPU',
        cpu: 'vCPU 4-Core',
        ram: '16GB'
      }
    }));
};

export const fetchGames = async (): Promise<Game[]> => {
  let fetchedGames: Game[] = [];

  // 1. Try AllOrigins Proxy
  try {
    const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(API_URL)}`);
    if (response.ok) {
      const result = await response.json();
      if (result.contents) {
        const data = JSON.parse(result.contents);
        fetchedGames = mapGames(data);
      }
    }
  } catch (error) {
    console.warn('Primary proxy fetch failed');
  }

  // 2. Try CorsProxy if first failed or empty
  if (fetchedGames.length === 0) {
      try {
        const response = await fetch(`https://corsproxy.io/?${encodeURIComponent(API_URL)}`);
        if (response.ok) {
            const data = await response.json();
            fetchedGames = mapGames(data);
        }
      } catch (error) {
        console.warn('Secondary proxy fetch failed');
      }
  }

  // Combine verified constant games with fetched games
  // We prioritize our manually verified GAMES at the top
  const allGames = [...GAMES, ...fetchedGames];
  
  // De-duplicate based on title
  const seen = new Set();
  const uniqueGames = allGames.filter(game => {
    const normalizedTitle = game.title.toLowerCase().trim();
    if (seen.has(normalizedTitle)) return false;
    seen.add(normalizedTitle);
    return true;
  });
  
  return uniqueGames;
};
