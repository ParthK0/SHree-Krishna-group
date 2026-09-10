import React from 'react';
import { motion } from 'framer-motion';

interface FadeUpProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const FadeUp: React.FC<FadeUpProps> = ({ children, delay = 0, className = '' }) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.65, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};
