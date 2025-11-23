import React, { useState } from 'react';
import { Home, BookOpen, Layers, PenTool, Sun, Moon, Music, Globe, Coffee, Volume2, VolumeX, ChevronRight } from 'lucide-react';
import { AppSection, Language } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  currentSection: AppSection;
  onNavigate: (section: AppSection) => void;
  darkMode: boolean;
  toggleTheme: () => void;
  language: Language;
  toggleLanguage: () => void;
  bgmPlaying: boolean;
  toggleBgm: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  currentSection,
  onNavigate,
  darkMode,
  toggleTheme,
  language,
  toggleLanguage,
  bgmPlaying,
  toggleBgm
}) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const menuItems = [
    { id: AppSection.HOME, icon: Home, label: language === Language.CN ? '主页' : 'HOME', sub: '01' },
    { id: AppSection.NOTES, icon: BookOpen, label: language === Language.CN ? '学习笔记' : 'NOTES', sub: '02' },
    { id: AppSection.PORTFOLIO, icon: Layers, label: language === Language.CN ? '作品集' : 'WORKS', sub: '03' },
    { id: AppSection.GUESTBOOK, icon: PenTool, label: language === Language.CN ? '留言板' : 'GUESTBOOK', sub: '04' },
  ];

  return (
    <nav className="fixed left-0 top-0 h-full w-64 bg-soviet-dark text-soviet-cream border-r-8 border-soviet-red z-50 flex flex-col justify-between overflow-hidden shadow-[10px_0_20px_rgba(0,0,0,0.5)]">
      {/* Top: Branding */}
      <div className="p-6 pb-0">
        <div className="w-full bg-soviet-red p-4 mb-8 border-2 border-soviet-cream relative overflow-hidden group">
           <div className="relative z-10 flex flex-col items-start">
               <span className="text-4xl font-bold text-soviet-cream tracking-tighter">XC</span>
               <span className="text-xs font-bold text-soviet-dark mt-1 bg-soviet-cream px-1">UNITY DEV</span>
           </div>
           {/* Decorative Lines */}
           <div className="absolute -right-4 -top-4 w-16 h-32 bg-soviet-dark/20 rotate-12"></div>
        </div>
      </div>

      {/* Middle: Navigation - Rectangular Buttons */}
      <div className="flex-1 flex flex-col space-y-1 px-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
            className={`group relative w-full h-16 flex items-center justify-between px-4 py-3 transition-all duration-300 border-2 ${
              currentSection === item.id 
                ? 'bg-soviet-cream text-soviet-dark border-soviet-cream' 
                : 'bg-transparent text-gray-400 border-gray-700 hover:border-soviet-cream hover:text-soviet-cream'
            }`}
          >
            {/* Sliding Background on Hover */}
            <div className={`absolute inset-0 bg-soviet-red transform origin-left transition-transform duration-300 ${
                currentSection === item.id ? 'scale-x-0' : (hoveredItem === item.id ? 'scale-x-100' : 'scale-x-0')
            }`} />

            <div className="relative z-10 flex items-center gap-3">
                <item.icon size={20} strokeWidth={2.5} />
                <span className="font-bold tracking-widest text-lg uppercase">{item.label}</span>
            </div>
            
            <div className="relative z-10 text-xs font-mono opacity-50 flex items-center gap-2">
                {currentSection === item.id && <ChevronRight size={14} className="animate-pulse"/>}
                {item.sub}
            </div>
          </button>
        ))}
      </div>

      {/* Bottom: Controls - Grid Layout */}
      <div className="p-4 bg-soviet-grey/10">
        <div className="flex items-center gap-2 mb-4 px-2">
             <div className="h-[2px] bg-soviet-red flex-1"></div>
             <span className="text-xs font-mono text-soviet-grey uppercase">Settings</span>
             <div className="h-[2px] bg-soviet-red flex-1"></div>
        </div>

        <div className="grid grid-cols-2 gap-2">
            {/* Theme Toggle */}
            <button 
                onClick={toggleTheme}
                className="flex flex-col items-center justify-center p-3 border border-soviet-grey/50 hover:bg-soviet-cream hover:text-soviet-dark transition-colors group"
                title={darkMode ? "Light Mode" : "Dark Mode"}
            >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                <span className="text-[10px] mt-1 font-bold uppercase">{darkMode ? 'Light' : 'Dark'}</span>
            </button>

            {/* Language Toggle */}
            <button 
                onClick={toggleLanguage}
                className="flex flex-col items-center justify-center p-3 border border-soviet-grey/50 hover:bg-soviet-cream hover:text-soviet-dark transition-colors"
                title="Switch Language"
            >
                <Globe size={18} />
                <span className="text-[10px] mt-1 font-bold uppercase">{language}</span>
            </button>

            {/* BGM Toggle */}
            <button 
                onClick={toggleBgm}
                className={`flex flex-col items-center justify-center p-3 border border-soviet-grey/50 hover:bg-soviet-cream hover:text-soviet-dark transition-colors ${bgmPlaying ? 'text-soviet-red' : ''}`}
                title="Toggle BGM"
            >
                {bgmPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
                <span className="text-[10px] mt-1 font-bold uppercase">{bgmPlaying ? 'On' : 'Off'}</span>
            </button>

            {/* Sponsor */}
            <button 
                onClick={() => alert("Thank you for your support!")}
                className="flex flex-col items-center justify-center p-3 border border-soviet-grey/50 hover:bg-soviet-red hover:text-soviet-cream transition-colors"
                title="Sponsor"
            >
                <Coffee size={18} />
                <span className="text-[10px] mt-1 font-bold uppercase">Gift</span>
            </button>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;