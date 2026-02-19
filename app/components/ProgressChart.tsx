'use client';

import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

interface ProgressChartProps {
  weeklyData: number[];
  title: string;
}

export default function ProgressChart({ weeklyData, title }: ProgressChartProps) {
  const maxValue = Math.max(...weeklyData, 1);
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const barVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { height: 'auto', opacity: 1 },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="glass-panel p-6 rounded-xl"
    >
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="text-neon-cyan" size={20} />
        <h3 className="text-lg font-orbitron text-neon-cyan">{title}</h3>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex items-end justify-between gap-2 h-40"
      >
        {weeklyData.map((value, idx) => (
          <motion.div
            key={idx}
            variants={barVariants}
            className="flex-1 flex flex-col items-center"
          >
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${(value / maxValue) * 100}%` }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              className={`w-full rounded-t-lg transition-all duration-300 ${
                value > 0
                  ? 'bg-gradient-to-t from-neon-cyan to-neon-blue'
                  : 'bg-background-tertiary'
              }`}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 240, 255, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
            <span className="text-xs text-gray-500 font-rajdhani mt-2">{days[idx]}</span>
            <span className="text-xs text-gray-400 font-orbitron mt-1">{value}</span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
