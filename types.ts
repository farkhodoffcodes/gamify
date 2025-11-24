
export interface Game {
  id: string;
  title: string;
  genre: string;
  rating?: string;
  imageUrl: string;
  description: string;
  gameUrl?: string;
  platform?: string;
  publisher?: string;
  releaseDate?: string;
  specs?: {
    gpu: string;
    cpu: string;
    ram: string;
  };
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export interface VMSpec {
  id: string;
  name: string;
  gpu: string;
  cpu: string;
  ram: string;
  price: string;
  features: string[];
  color: string;
}

export interface StreamStats {
  fps: number;
  bitrate: number; // Mbps
  latency: number; // ms
  packetLoss: number; // %
  resolution: string;
  codec: string;
}

export enum AppView {
  HOME = 'HOME',
  LIBRARY = 'LIBRARY',
  STREAM = 'STREAM',
  PRICING = 'PRICING'
}
