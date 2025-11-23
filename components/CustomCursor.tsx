import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor: React.FC = () => {
  // Use MotionValues for direct DOM manipulation (bypassing React render cycle)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Create smooth springs for the cursor movement
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 }; // Snappy but smooth
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16); // Center the 32px cursor
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check for buttons, links, or specific interactive roles
      if (
        target.tagName === 'BUTTON' || 
        target.closest('button') || 
        target.tagName === 'A' || 
        target.closest('a') ||
        target.getAttribute('role') === 'button'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  // Don't render on touch devices
  if (typeof navigator !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-exclusion"
      style={{ x, y }} 
    >
      <motion.div 
        className="relative w-8 h-8 flex items-center justify-center"
        animate={{
          scale: isHovering ? 1.5 : 1,
          rotate: isHovering ? 45 : 0
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Constructivist Shape: Crosshair / Target */}
        
        {/* Horizontal Line */}
        <div className="absolute w-full h-[2px] bg-white" />
        {/* Vertical Line */}
        <div className="absolute h-full w-[2px] bg-white" />
        
        {/* Ring */}
        <motion.div 
            className="absolute inset-0 border-2 border-white rounded-full"
            animate={{
                borderRadius: isHovering ? "0%" : "50%", // Turn to square on hover
                borderWidth: isHovering ? "4px" : "2px"
            }}
        />

        {/* Outer Decor */}
        <motion.div 
          className="absolute -inset-4 border border-dashed border-white opacity-40 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
    </motion.div>
  );
};

export default CustomCursor;