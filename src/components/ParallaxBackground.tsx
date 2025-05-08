'use client';

import { motion, useScroll, useTransform, AnimatePresence, MotionValue } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

interface Particle {
  id: string;
  initialX: number;
  initialY: number;
  size: number;
  duration: number;
}

export default function ParallaxBackground() {
  const ref = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]); // State for particles

  // useScroll must be called unconditionally
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // useTransform hooks must be called unconditionally
  const y1: MotionValue<string> = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const y2: MotionValue<string> = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const y3: MotionValue<string> = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity: MotionValue<number> = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const mouseXTransform: MotionValue<string> = useTransform(() => mousePosition.x * -20 + '%');
  const mouseYScaleTransform: MotionValue<number> = useTransform(() => 1 + (mousePosition.y * 0.1));
  const mouseXTransform2: MotionValue<string> = useTransform(() => mousePosition.x * 15 + '%');
  const mouseYScaleTransform2: MotionValue<number> = useTransform(() => 1 + (mousePosition.y * -0.1));
  const mouseXTransform3: MotionValue<string> = useTransform(() => mousePosition.x * 10 + '%');
  const mouseXScaleTransform3: MotionValue<number> = useTransform(() => 1 + (mousePosition.x * 0.1));
  const gridOpacity: MotionValue<number> = useTransform(scrollYProgress, [0, 0.8], [0.15, 0]);


  useEffect(() => {
    setIsClient(true);

    // Only run client-side logic if window is available
    if (typeof window !== 'undefined') {
      // Mouse movement effect
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth) - 0.5;
        const y = (clientY / window.innerHeight) - 0.5;
        setMousePosition({ x, y });
      };

      window.addEventListener('mousemove', handleMouseMove);

      // Generate particles on client
      const clientParticles = Array.from({ length: 5 }).map((_, i) => ({
        id: `particle-${i}`,
        initialX: Math.random() * 100,
        initialY: Math.random() * 100,
        size: 2 + i,
        duration: 10 + (i * 5),
      }));
      setParticles(clientParticles);


      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        // No need to unsubscribe scrollYProgress here as useScroll is now unconditional
      };
    }
  }, []); // Empty dependency array ensures this runs once on mount


  // Render nothing on the server if not client
  if (!isClient) {
    return null;
  }

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
            x: mouseXTransform,
            scale: mouseYScaleTransform
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
            x: mouseXTransform2,
            scale: mouseYScaleTransform2
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
            x: mouseXTransform3,
            scale: mouseXScaleTransform3
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
        {isClient && (
          <AnimatePresence>
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className={`absolute w-${particle.size} h-${particle.size} rounded-full bg-white/10 blur-sm`}
                initial={{
                  x: `${particle.initialX}%`,
                  y: `${particle.initialY}%`,
                  opacity: 0
                }}
                animate={{
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`,
                  opacity: [0, 0.3, 0]
                }}
                transition={{
                  duration: particle.duration,
                  delay: Math.random() * 5, // Add random delay here as well
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            ))}
          </AnimatePresence>
        )}
      </motion.div>

      {/* Enhanced grid overlay with subtle animation */}
      <motion.div
        className="absolute inset-0"
        style={{ opacity: gridOpacity }}
        animate={{ scale: [1, 1.01, 1] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
      >
        <div className="h-full w-full bg-[linear-gradient(to_right,#666_1px,transparent_1px),linear-gradient(to_bottom,#666_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </motion.div>
    </div>
  );
}
