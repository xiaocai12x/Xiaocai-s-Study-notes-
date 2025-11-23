import React, { useState } from 'react';
import { Home, BookOpen, Layers, PenTool, Sun, Moon, Music, Globe, Coffee, Volume2, VolumeX } from 'lucide-react';
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
    { id: AppSection.HOME, icon: Home, label: language === Language.CN ? '主页' : 'HOME' },
    { id: AppSection.NOTES, icon: BookOpen, label: language === Language.CN ? '笔记' : 'NOTES' },
    { id: AppSection.PORTFOLIO, icon: Layers, label: language === Language.CN ? '作品集' : 'WORKS' },
    { id: AppSection.GUESTBOOK, icon: PenTool, label: language === Language.CN ? '留言板' : 'GUEST' },
  ];

  const controls = [
    { 
      id: 'theme', 
      icon: darkMode ? Sun : Moon, 
      action: toggleTheme, 
      label: darkMode ? (language === Language.CN ? '日间模式' : 'LIGHT MODE') : (language === Language.CN ? '夜间模式' : 'DARK MODE') 
    },
    { 
      id: 'bgm', 
      icon: bgmPlaying ? Volume2 : VolumeX, 
      action: toggleBgm, 
      label: bgmPlaying ? (language === Language.CN ? '静音' : 'MUTE') : (language === Language.CN ? '播放音乐' : 'PLAY BGM') 
    },
    { 
      id: 'lang', 
      icon: Globe, 
      action: toggleLanguage, 
      label: language === Language.CN ? 'ENGLISH' : '中文' 
    },
    { 
      id: 'sponsor', 
      icon: Coffee, 
      action: () => alert("Thank you for your support! (Placeholder)"), 
      label: language === Language.CN ? '赞助作者' : 'SPONSOR' 
    },
  ];

  return (
    <nav className="fixed left-0 top-0 h-full w-20 bg-soviet-dark text-soviet-cream border-r-4 border-soviet-red z-50 flex flex-col justify-between py-8">
      {/* Top: Navigation */}
      <div className="flex flex-col space-y-8 items-center">
        <div className="w-12 h-12 bg-soviet-red rotate-45 mb-8 flex items-center justify-center border-2 border-soviet-cream">
           <span className="text-xl font-bold -rotate-45 text-soviet-cream">XC</span>
        </div>

        {menuItems.map((item) => (
          <div key={item.id} className="relative group w-full flex justify-center">
            <button
              onClick={() => onNavigate(item.id)}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              className={`p-3 transition-all duration-300 relative z-10 ${
                currentSection === item.id 
                  ? 'bg-soviet-red text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <item.icon size={24} strokeWidth={2.5} />
            </button>
            
            {/* Active/Hover Indicator Shape */}
            {(currentSection === item.id || hoveredItem === item.id) && (
              <motion.div
                layoutId="navHighlight"
                className="absolute inset-0 bg-soviet-red/20 skew-x-12 scale-125"
                initial={false}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}

            {/* Tooltip */}
            <AnimatePresence>
              {hoveredItem === item.id && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 60 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="absolute left-0 top-2 bg-soviet-red text-white px-3 py-1 text-sm font-bold uppercase tracking-widest whitespace-nowrap border-2 border-soviet-dark shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] pointer-events-none z-20"
                >
                  {item.label}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Bottom: Controls */}
      <div className="flex flex-col space-y-6 items-center">
        <div className="w-10 h-[2px] bg-soviet-grey"></div>
        {controls.map((control) => (
          <div key={control.id} className="relative flex justify-center w-full">
            <button
              onClick={control.action}
              onMouseEnter={() => setHoveredItem(control.id)}
              onMouseLeave={() => setHoveredItem(null)}
              className="p-2 hover:bg-soviet-grey/50 transition-colors rounded-none border border-transparent hover:border-soviet-cream"
            >
              <control.icon size={20} />
            </button>
             {/* Control Tooltip */}
             <AnimatePresence>
              {hoveredItem === control.id && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 60 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="absolute left-0 top-1 bg-soviet-cream text-soviet-dark px-2 py-1 text-xs font-bold uppercase border border-soviet-dark shadow-[2px_2px_0px_0px_rgba(217,37,37,1)] whitespace-nowrap z-20"
                >
                  {control.label}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Sidebar;