'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaCheck, FaEnvelope, FaComment } from 'react-icons/fa';

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [errors, setErrors] = useState({
    email: '',
    message: '',
  });
  
  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'email':
        if (!value) return 'Email is required';
        if (!/^\S+@\S+\.\S+$/.test(value)) return 'Please enter a valid email';
        return '';
      case 'message':
        if (!value) return 'Message is required';
        if (value.length < 10) return 'Message must be at least 10 characters';
        return '';
      default:
        return '';
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form fields
    const emailError = validateField('email', formState.email);
    const messageError = validateField('message', formState.message);
    
    setErrors({
      email: emailError,
      message: messageError
    });
    
    // If there are errors, don't submit
    if (emailError || messageError) {
      return;
    }
    
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormState({ name: '', email: '', message: '' });
        setErrors({ email: '', message: '' });
        setTimeout(() => setSubmitted(false), 3000); // Hide success message after 3 seconds
      } else {
        // Handle errors, maybe show an error message to the user
        console.error('Form submission failed:', response.statusText);
        alert('Failed to send message. Please try again later.'); // Simple error handling
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again later.'); // Simple error handling
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      {/* Decorative elements */}
      <motion.div 
        className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl z-0"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
      />
      
      <AnimatePresence>
        {submitted && (
          <motion.div 
            className="absolute inset-0 bg-white dark:bg-gray-800 rounded-xl flex flex-col items-center justify-center z-20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.5 }}
              className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4"
            >
              <FaCheck className="text-green-600 dark:text-green-400 text-2xl" />
            </motion.div>
            <motion.h3 
              className="text-xl font-semibold mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Message Sent Successfully!
            </motion.h3>
            <motion.p 
              className="text-gray-600 dark:text-gray-400 text-center max-w-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Thank you for reaching out. I&apos;ll get back to you as soon as possible.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
      
      <form 
        ref={formRef}
        className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg relative z-10"
        onSubmit={handleSubmit}
      >
        {/* Name field */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="relative">
            <label htmlFor="name" className="block mb-2 text-gray-700 dark:text-gray-300 font-medium">
              Name <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <motion.div
              className={`relative ${focused === 'name' ? 'z-10' : ''}`}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <input
                type="text"
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                onFocus={() => setFocused('name')}
                onBlur={() => setFocused(null)}
                className={`w-full p-3 pl-10 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none transition-all ${focused === 'name' ? 'border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800' : ''}`}
                placeholder="Your name"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Email field */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <div className="relative">
            <label htmlFor="email" className="block mb-2 text-gray-700 dark:text-gray-300 font-medium">Email</label>
            <motion.div
              className={`relative ${focused === 'email' ? 'z-10' : ''}`}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <input
                type="email"
                id="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                onFocus={() => setFocused('email')}
                onBlur={(e) => {
                  setFocused(null);
                  setErrors(prev => ({
                    ...prev,
                    email: validateField('email', e.target.value)
                  }));
                }}
                className={`w-full p-3 pl-10 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none transition-all ${errors.email ? 'border-red-500' : ''} ${focused === 'email' ? 'border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800' : ''}`}
                placeholder="your@email.com"
                aria-describedby="email-error"
                required
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <FaEnvelope className="h-4 w-4" />
              </div>
            </motion.div>
            {errors.email && (
              <motion.p 
                id="email-error"
                className="mt-1 text-sm text-red-500"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {errors.email}
              </motion.p>
            )}
          </div>
        </motion.div>

        {/* Message field */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="relative">
            <label htmlFor="message" className="block mb-2 text-gray-700 dark:text-gray-300 font-medium">Message</label>
            <motion.div
              className={`relative ${focused === 'message' ? 'z-10' : ''}`}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="absolute left-3 top-3 text-gray-400">
                <FaComment className="h-4 w-4" />
              </div>
              <textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                onFocus={() => setFocused('message')}
                onBlur={(e) => {
                  setFocused(null);
                  setErrors(prev => ({
                    ...prev,
                    message: validateField('message', e.target.value)
                  }));
                }}
                rows={4}
                className={`w-full p-3 pl-10 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none transition-all ${errors.message ? 'border-red-500' : ''} ${focused === 'message' ? 'border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800' : ''}`}
                placeholder="Your message..."
                aria-describedby="message-error"
                required
              />
            </motion.div>
            {errors.message && (
              <motion.p 
                id="message-error"
                className="mt-1 text-sm text-red-500"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {errors.message}
              </motion.p>
            )}
          </div>
        </motion.div>

        {/* Submit button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <motion.button
            type="submit"
            className="w-full bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 relative overflow-hidden"
            whileHover={{ scale: 1.02, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700"
              animate={{ x: ['-100%', '0%'] }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
            
            <motion.div className="relative z-10 flex items-center justify-center gap-2">
              {isSubmitting ? (
                <motion.div
                  className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              ) : (
                <>
                  <span>Send Message</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                  >
                    <FaPaperPlane />
                  </motion.div>
                </>
              )}
            </motion.div>
          </motion.button>
        </motion.div>
      </form>
    </motion.div>
  );
}
