import React from 'react';
import { motion } from 'framer-motion';
import { MOCK_SHOWCASE, Language, ShowcaseItem } from '../types';
import { ArrowUpRight, Cpu, Layers, Triangle, Hexagon, Code, Zap } from 'lucide-react';

interface HomeProps {
  language: Language;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 }
  }
};

const Home: React.FC<HomeProps> = ({ language }) => {
  
  // Filter content
  const shaderWorks = MOCK_SHOWCASE.filter(item => item.category === 'SHADER');
  const unityWorks = MOCK_SHOWCASE.filter(item => item.category === 'UNITY');
  const techWorks = MOCK_SHOWCASE.filter(item => item.category === 'TECH');

  // Helper component for Section Header
  const SectionHeader = ({ title, cnTitle, icon: Icon }: { title: string, cnTitle: string, icon: any }) => (
    <div className="flex items-end gap-4 mb-8 border-b-4 border-soviet-dark dark:border-soviet-red pb-2 mt-16">
        <div className="bg-soviet-red text-soviet-cream p-2">
            <Icon size={24} />
        </div>
        <h3 className="text-4xl font-bold tracking-tighter uppercase leading-none">
            {language === Language.CN ? cnTitle : title}
        </h3>
        <div className="flex-1"></div>
        <div className="text-sm font-mono opacity-50 hidden sm:block">
            SECTION // {title.split(' ')[0]}
        </div>
    </div>
  );

  // Helper component for Card
  const WorkCard = ({ item }: { item: ShowcaseItem }) => (
    <motion.div 
      variants={itemVariants}
      whileHover={{ y: -5 }}
      className="group relative bg-soviet-cream dark:bg-[#252525] border-2 border-soviet-dark dark:border-gray-600 h-full flex flex-col"
    >
        <div className="aspect-[4/3] w-full overflow-hidden relative border-b-2 border-soviet-dark dark:border-gray-600 bg-soviet-grey/20">
            <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-110" 
            />
            <div className="absolute top-2 left-2 flex gap-1">
                <div className="w-2 h-2 bg-soviet-red rounded-full"></div>
                <div className="w-2 h-2 bg-soviet-dark rounded-full"></div>
            </div>
        </div>
        <div className="p-5 flex-1 flex flex-col">
            <div className="text-xs font-mono text-soviet-red mb-1">{item.date}</div>
            <h4 className="text-xl font-bold uppercase leading-tight mb-3 group-hover:text-soviet-red transition-colors">
                {item.title}
            </h4>
            <p className="text-sm opacity-70 mb-4 flex-1">
                {item.description}
            </p>
            <button className="self-start flex items-center gap-2 text-xs font-bold uppercase bg-soviet-dark text-white dark:bg-soviet-cream dark:text-soviet-dark px-3 py-2 hover:bg-soviet-red hover:text-white transition-colors">
                {language === Language.CN ? '查看详情' : 'VIEW DETAILS'} <ArrowUpRight size={14} />
            </button>
        </div>
    </motion.div>
  );

  return (
    <div className="pl-12 pr-12 py-12 min-h-screen">
      
      {/* HERO SECTION */}
      <motion.header 
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative mb-20 pt-8"
      >
        <div className="absolute top-0 right-0 opacity-10 dark:opacity-5 pointer-events-none">
             <Cpu size={400} strokeWidth={0.5} />
        </div>

        <div className="relative z-10">
            <div className="inline-block bg-soviet-dark dark:bg-soviet-cream text-soviet-cream dark:text-soviet-dark px-4 py-1 font-mono text-sm mb-4">
                UNITY DEVELOPER PORTFOLIO
            </div>
            <h1 className="text-7xl md:text-9xl font-bold tracking-tighter uppercase leading-[0.85]">
              <span className="block text-soviet-red drop-shadow-[4px_4px_0_rgba(0,0,0,1)] dark:drop-shadow-[4px_4px_0_rgba(255,255,255,0.2)]">Digital</span>
              <span className="block pl-4 md:pl-24 dark:text-soviet-cream">Construct</span>
            </h1>
        </div>
        
        <div className="mt-12 flex flex-col md:flex-row items-start gap-8 max-w-4xl">
            <p className="flex-1 text-xl font-serif italic border-l-8 border-soviet-red pl-6 py-2 bg-white/50 dark:bg-black/20 backdrop-blur-sm">
                {language === Language.CN 
                    ? '在这里，逻辑是骨架，代码是肌肉，渲染是皮肤。' 
                    : 'Here, logic is the skeleton, code is the muscle, and rendering is the skin.'}
            </p>
        </div>
      </motion.header>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-24"
      >
        {/* SECTION 1: SHADER WORKS */}
        <section>
            <SectionHeader title="Shader Experiments" cnTitle="Shader 作品" icon={Hexagon} />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1 bg-soviet-red text-soviet-cream p-6 border-4 border-soviet-dark dark:border-soviet-cream flex flex-col justify-center shadow-[8px_8px_0px_0px_rgba(26,26,26,1)]">
                    <h4 className="text-3xl font-bold uppercase mb-4">Visual Magic</h4>
                    <p className="font-serif italic text-lg mb-4">"The art of controlling light and pixels."</p>
                    <ul className="list-disc list-inside font-mono text-sm space-y-2">
                        <li>Raymarching</li>
                        <li>Compute Shaders</li>
                        <li>Post-Processing</li>
                    </ul>
                </div>
                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {shaderWorks.map(item => <WorkCard key={item.id} item={item} />)}
                </div>
            </div>
        </section>

        {/* SECTION 2: UNITY WORKS */}
        <section>
            <SectionHeader title="Unity Projects" cnTitle="Unity 作品" icon={Layers} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {unityWorks.map(item => <WorkCard key={item.id} item={item} />)}
                 {/* Placeholder for layout if empty */}
                 {unityWorks.length < 4 && (
                    <div className="border-2 border-dashed border-soviet-grey/50 flex items-center justify-center p-8 opacity-50">
                        <span className="font-mono text-xs uppercase">More Projects Coming Soon</span>
                    </div>
                 )}
            </div>
        </section>

        {/* SECTION 3: TECH INSIGHTS */}
        <section>
            <SectionHeader title="Tech Insights" cnTitle="技术理解" icon={Code} />
            <div className="relative">
                {/* Background decorative line */}
                <div className="absolute left-8 top-0 bottom-0 w-1 bg-soviet-dark/20 dark:bg-soviet-cream/20 -z-10"></div>
                
                <div className="grid grid-cols-1 gap-6">
                    {techWorks.map(item => (
                        <motion.div 
                            key={item.id}
                            variants={itemVariants}
                            whileHover={{ x: 10 }}
                            className="ml-0 md:ml-8 bg-white dark:bg-[#1a1a1a] p-6 border-l-8 border-soviet-red shadow-md flex flex-col md:flex-row gap-6 items-start md:items-center"
                        >
                            <div className="bg-soviet-dark text-soviet-cream p-3 min-w-[60px] text-center font-bold">
                                <Zap size={24} className="mx-auto mb-1"/>
                                TECH
                            </div>
                            <div className="flex-1">
                                <h4 className="text-2xl font-bold uppercase mb-2 hover:text-soviet-red cursor-pointer">{item.title}</h4>
                                <p className="text-sm opacity-70">{item.description}</p>
                            </div>
                            <div className="text-xs font-mono border border-current px-2 py-1 rounded-full">
                                {item.date}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
      </motion.div>

      {/* FOOTER */}
      <footer className="mt-32 border-t-8 border-soviet-dark dark:border-soviet-red py-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 opacity-60">
        <div className="font-mono text-xs">
            <div className="mb-2 uppercase font-bold">System Metrics:</div>
            REACT v18.2.0 / FRAMER MOTION<br/>
            TAILWIND CSS / VITE<br/>
            BUILD: 2024.1.0
        </div>
        <div className="text-right">
             <div className="text-6xl font-bold text-soviet-dark/10 dark:text-soviet-cream/10">
                ENGINEER
            </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;