'use client';

import { motion } from 'framer-motion';
import { Trash2, Clock, Target } from 'lucide-react';

interface QuestCardProps {
  id: string;
  title: string;
  description?: string;
  rank: string;
  status: string;
  expReward: number;
  estimatedMinutes?: number;
  category?: string;
  onComplete: () => void;
  onDelete: () => void;
}

export default function QuestCard({
  id,
  title,
  description,
  rank,
  status,
  expReward,
  estimatedMinutes,
  category,
  onComplete,
  onDelete,
}: QuestCardProps) {
  const rankColors: Record<string, string> = {
    E: 'border-gray-400 text-gray-400 bg-gray-500/20',
    D: 'border-green-500 text-green-500 bg-green-500/20',
    C: 'border-blue-500 text-blue-500 bg-blue-500/20',
    B: 'border-purple-500 text-purple-500 bg-purple-500/20',
    A: 'border-yellow-500 text-yellow-500 bg-yellow-500/20',
    S: 'border-red-500 text-red-500 bg-red-500/20',
  };

  const categoryColors: Record<string, string> = {
    exercise: 'bg-red-500/20 text-red-400',
    work: 'bg-blue-500/20 text-blue-400',
    learning: 'bg-purple-500/20 text-purple-400',
    hobby: 'bg-pink-500/20 text-pink-400',
    health: 'bg-green-500/20 text-green-400',
    productivity: 'bg-yellow-500/20 text-yellow-400',
  };

  const glowColor = {
    E: 'hover:shadow-gray-500/20',
    D: 'hover:shadow-green-500/20',
    C: 'hover:shadow-blue-500/20',
    B: 'hover:shadow-purple-500/20',
    A: 'hover:shadow-yellow-500/20',
    S: 'hover:shadow-red-500/20',
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className={`glass-panel p-5 border-l-4 border-${rankColors[rank].split(' ')[1]} cursor-pointer transition-all duration-300 ${glowColor[rank as keyof typeof glowColor]}`}
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className={`px-3 py-1 text-xs font-orbitron rounded border ${rankColors[rank]}`}>
              {rank}-RANK
            </span>
            {category && (
              <span className={`px-2 py-1 text-xs font-rajdhani rounded capitalize ${categoryColors[category] || 'bg-gray-500/20'}`}>
                {category}
              </span>
            )}
          </div>

          <motion.h3
            onClick={onComplete}
            className="text-white font-rajdhani text-lg mb-1 hover:text-neon-blue transition-colors"
          >
            {title}
          </motion.h3>

          {description && (
            <p className="text-gray-400 font-rajdhani text-sm mb-3">{description}</p>
          )}

          <div className="flex items-center gap-4 text-xs text-gray-400">
            {estimatedMinutes && (
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>{estimatedMinutes} min</span>
              </div>
            )}
            <div className="flex items-center gap-1 text-neon-blue">
              <Target size={14} />
              <span>+{expReward} EXP</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          {status === 'active' && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onComplete}
              className="px-4 py-2 bg-gradient-to-r from-neon-cyan to-neon-blue text-black font-orbitron text-sm rounded-lg hover:shadow-lg hover:shadow-neon-blue/50 transition-all"
            >
              ✓ COMPLETE
            </motion.button>
          )}

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onDelete}
            className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
          >
            <Trash2 size={18} className="text-red-500" />
          </motion.button>
        </div>
      </div>

      {status === 'completed' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-3 pt-3 border-t border-panel-border"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center gap-2 text-neon-cyan font-orbitron text-xs"
          >
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.6 }}>
              ✓
            </motion.div>
            Completed
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
