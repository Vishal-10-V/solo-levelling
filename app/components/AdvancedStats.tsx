'use client';

import { motion } from 'framer-motion';
import { Flame, TrendingUp, Award, Clock } from 'lucide-react';

interface StatsProps {
  currentStreak: number;
  longestStreak: number;
  totalCompleted: number;
  avgCompletionTime: number;
  stats: {
    strength: number;
    intelligence: number;
    vitality: number;
    dexterity: number;
  };
}

export default function AdvancedStats({
  currentStreak,
  longestStreak,
  totalCompleted,
  avgCompletionTime,
  stats,
}: StatsProps) {
  const statVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 },
    }),
  };

  const statCards = [
    { icon: Flame, label: 'Current Streak', value: currentStreak, color: 'text-red-500', bgColor: 'bg-red-500/10' },
    { icon: Award, label: 'Longest Streak', value: longestStreak, color: 'text-yellow-500', bgColor: 'bg-yellow-500/10' },
    { icon: TrendingUp, label: 'Total Completed', value: totalCompleted, color: 'text-neon-blue', bgColor: 'bg-neon-blue/10' },
    { icon: Clock, label: 'Avg Time (min)', value: avgCompletionTime, color: 'text-neon-purple', bgColor: 'bg-neon-purple/10' },
  ];

  return (
    <div className="space-y-6">
      {/* Streak & Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              custom={i}
              variants={statVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.05, y: -5 }}
              className={`glass-panel p-4 border-l-4 border-${card.color.split('-')[1]}`}
            >
              <div className={`${card.bgColor} p-2 rounded-lg w-fit mb-3`}>
                <Icon className={`${card.color}`} size={20} />
              </div>
              <div className="text-2xl font-orbitron text-white mb-1">{card.value}</div>
              <div className="text-xs text-gray-400 font-rajdhani">{card.label}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Character Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="glass-panel p-6 rounded-xl"
      >
        <h3 className="text-lg font-orbitron text-neon-purple mb-4">CHARACTER STATS</h3>
        
        <div className="space-y-4">
          {Object.entries(stats).map(([key, value], idx) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + idx * 0.1 }}
              className="space-y-1"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400 capitalize font-rajdhani">{key}</span>
                <span className="font-orbitron text-neon-cyan">{value}</span>
              </div>
              
              <div className="relative h-2 bg-background-secondary rounded-full overflow-hidden border border-panel-border">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(value / 10) * 100}%` }}
                  transition={{ delay: 0.6 + idx * 0.1, duration: 1 }}
                  className={`h-full bg-gradient-to-r ${
                    key === 'strength' ? 'from-rank-a to-red-500' :
                    key === 'intelligence' ? 'from-rank-b to-purple-500' :
                    key === 'vitality' ? 'from-rank-c to-green-500' :
                    'from-rank-d to-blue-500'
                  }`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
