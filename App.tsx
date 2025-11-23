import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import CustomCursor from './components/CustomCursor';
import Home from './pages/Home';
import { AppSection, Language } from './types';

function App() {
  const [currentSection, setCurrentSection] = useState<AppSection>(AppSection.HOME);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState<Language>(Language.CN);
  const [bgmPlaying, setBgmPlaying] = useState(false);
  
  // Audio Ref
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize Theme
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Audio Control
  useEffect(() => {
    if (!audioRef.current) {
      // Vaporwave / Synthwave style track
      audioRef.current = new Audio('https://cdn.pixabay.com/audio/2023/05/22/audio_559729550a.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
    }

    if (bgmPlaying) {
      audioRef.current.play().catch(e => console.log("Audio play failed (interaction required):", e));
    } else {
      audioRef.current.pause();
    }
  }, [bgmPlaying]);

  const renderContent = () => {
    switch (currentSection) {
      case AppSection.HOME:
        return <Home language={language} />;
      default:
        return (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center p-12 border-4 border-dashed border-soviet-red/20 bg-soviet-cream/5">
              <h1 className="text-6xl font-bold mb-4 text-soviet-red uppercase tracking-widest">
                {currentSection}
              </h1>
              <p className="text-2xl font-serif italic border-2 border-current p-4 inline-block transform -rotate-2">
                 {language === Language.CN ? '施工中...' : 'UNDER CONSTRUCTION'}
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ease-in-out`}>
      <CustomCursor />
      
      <Sidebar 
        currentSection={currentSection}
        onNavigate={setCurrentSection}
        darkMode={darkMode}
        toggleTheme={() => setDarkMode(!darkMode)}
        language={language}
        toggleLanguage={() => setLanguage(language === Language.CN ? Language.EN : Language.CN)}
        bgmPlaying={bgmPlaying}
        toggleBgm={() => setBgmPlaying(!bgmPlaying)}
      />

      {/* Main content container with left padding to match Sidebar width (w-64 = 16rem) */}
      <main className="relative z-0 pl-64 transition-[padding] duration-300">
         {renderContent()}
      </main>
      
      {/* Texture Overlay for that 'Paper' feel */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[9998] mix-blend-multiply" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>
    </div>
  );
}

export default App;