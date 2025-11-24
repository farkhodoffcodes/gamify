
import { Game, VMSpec } from './types';

// Verified High-Fidelity Web Games (No downloads, direct play)
export const GAMES: Game[] = [
  {
    id: 'featured-1',
    title: 'Ev.io (Cyber Halo)',
    genre: 'FPS',
    rating: '9.8',
    imageUrl: 'https://images.unsplash.com/photo-1624138784181-29c91506553c?auto=format&fit=crop&w=1200&q=80', 
    description: 'High-fidelity tactical futuristic shooter. Experience Halo-style combat in your browser with zero downloads. Features extensive movement mechanics.',
    gameUrl: 'https://ev.io',
    specs: { gpu: 'RTX 4090', cpu: 'vCPU 12-Core', ram: '32GB' }
  },
  {
    id: 'featured-2',
    title: 'Smash Karts',
    genre: 'Racing',
    rating: '9.7',
    imageUrl: 'https://images.unsplash.com/photo-1599457382197-820d65b8cc52?auto=format&fit=crop&w=1200&q=80', 
    description: 'Chaotic multiplayer kart racing battle. Pick up weapons, blow up other players, and race to victory in 3D arenas.',
    gameUrl: 'https://smashkarts.io',
    specs: { gpu: 'RTX 3080', cpu: 'vCPU 8-Core', ram: '32GB' }
  },
  {
    id: 'featured-3',
    title: 'Venge.io',
    genre: 'FPS',
    rating: '9.5',
    imageUrl: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=1200&q=80',
    description: 'Objective-based first person shooter. Capture points and unlock abilities cards in this fast-paced shooter.',
    gameUrl: 'https://venge.io',
    specs: { gpu: 'RTX 3070', cpu: 'vCPU 6-Core', ram: '16GB' }
  },
  {
    id: 'featured-4',
    title: 'Shell Shockers',
    genre: 'FPS',
    rating: '9.6',
    imageUrl: 'https://images.unsplash.com/photo-1563045429-42032ae8ba0c?auto=format&fit=crop&w=1200&q=80', 
    description: 'The world\'s most popular egg-based shooter. Crack your enemies in various multiplayer modes.',
    gameUrl: 'https://shellshock.io', 
    specs: { gpu: 'RTX 3060', cpu: 'vCPU 6-Core', ram: '16GB' }
  },
  {
    id: 'featured-5',
    title: 'Krunker.io',
    genre: 'FPS',
    rating: '9.9',
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    description: 'Fast-paced pixelated first person shooter with advanced movement mechanics like slide hopping.',
    gameUrl: 'https://krunker.io',
    specs: { gpu: 'RTX 3080', cpu: 'vCPU 8-Core', ram: '32GB' }
  },
  {
    id: 'featured-6',
    title: 'Tribals.io',
    genre: 'Survival',
    rating: '9.3',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    description: 'Survival game inspired by Rust. Gather resources, build bases, and raid other players.',
    gameUrl: 'https://tribals.io',
    specs: { gpu: 'RTX 4080', cpu: 'vCPU 8-Core', ram: '32GB' }
  },
  {
    id: 'featured-7',
    title: 'Mini Royale: Nations',
    genre: 'Battle Royale',
    rating: '9.4',
    imageUrl: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=1200&q=80',
    description: 'Community driven skill-based shooter with different game modes like Battle Royale and Capture the Flag.',
    gameUrl: 'https://miniroyale.io',
    specs: { gpu: 'GTX 1660', cpu: 'vCPU 4-Core', ram: '8GB' }
  },
  {
    id: 'featured-8',
    title: 'Build Royale',
    genre: 'Battle Royale',
    rating: '9.2',
    imageUrl: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&w=1200&q=80',
    description: '2D top-down battle royale shooter where you can build defenses while fighting.',
    gameUrl: 'https://buildroyale.io',
    specs: { gpu: 'RTX 3060', cpu: 'vCPU 6-Core', ram: '16GB' }
  },
  {
    id: 'featured-9',
    title: 'War Brokers',
    genre: 'FPS',
    rating: '9.0',
    imageUrl: 'https://www.freetogame.com/g/441/thumbnail.jpg',
    description: 'First person shooter with vehicles and missions. Fly helicopters and drive tanks in the browser.',
    gameUrl: 'https://warbrokers.io',
    specs: { gpu: 'GTX 1080', cpu: 'vCPU 4-Core', ram: '12GB' }
  },
  {
    id: 'featured-10',
    title: 'Deadshot.io',
    genre: 'FPS',
    rating: '9.2',
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    description: 'Competitive browser FPS with very smooth movement and gunplay.',
    gameUrl: 'https://deadshot.io',
    specs: { gpu: 'RTX 2060', cpu: 'vCPU 4-Core', ram: '8GB' }
  },
  {
    id: 'featured-11',
    title: 'Slope',
    genre: 'Arcade',
    rating: '8.5',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    description: 'The ultimate speed run game. Navigate a ball down a randomized slope.',
    gameUrl: 'https://kbhgames.com/game/slope',
    specs: { gpu: 'Integrated', cpu: 'Dual Core', ram: '4GB' }
  },
  {
    id: 'featured-12',
    title: '1v1.LOL',
    genre: 'Action',
    rating: '9.1',
    imageUrl: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&w=1200&q=80',
    description: 'Building simulator and shooter. Practice your battle royale builds.',
    gameUrl: 'https://1v1.lol',
    specs: { gpu: 'GTX 1660', cpu: 'vCPU 4-Core', ram: '8GB' }
  },
  {
    id: 'featured-13',
    title: 'Zombs Royale',
    genre: 'Battle Royale',
    rating: '8.8',
    imageUrl: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=1200&q=80',
    description: '2D Battle Royale. 100 players drop in, one comes out.',
    gameUrl: 'https://zombsroyale.io',
    specs: { gpu: 'GTX 1050', cpu: 'vCPU 2-Core', ram: '8GB' }
  },
  {
    id: 'featured-14',
    title: 'Agar.io',
    genre: 'Casual',
    rating: '8.0',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    description: 'The classic blob eating game. Consume others to grow larger.',
    gameUrl: 'https://agar.io',
    specs: { gpu: 'Basic', cpu: 'Low Power', ram: '2GB' }
  },
  {
    id: 'featured-15',
    title: 'Betrayal.io',
    genre: 'Social',
    rating: '8.7',
    imageUrl: 'https://images.unsplash.com/photo-1585620385456-4759f9b5c7d9?auto=format&fit=crop&w=1200&q=80',
    description: 'Social deduction game. Find the betrayer before they eliminate the crew.',
    gameUrl: 'https://betrayal.io',
    specs: { gpu: 'Basic', cpu: 'Low Power', ram: '4GB' }
  }
];

export const VM_TIERS: VMSpec[] = [
  {
    id: 'free',
    name: 'Basic Rig',
    gpu: 'GTX 1060',
    cpu: '4 vCPU',
    ram: '8GB',
    price: 'Free',
    features: ['720p Stream', 'Ad Supported', 'Standard Queue', 'Session Limit: 1hr'],
    color: 'bg-slate-700'
  },
  {
    id: 'pro',
    name: 'Pro Gamer',
    gpu: 'RTX 3080',
    cpu: '8 vCPU',
    ram: '16GB',
    price: '$9.99/mo',
    features: ['1080p 60FPS', 'Priority Access', 'No Ads', 'Ray Tracing On'],
    color: 'bg-brand-600'
  },
  {
    id: 'ultra',
    name: 'Ultra Cloud',
    gpu: 'RTX 4090',
    cpu: '16 vCPU',
    ram: '64GB',
    price: '$19.99/mo',
    features: ['4K 120FPS', 'Exclusive Servers', 'Instant Access', 'Persistent Storage'],
    color: 'bg-accent-500'
  }
];
