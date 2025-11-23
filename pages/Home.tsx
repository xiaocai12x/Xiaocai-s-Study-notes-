import React from 'react';
import { motion } from 'framer-motion';
import { MOCK_SHOWCASE, Language } from '../types';
import { ArrowUpRight, Cpu, Layers, Triangle } from 'lucide-react';

interface HomeProps {
  language: Language;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

const Home: React.FC<HomeProps> = ({ language }) => {
  return (
    <div className="pl-24 pr-8 py-12 min-h-screen">
      
      {/* HERO SECTION */}
      <motion.header 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className="relative mb-24 border-b-8 border-soviet-dark dark:border-soviet-red pb-12"
      >
        <div className="absolute top-0 right-0 opacity-10 dark:opacity-20 pointer-events-none">
             <Cpu size={300} strokeWidth={0.5} />
        </div>

        <h1 className="text-8xl font-bold tracking-tighter uppercase leading-[0.8] relative z-10">
          <span className="block text-soviet-red">Constructing</span>
          <span className="block pl-20 dark:text-soviet-cream">Reality</span>
        </h1>
        
        <div className="mt-8 flex items-start gap-8">
            <div className="w-16 h-16 bg-soviet-dark dark:bg-soviet-cream flex items-center justify-center">
                <Triangle className="text-soviet-cream dark:text-soviet-dark fill-current rotate-90" size={32} />
            </div>
            <div>
                <h2 className="text-4xl font-bold mb-2">
                    {language === Language.CN ? '小菜的学习笔记' : "XIAO CAI'S NOTES"}
                </h2>
                <p className="max-w-xl text-lg font-serif italic border-l-4 border-soviet-red pl-4">
                    {language === Language.CN 
                        ? '探索图形编程的边界，重构视觉艺术的秩序。' 
                        : 'Exploring the boundaries of graphics programming, reconstructing the order of visual art.'}
                </p>
            </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-6 right-12 w-32 h-32 bg-soviet-red rotate-12 z-0 mix-blend-multiply dark:mix-blend-difference"></div>
      </motion.header>

      {/* CORE CONTENT GRID */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10"
      >
        <div className="flex items-center gap-4 mb-12">
            <div className="h-4 w-4 bg-soviet-red"></div>
            <h3 className="text-2xl font-bold tracking-[0.2em] uppercase">
                {language === Language.CN ? '精选作品' : 'FEATURED WORKS'}
            </h3>
            <div className="flex-1 h-[2px] bg-current opacity-30"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {/* Static Promo Card */}
          <motion.div 
            variants={itemVariants}
            className="row-span-2 bg-soviet-red text-soviet-cream p-8 flex flex-col justify-between min-h-[400px] border-4 border-soviet-dark dark:border-soviet-cream shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] dark:shadow-[8px_8px_0px_0px_rgba(242,240,228,1)]"
          >
             <div>
                <Layers size={64} className="mb-6" />
                <h4 className="text-4xl font-bold uppercase leading-none mb-4">
                    {language === Language.CN ? '技术栈' : 'TECH STACK'}
                </h4>
                <ul className="space-y-2 text-xl font-bold">
                    <li>UNITY 6</li>
                    <li>HLSL / CG</li>
                    <li>COMPUTE SHADERS</li>
                    <li>DOTS</li>
                </ul>
             </div>
             <div className="text-sm font-mono mt-8 opacity-80">
                SYSTEM STATUS: ONLINE<br/>
                RENDER_PIPELINE: URP/HDRP
             </div>
          </motion.div>

          {/* Dynamic Content Cards */}
          {MOCK_SHOWCASE.map((item) => (
            <motion.div 
              key={item.id}
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="group relative bg-soviet-cream dark:bg-[#252525] border-2 border-soviet-dark dark:border-gray-600 overflow-hidden"
            >
                {/* Image Area */}
                <div className="aspect-video w-full overflow-hidden relative border-b-2 border-soviet-dark dark:border-gray-600">
                    <img 
                        src={item.imageUrl} 
                        alt={item.title} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-110" 
                    />
                    <div className="absolute top-0 right-0 bg-soviet-dark text-white px-3 py-1 text-xs font-bold font-mono">
                        {item.date}
                    </div>
                </div>

                {/* Content Area */}
                <div className="p-6 relative">
                    <div className="absolute -top-6 left-4 bg-soviet-red text-white px-2 py-1 text-xs font-bold uppercase tracking-wider">
                        {item.category}
                    </div>
                    <h4 className="text-xl font-bold mb-2 uppercase group-hover:text-soviet-red transition-colors">
                        {item.title}
                    </h4>
                    <p className="text-sm opacity-70 mb-4 line-clamp-2">
                        {item.description}
                    </p>
                    
                    <button className="flex items-center gap-2 text-sm font-bold uppercase hover:gap-4 transition-all text-soviet-red">
                        {language === Language.CN ? '阅读更多' : 'READ MORE'} <ArrowUpRight size={16} />
                    </button>
                </div>

                {/* Decorative Stripes */}
                <div className="absolute bottom-0 right-0 w-8 h-8 bg-soviet-dark clip-diagonal opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* FOOTER */}
      <footer className="mt-24 border-t-4 border-soviet-dark dark:border-soviet-red pt-8 flex justify-between items-end opacity-50">
        <div className="font-mono text-sm">
            COORD: 34.0522° N, 118.2437° W<br/>
            EST: 2024
        </div>
        <div className="text-9xl font-bold text-soviet-dark/5 dark:text-soviet-cream/5 select-none pointer-events-none absolute bottom-0 right-0 -z-10">
            UNITY
        </div>
      </footer>
    </div>
  );
};

export default Home;