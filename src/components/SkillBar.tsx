'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface SkillBarProps {
  name: string;
  level: string;
  icon: React.ElementType;
}

export default function SkillBar({ name, level, icon: Icon }: SkillBarProps) {
  const { elementRef, isVisible } = useScrollAnimation();
  const [isHovered, setIsHovered] = useState(false);
  
  // Extract numeric value from level string (e.g., "90%" -> 90)
  const levelValue = parseInt(level);
  
  // Determine color based on skill level
  const getColorClass = () => {
    if (levelValue >= 90) return 'bg-gradient-to-r from-blue-600 to-purple-600';
    if (levelValue >= 80) return 'bg-gradient-to-r from-blue-500 to-blue-600';
    if (levelValue >= 70) return 'bg-gradient-to-r from-blue-400 to-blue-500';
    return 'bg-blue-400';
  };

  return (
    <motion.div
      ref={elementRef}
      className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg text-center relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ duration: 0.5 }}
      whileHover={{ 
        y: -5,
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Decorative corner accent */}
      <motion.div 
        className="absolute top-0 right-0 w-12 h-12 opacity-10 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 0.1 : 0 }}
      >
        <div className="absolute top-0 right-0 w-12 h-12 bg-blue-600 transform rotate-45 translate-x-6 -translate-y-6" />
      </motion.div>
      
      {/* Icon with animation */}
      <motion.div
        className="relative mb-4 mx-auto w-16 h-16 flex items-center justify-center"
        animate={isHovered ? { 
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0]
        } : {}}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="absolute inset-0 bg-blue-100 dark:bg-blue-900/30 rounded-full"
          initial={{ scale: 0 }}
          animate={{ scale: isVisible ? 1 : 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        />
        <Icon className="w-10 h-10 text-blue-600 dark:text-blue-400 relative z-10" />
      </motion.div>
      
      {/* Skill name */}
      <motion.h3 
        className="font-semibold mb-3 text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {name}
      </motion.h3>
      
      {/* Skill level indicator */}
      <div className="relative">
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
          <span>Proficiency</span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ delay: 0.4 }}
          >
            {level}
          </motion.span>
        </div>
        
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
          <motion.div 
            className={`h-2.5 rounded-full ${getColorClass()}`}
            initial={{ width: 0 }}
            animate={{ width: isVisible ? level : 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          />
        </div>
        
        {/* Animated dots on the progress bar */}
        {isVisible && (
          <motion.div 
            className="absolute top-0 right-0 h-full flex items-center"
            style={{ right: `calc(100% - ${level})` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <motion.div 
              className="w-2 h-2 bg-white rounded-full shadow-sm"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}