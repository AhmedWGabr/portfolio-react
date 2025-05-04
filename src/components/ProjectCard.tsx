'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FaGithub, FaExternalLinkAlt, FaInfoCircle } from 'react-icons/fa';
import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tech: string[];
  live: string;
  github: string;
  index: number;
}

export default function ProjectCard({ title, description, image, tech, live, github, index }: ProjectCardProps) {
  const { elementRef, isVisible } = useScrollAnimation();
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <motion.div
      ref={elementRef}
      className="bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg transform-gpu relative"
      initial={{ opacity: 0, y: 50 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        y: isVisible ? 0 : 50,
        transition: {
          duration: 0.5,
          delay: index * 0.2,
          ease: "easeOut"
        }
      }}
      whileHover={{ 
        y: -10,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        transition: { duration: 0.3 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Project image with overlay */}
      <div className="relative overflow-hidden group">
        <div className="aspect-video relative bg-gray-200 dark:bg-gray-700">
          {image ? (
            <Image
              src={image}
              alt={`Screenshot of ${title} project`}
              fill
              priority={index < 3} // Prioritize loading for first 3 projects
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
              [Project Screenshot]
            </div>
          )}
          
          {/* Project links overlay */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-blue-600/90 to-blue-600/70 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex gap-4">
              <motion.a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${title} source code on GitHub`}
                className="p-3 bg-white rounded-full text-blue-600 hover:text-blue-700 transition-all hover:shadow-lg"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaGithub className="text-xl" />
              </motion.a>
              <motion.a
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit live demo of ${title}`}
                className="p-3 bg-white rounded-full text-blue-600 hover:text-blue-700 transition-all hover:shadow-lg"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaExternalLinkAlt className="text-xl" />
              </motion.a>
              <motion.button
                onClick={() => setShowDetails(!showDetails)}
                aria-label={`${showDetails ? 'Hide' : 'Show'} project details`}
                className="p-3 bg-white rounded-full text-blue-600 hover:text-blue-700 transition-all hover:shadow-lg"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaInfoCircle className="text-xl" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Project info */}
      <div className="p-6">
        <motion.div
          className="flex items-center justify-between mb-2"
        >
          <motion.h3 
            className="text-xl font-semibold"
            initial={{ opacity: 0, x: -20 }}
            animate={{ 
              opacity: isVisible ? 1 : 0, 
              x: isVisible ? 0 : -20,
              transition: { delay: 0.2 }
            }}
          >
            {title}
          </motion.h3>
          
          {/* Animated indicator dot */}
          <motion.div 
            className="h-2 w-2 rounded-full bg-green-500"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          />
        </motion.div>
        
        <AnimatePresence>
          {(!showDetails) && (
            <motion.p 
              className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{ 
                opacity: isVisible ? 1 : 0,
                height: 'auto',
                transition: { delay: 0.3 }
              }}
              exit={{ opacity: 0, height: 0 }}
            >
              {description}
            </motion.p>
          )}
          
          {showDetails && (
            <motion.p 
              className="text-gray-600 dark:text-gray-300 mb-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ 
                opacity: 1,
                height: 'auto',
                transition: { duration: 0.3 }
              }}
              exit={{ opacity: 0, height: 0 }}
            >
              {description}
            </motion.p>
          )}
        </AnimatePresence>
        
        <div className="flex flex-wrap gap-2 mb-2">
          {tech.map((techItem, i) => (
            <motion.span
              key={techItem}
              className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full text-sm font-medium"
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ 
                opacity: isVisible ? 1 : 0,
                scale: isVisible ? 1 : 0.8,
                y: isVisible ? 0 : 10,
                transition: { delay: 0.4 + (i * 0.1) }
              }}
              whileHover={{ scale: 1.05, y: -2 }}
            >
              {techItem}
            </motion.span>
          ))}
        </div>
      </div>
      
      {/* Decorative corner accent */}
      <motion.div 
        className="absolute top-0 right-0 w-16 h-16 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="absolute top-0 right-0 w-16 h-16 bg-blue-600/10 transform rotate-45 translate-x-8 -translate-y-8" />
      </motion.div>
    </motion.div>
  );
}