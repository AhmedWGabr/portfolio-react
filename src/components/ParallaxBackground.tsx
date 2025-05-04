'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

export default function ParallaxBackground() {
  const ref = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Enhanced parallax effects with variable speeds
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  
  // Mouse movement effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth) - 0.5;
      const y = (clientY / window.innerHeight) - 0.5;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ opacity }}
      >
        {/* Enhanced background shapes with mouse interaction */}
        <motion.div
          className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-3xl"
          style={{ 
            y: y1,
            x: useTransform(() => mousePosition.x * -20 + '%'),
            scale: useTransform(() => 1 + (mousePosition.y * 0.1))
          }}
          animate={{
            opacity: [0.7, 0.9, 0.7],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div
          className="absolute top-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-3xl"
          style={{ 
            y: y2,
            x: useTransform(() => mousePosition.x * 15 + '%'),
            scale: useTransform(() => 1 + (mousePosition.y * -0.1))
          }}
          animate={{
            opacity: [0.8, 0.6, 0.8],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div
          className="absolute -bottom-1/4 left-1/4 w-1/2 h-1/2 bg-cyan-500/10 rounded-full blur-3xl"
          style={{ 
            y: y3,
            x: useTransform(() => mousePosition.x * 10 + '%'),
            scale: useTransform(() => 1 + (mousePosition.x * 0.1))
          }}
          animate={{
            opacity: [0.6, 0.8, 0.6],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        {/* Additional floating particles */}
        <AnimatePresence>
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className={`absolute w-${2 + i} h-${2 + i} rounded-full bg-white/10 blur-sm`}
              initial={{ 
                x: `${Math.random() * 100}%`, 
                y: `${Math.random() * 100}%`,
                opacity: 0 
              }}
              animate={{ 
                x: `${Math.random() * 100}%`, 
                y: `${Math.random() * 100}%`,
                opacity: [0, 0.3, 0] 
              }}
              transition={{ 
                duration: 10 + (i * 5), 
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Enhanced grid overlay with subtle animation */}
      <motion.div 
        className="absolute inset-0"
        style={{ opacity: useTransform(scrollYProgress, [0, 0.8], [0.15, 0]) }}
        animate={{ scale: [1, 1.01, 1] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
      >
        <div className="h-full w-full bg-[linear-gradient(to_right,#666_1px,transparent_1px),linear-gradient(to_bottom,#666_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </motion.div>
    </div>
  );
}