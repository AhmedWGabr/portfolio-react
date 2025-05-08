'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiTypescript,
  SiTailwindcss,
  SiGit,
  SiJavascript,
  SiHtml5
} from 'react-icons/si';
import Typewriter from 'typewriter-effect';
import SkillBar from '@/components/SkillBar';
import ProjectCard from '@/components/ProjectCard';
import ParallaxBackground from '@/components/ParallaxBackground';
import ContactForm from '@/components/ContactForm';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  // No need to track scroll position since we're using framer-motion's useScroll

  const projects = [
    {
      title: 'E-commerce Platform',
      description: 'A full-stack e-commerce platform with user authentication, product management, and payment integration using Stripe.',
      image: 'https://placehold.co/600x400/2563eb/white?text=E-commerce+Platform',
      tech: ['Next.js', 'Node.js', 'MongoDB', 'Stripe', 'Tailwind'],
      live: 'https://ecommerce-demo.com',
      github: 'https://github.com/yourusername/ecommerce'
    },
    {
      title: 'Task Management Dashboard',
      description: 'A responsive task management application with drag-and-drop functionality, real-time updates, and team collaboration features.',
      image: 'https://placehold.co/600x400/2563eb/white?text=Task+Management',
      tech: ['React', 'TypeScript', 'Firebase', 'Material-UI'],
      live: 'https://task-manager-demo.com',
      github: 'https://github.com/yourusername/task-manager'
    },
    {
      title: 'Weather Dashboard',
      description: 'Real-time weather dashboard using OpenWeather API with location detection and 5-day forecast visualization.',
      image: 'https://placehold.co/600x400/2563eb/white?text=Weather+App',
      tech: ['JavaScript', 'Chart.js', 'REST API', 'CSS3'],
      live: 'https://weather-app-demo.com',
      github: 'https://github.com/yourusername/weather-app'
    },
    {
      title: 'Portfolio Website',
      description: 'A modern, responsive portfolio website built with Next.js and Framer Motion for smooth animations.',
      image: 'https://placehold.co/600x400/2563eb/white?text=Portfolio',
      tech: ['Next.js', 'TypeScript', 'Framer Motion', 'Tailwind'],
      live: '#',
      github: 'https://github.com/yourusername/portfolio'
    },
    {
      title: 'Blog Platform',
      description: 'A full-featured blog platform with markdown support, comments, and user authentication.',
      image: 'https://placehold.co/600x400/2563eb/white?text=Blog+Platform',
      tech: ['Next.js', 'MongoDB', 'OAuth', 'MDX'],
      live: 'https://blog-demo.com',
      github: 'https://github.com/yourusername/blog'
    },
    {
      title: 'Recipe Finder App',
      description: 'A mobile-responsive recipe finder app with filtering, favorites, and step-by-step cooking instructions.',
      image: 'https://placehold.co/600x400/2563eb/white?text=Recipe+Finder',
      tech: ['React', 'Redux', 'API Integration', 'Styled Components'],
      live: 'https://recipe-finder-demo.com',
      github: 'https://github.com/yourusername/recipe-finder'
    }
  ];

  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Hero Section with Enhanced Parallax */}
      <motion.section
        ref={heroRef}
        className="w-full min-h-screen flex items-center justify-center relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <ParallaxBackground />

        {/* Decorative elements */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 left-10 w-24 h-24 md:w-32 md:h-32 opacity-20"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          >
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" />
              <path d="M50 10 L50 90" stroke="currentColor" strokeWidth="2" />
              <path d="M10 50 L90 50" stroke="currentColor" strokeWidth="2" />
            </svg>
          </motion.div>

          <motion.div
            className="absolute bottom-1/4 right-10 w-24 h-24 md:w-32 md:h-32 opacity-20"
            animate={{
              rotate: [0, -360],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 25, repeat: Infinity, repeatType: "reverse" }}
          >
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="20" y="20" width="60" height="60" stroke="currentColor" strokeWidth="2" />
              <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="2" />
            </svg>
          </motion.div>
        </div>

        <motion.div
          className="container mx-auto px-4 py-16 text-center relative z-10"
          style={{ y, opacity, scale }}
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="relative inline-block mb-6"
            >
              <motion.h1
                className="text-4xl md:text-6xl font-bold relative z-10"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Hi, I&apos;m Ahmed Wahba
              </motion.h1>
              <motion.div
                className="absolute -inset-1 bg-blue-500/10 rounded-lg blur-xl z-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              />
            </motion.div>

            <div className="relative h-20 mb-8">
              <h2 className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300">
                <Typewriter
                  options={{
                    strings: [
                      'Frontend Developer',
                      'React Specialist',
                      'UI/UX Enthusiast',
                      'Creative Problem Solver'
                    ],
                    autoStart: true,
                    loop: true,
                    delay: 40,
                    deleteSpeed: 20,
                  }}
                />
              </h2>
              <motion.div
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-blue-500/50 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '50%' }}
                transition={{ delay: 1, duration: 1 }}
              />
            </div>

            <motion.div
              className="flex justify-center gap-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <motion.a
                href="https://github.com/YourGitHub"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="text-3xl hover:text-blue-600 transition-colors relative group"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <FaGithub />
                <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">GitHub</span>
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/YourLinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="text-3xl hover:text-blue-600 transition-colors relative group"
                whileHover={{ scale: 1.1, rotate: -5 }}
              >
                <FaLinkedin />
                <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">LinkedIn</span>
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.a
                href="#contact"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-all inline-flex items-center gap-2"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Get in Touch</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                >
                  →
                </motion.span>
              </motion.a>

              <motion.a
                href="#projects"
                className="px-8 py-3 rounded-lg border border-gray-300 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all inline-block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Projects
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-gray-400 dark:text-gray-500 cursor-pointer"
            onClick={() => {
              const aboutSection = document.getElementById('about');
              if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* About Section with Experience */}
      <section id="about" className="w-full py-20 bg-white dark:bg-gray-800 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-50 dark:bg-blue-900/20 rounded-bl-full opacity-50" />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-blue-50 dark:bg-blue-900/20 rounded-tr-full opacity-50" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <motion.div
                className="md:w-1/2"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="relative">
                  <h2 className="text-3xl font-bold mb-8 inline-block">
                    About Me
                    <motion.div
                      className="absolute -bottom-2 left-0 h-1 bg-blue-500 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      transition={{ delay: 0.3, duration: 0.8 }}
                      viewport={{ once: true }}
                    />
                  </h2>
                </div>

                <motion.p
                  className="text-lg mb-6 text-gray-700 dark:text-gray-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  I&apos;m a passionate web developer with a strong foundation in modern web technologies.
                  My journey in web development began with a deep interest in creating intuitive and engaging user experiences.
                  I specialize in building responsive web applications using React, Next.js, and modern JavaScript.
                </motion.p>

                <motion.p
                  className="text-lg mb-6 text-gray-700 dark:text-gray-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  I&apos;m constantly learning and exploring new technologies to stay at the forefront of web development.
                  My goal is to create beautiful, functional, and accessible web experiences that solve real problems.
                </motion.p>
              </motion.div>

              <motion.div
                className="md:w-1/2"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <motion.span
                      className="inline-block mr-2 text-blue-500"
                      animate={{ rotate: [0, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      ✦
                    </motion.span>
                    Experience Highlights
                  </h3>

                  <ul className="space-y-4" aria-label="Experience highlights">
                    {[
                      "Developed and maintained responsive websites using React and Next.js",
                      "Collaborated with senior developers to implement new features and improve existing functionality",
                      "Participated in code reviews and implemented feedback to improve code quality",
                      "Worked with version control systems (Git) and followed Agile methodologies",
                      "Optimized web applications for maximum speed and scalability"
                    ].map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start"
                      >
                        <motion.span
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * index, duration: 0.5 }}
                          viewport={{ once: true }}
                        >
                          <span className="mr-2 text-blue-500">•</span>
                          <span>{item}</span>
                        </motion.span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section with Animated Skill Bars */}
      <section id="skills" className="w-full py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        {/* Decorative background elements */}
        <motion.div
          className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
            className="max-w-5xl mx-auto"
          >
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.div className="inline-block relative">
                <h2 className="text-3xl font-bold mb-4">Technical Skills</h2>
                <motion.div
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-blue-500 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: '80%' }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  viewport={{ once: true }}
                />
              </motion.div>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-4">
                I&apos;ve developed expertise in various modern web technologies, with a focus on frontend development and responsive design.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { icon: SiReact, name: 'React', level: '90%' },
                { icon: SiNextdotjs, name: 'Next.js', level: '85%' },
                { icon: SiNodedotjs, name: 'Node.js', level: '75%' },
                { icon: SiTypescript, name: 'TypeScript', level: '80%' },
                { icon: SiTailwindcss, name: 'Tailwind CSS', level: '95%' },
                { icon: SiGit, name: 'Git', level: '85%' },
                { icon: SiJavascript, name: 'JavaScript', level: '90%' },
                { icon: SiHtml5, name: 'HTML5/CSS3', level: '95%' }
              ].map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <SkillBar
                    name={skill.name}
                    level={skill.level}
                    icon={skill.icon}
                  />
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-16 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold mb-6">Additional Skills</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  'Responsive Design', 'UI/UX Design', 'RESTful APIs', 'GraphQL',
                  'Jest Testing', 'Webpack', 'Firebase', 'MongoDB', 'Figma', 'Accessibility'
                ].map((skill, index) => (
                  <motion.span
                    key={skill}
                    className="px-4 py-2 bg-white dark:bg-gray-800 rounded-full text-sm shadow-sm border border-gray-200 dark:border-gray-700"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * index }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5, boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Projects Section */}
      <section id="projects" className="w-full py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Here are some of my recent projects that showcase my skills in web development,
              from responsive design to full-stack applications.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                {...project}
                index={index}
              />
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <a
              href="https://github.com/AhmedWGabr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
            >
              <span>View More Projects on GitHub</span>
              <FaGithub className="text-xl" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section id="contact" className="w-full py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-bold mb-8 text-center">Let&apos;s Connect</h2>
            <div className="max-w-md mx-auto">
              <div className="flex justify-center gap-8 mb-12">
                <motion.a
                  href="mailto:your.email@example.com"
                  className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  whileHover={{ scale: 1.05 }}
                >
                  <FaEnvelope className="text-xl" />
                  <span>Email Me</span>
                </motion.a>
                <motion.a
                  href="https://linkedin.com/in/YourLinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  whileHover={{ scale: 1.05 }}
                >
                  <FaLinkedin className="text-xl" />
                  <span>LinkedIn</span>
                </motion.a>
              </div>
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
