'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus } from 'lucide-react';
import { useState } from 'react';

interface QuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (quest: {
    title: string;
    description: string;
    rank: string;
    type: string;
    reward: number;
    estimatedMinutes: number;
    category: string;
    dueDate?: string;
  }) => void;
}

export default function QuestModal({ isOpen, onClose, onSubmit }: QuestModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    rank: 'D',
    type: 'daily',
    reward: 25,
    estimatedMinutes: 30,
    category: 'exercise',
    dueDate: '',
  });

  const ranks = ['E', 'D', 'C', 'B', 'A', 'S'];
  const types = ['daily', 'weekly', 'emergency', 'boss'];
  const categories = ['exercise', 'work', 'learning', 'hobby', 'health', 'productivity'];

  const rankColors: Record<string, string> = {
    E: 'border-gray-400',
    D: 'border-green-500',
    C: 'border-blue-500',
    B: 'border-purple-500',
    A: 'border-yellow-500',
    S: 'border-red-500',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title.trim()) {
      onSubmit(formData);
      setFormData({
        title: '',
        description: '',
        rank: 'D',
        type: 'daily',
        reward: 25,
        estimatedMinutes: 30,
        category: 'exercise',
        dueDate: '',
      });
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-panel w-full max-w-lg rounded-xl"
          >
            <div className="flex justify-between items-center p-6 border-b border-panel-border">
              <h2 className="text-2xl font-orbitron text-neon-blue flex items-center gap-2">
                <Plus size={24} /> NEW QUEST
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
              >
                <X size={20} className="text-red-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              {/* Title */}
              <div>
                <label className="block text-sm font-rajdhani text-gray-400 mb-2">QUEST TITLE *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter quest title..."
                  className="w-full px-4 py-2 bg-background-secondary border border-panel-border rounded-lg text-white font-rajdhani focus:border-neon-blue focus:outline-none transition-colors"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-rajdhani text-gray-400 mb-2">DESCRIPTION</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Add quest details..."
                  rows={3}
                  className="w-full px-4 py-2 bg-background-secondary border border-panel-border rounded-lg text-white font-rajdhani focus:border-neon-blue focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Rank */}
              <div>
                <label className="block text-sm font-rajdhani text-gray-400 mb-2">RANK</label>
                <div className="flex gap-2">
                  {ranks.map((rank) => (
                    <motion.button
                      key={rank}
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setFormData({ ...formData, rank })}
                      className={`w-8 h-8 rounded font-orbitron text-sm border ${
                        formData.rank === rank
                          ? `${rankColors[rank]} bg-${rankColors[rank].split('-')[1]}-500/20`
                          : 'border-gray-500 text-gray-400 hover:border-gray-300'
                      }`}
                    >
                      {rank}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Type & Category */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-rajdhani text-gray-400 mb-2">TYPE</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3 py-2 bg-background-secondary border border-panel-border rounded-lg text-white font-rajdhani focus:border-neon-blue focus:outline-none"
                  >
                    {types.map((t) => (
                      <option key={t} value={t} className="bg-background-secondary">
                        {t.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-rajdhani text-gray-400 mb-2">CATEGORY</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-background-secondary border border-panel-border rounded-lg text-white font-rajdhani focus:border-neon-blue focus:outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c} className="bg-background-secondary">
                        {c.charAt(0).toUpperCase() + c.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Rewards & Duration */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-rajdhani text-gray-400 mb-2">EXP REWARD</label>
                  <input
                    type="number"
                    value={formData.reward}
                    onChange={(e) => setFormData({ ...formData, reward: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 bg-background-secondary border border-panel-border rounded-lg text-white font-rajdhani focus:border-neon-blue focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-rajdhani text-gray-400 mb-2">TIME (MIN)</label>
                  <input
                    type="number"
                    value={formData.estimatedMinutes}
                    onChange={(e) => setFormData({ ...formData, estimatedMinutes: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 bg-background-secondary border border-panel-border rounded-lg text-white font-rajdhani focus:border-neon-blue focus:outline-none"
                  />
                </div>
              </div>

              {/* Due Date */}
              {formData.type === 'emergency' && (
                <div>
                  <label className="block text-sm font-rajdhani text-gray-400 mb-2">DUE DATE</label>
                  <input
                    type="datetime-local"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    className="w-full px-4 py-2 bg-background-secondary border border-panel-border rounded-lg text-white font-rajdhani focus:border-neon-blue focus:outline-none"
                  />
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2 border border-panel-border text-gray-400 font-orbitron rounded-lg hover:border-gray-300 transition-colors"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-neon-blue to-neon-cyan text-black font-orbitron rounded-lg hover:shadow-lg hover:shadow-neon-blue/50 transition-all"
                >
                  CREATE QUEST
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
