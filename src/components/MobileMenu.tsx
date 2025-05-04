'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { handleNavClick } from '@/utils/smoothScroll';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const menuItems = [
    { href: 'about', label: 'About' },
    { href: 'skills', label: 'Skills' },
    { href: 'projects', label: 'Projects' },
    { href: 'contact', label: 'Contact' }
  ];

  const menuVariants = {
    closed: { x: '100%' },
    open: { x: 0 }
  };

  const itemVariants = {
    closed: { x: 20, opacity: 0 },
    open: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
      },
    })
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed right-0 top-0 h-full w-64 bg-white dark:bg-gray-900 z-50 shadow-xl"
          >
            <div className="p-4">
              <motion.button 
                onClick={onClose}
                className="mb-8 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Close menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
              <nav className="flex flex-col space-y-4">
                {menuItems.map(({ href, label }, i) => (
                  <motion.a
                    key={href}
                    href={`#${href}`}
                    onClick={(e) => {
                      handleNavClick(e, href);
                      onClose();
                    }}
                    className="text-lg hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                    variants={itemVariants}
                    custom={i}
                    whileHover={{ x: 5 }}
                  >
                    {label}
                  </motion.a>
                ))}
              </nav>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}