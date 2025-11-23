export enum AppSection {
  HOME = 'HOME',
  NOTES = 'NOTES',
  PORTFOLIO = 'PORTFOLIO',
  GUESTBOOK = 'GUESTBOOK'
}

export enum Language {
  CN = 'CN',
  EN = 'EN'
}

export interface ShowcaseItem {
  id: string;
  title: string;
  category: 'SHADER' | 'UNITY' | 'TECH';
  description: string;
  imageUrl: string;
  date: string;
}

export const MOCK_SHOWCASE: ShowcaseItem[] = [
  {
    id: '1',
    title: 'Volumetric Cloud Rendering',
    category: 'SHADER',
    description: 'Raymarching based volumetric clouds with dynamic lighting integration.',
    imageUrl: 'https://picsum.photos/600/400?random=1',
    date: '2023.10'
  },
  {
    id: '2',
    title: 'Cyberpunk City Asset Pack',
    category: 'UNITY',
    description: 'High performance modular assets using DOTS for crowd simulation.',
    imageUrl: 'https://picsum.photos/600/400?random=2',
    date: '2023.11'
  },
  {
    id: '3',
    title: 'URP Render Feature Breakdown',
    category: 'TECH',
    description: 'Deep dive into extending the Universal Render Pipeline for custom passes.',
    imageUrl: 'https://picsum.photos/600/400?random=3',
    date: '2023.12'
  },
  {
    id: '4',
    title: 'Water Surface Simulation',
    category: 'SHADER',
    description: 'FFT based water simulation running on compute shaders.',
    imageUrl: 'https://picsum.photos/600/400?random=4',
    date: '2024.01'
  }
];