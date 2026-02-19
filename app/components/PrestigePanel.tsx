'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, Star, Zap, TrendingUp, Lock } from 'lucide-react';

interface PrestigeData {
  level: number;
  totalPrestigeExp: number;
  requiredExp: number;
  bonusMultiplier: number;
  unlockedPerks: string[];
}

interface PrestigePanelProps {
  prestige: PrestigeData;
  hunterLevel: number;
  totalExp: number;
  onPrestige: () => void;
}

const availablePerks = [
  { level: 1, name: '10% EXP Boost', icon: '📈' },
  { level: 1, name: '+2 Stat Points per level', icon: '💪' },
  { level: 2, name: '15% Gold Bonus', icon: '💰' },
  { level: 2, name: 'Rare Equipment Chance', icon: '✨' },
  { level: 3, name: '25% EXP Boost', icon: '🚀' },
  { level: 3, name: '+1 Max Skill Slot', icon: '⚔️' },
  { level: 4, name: '50% EXP Boost', icon: '⭐' },
  { level: 4, name: 'Legendary Equipment Unlock', icon: '👑' },
  { level: 5, name: '100% EXP Boost', icon: '🌟' },
  { level: 5, name: 'Shadow Monarch Authority (Ultimate)', icon: '🔱' },
];

export default function PrestigePanel({
  prestige,
  hunterLevel,
  totalExp,
  onPrestige,
}: PrestigePanelProps) {
  const [showPrestigeWarning, setShowPrestigeWarning] = useState(false);
  const canPrestige = hunterLevel >= 50;

  return (
    <div className="w-full max-w-4xl">
      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-600 mb-6 flex items-center gap-2">
        <Crown size={28} />
        Prestige System
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Current Prestige Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/50 rounded-lg"
        >
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold text-yellow-300">Prestige Level</h3>
              <div className="text-4xl font-bold text-yellow-400">{prestige.level}</div>
            </div>
            <p className="text-sm text-yellow-300/70">Total Resets: {prestige.level}</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-xs font-semibold text-yellow-300">Progress</span>
              <span className="text-xs text-yellow-400">
                {prestige.totalPrestigeExp}/{prestige.requiredExp}
              </span>
            </div>
            <motion.div
              className="w-full h-3 bg-slate-700 rounded-full overflow-hidden"
              initial={{ background: '#334155' }}
              animate={{ background: 'linear-gradient(90deg, #fbbf24, #f97316)' }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                initial={{ width: 0 }}
                animate={{
                  width: `${Math.min(
                    (prestige.totalPrestigeExp / prestige.requiredExp) * 100,
                    100
                  )}%`,
                }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
          </div>

          {/* Bonus Multiplier */}
          <div className="bg-black/30 p-3 rounded-lg mb-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="text-orange-400" size={18} />
              <span className="text-sm font-bold text-orange-300">EXP Multiplier</span>
            </div>
            <div className="text-3xl font-bold text-orange-400">
              {prestige.bonusMultiplier}x
            </div>
            <p className="text-xs text-orange-300/70 mt-1">
              All future EXP gains increased by {(prestige.bonusMultiplier - 1) * 100}%
            </p>
          </div>

          {/* Prestige Button */}
          <motion.button
            whileHover={canPrestige ? { scale: 1.05 } : {}}
            onClick={() => canPrestige && setShowPrestigeWarning(true)}
            disabled={!canPrestige}
            className={`w-full py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2 text-lg ${
              canPrestige
                ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:shadow-lg hover:shadow-orange-500/50'
                : 'bg-gray-500/20 text-gray-500 border border-gray-500/50 cursor-not-allowed'
            }`}
          >
            <Crown size={20} />
            {!canPrestige ? `Reach Level 50 (${hunterLevel}/50)` : 'PRESTIGE NOW'}
          </motion.button>

          {!canPrestige && (
            <p className="text-xs text-gray-400 text-center mt-3">
              {50 - hunterLevel} more levels to unlock prestige
            </p>
          )}
        </motion.div>

        {/* Prestige Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/50 rounded-lg"
        >
          <h3 className="text-lg font-bold text-purple-300 mb-4 flex items-center gap-2">
            <Star size={20} />
            Prestige Benefits
          </h3>

          <div className="space-y-2">
            <div className="p-3 bg-black/30 rounded-lg">
              <p className="text-sm font-semibold text-purple-300">Reset Level to 1</p>
              <p className="text-xs text-purple-300/70">Keep all stats, items, and progress</p>
            </div>

            <div className="p-3 bg-black/30 rounded-lg">
              <p className="text-sm font-semibold text-purple-300">Increase EXP Multiplier</p>
              <p className="text-xs text-purple-300/70">
                +{(prestige.bonusMultiplier > 1
                  ? prestige.bonusMultiplier + 0.5
                  : 1.5)}x (next prestige)
              </p>
            </div>

            <div className="p-3 bg-black/30 rounded-lg">
              <p className="text-sm font-semibold text-purple-300">Unlock Prestige Perks</p>
              <p className="text-xs text-purple-300/70">Permanent bonuses based on prestige level</p>
            </div>

            <div className="p-3 bg-black/30 rounded-lg">
              <p className="text-sm font-semibold text-purple-300">New Title Available</p>
              <p className="text-xs text-purple-300/70">
                Increase standing in the hunter world
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Unlocked Perks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6"
      >
        <h3 className="text-lg font-bold text-white mb-4">Active Perks</h3>
        {prestige.unlockedPerks.length === 0 ? (
          <div className="p-4 bg-slate-800/50 border border-dashed border-slate-600 rounded-lg text-center text-slate-400 text-sm">
            Prestige to unlock powerful perks!
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {prestige.unlockedPerks.map((perk, idx) => (
              <motion.div
                key={idx}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="p-3 bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/50 rounded-lg text-center"
              >
                <p className="text-sm font-bold text-green-300">{perk}</p>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Available Perks by Level */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-lg"
      >
        <h3 className="text-lg font-bold text-blue-300 mb-4 flex items-center gap-2">
          <Zap size={20} />
          Available Perks
        </h3>

        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((level) => {
            const perksForLevel = availablePerks.filter((p) => p.level === level);
            const isUnlocked = prestige.level >= level;

            return (
              <div
                key={level}
                className={`p-4 rounded-lg border ${
                  isUnlocked
                    ? 'bg-green-500/10 border-green-500/30'
                    : 'bg-gray-500/10 border-gray-500/30 opacity-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm">
                    {isUnlocked ? '✓' : '🔒'} Prestige Level {level}
                  </span>
                  {!isUnlocked && (
                    <Lock className="text-gray-400" size={16} />
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {perksForLevel.map((perk, idx) => (
                    <div
                      key={idx}
                      className={`p-2 rounded text-xs font-semibold ${
                        isUnlocked
                          ? 'bg-green-500/20 text-green-300'
                          : 'bg-gray-500/20 text-gray-400'
                      }`}
                    >
                      {perk.icon} {perk.name}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Prestige Warning Modal */}
      {showPrestigeWarning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setShowPrestigeWarning(false)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-gradient-to-br from-orange-900 to-red-900 border-2 border-orange-500 rounded-lg p-8 max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-orange-300 mb-4 flex items-center gap-2">
              <Crown size={24} />
              Prestige Confirmation
            </h2>

            <p className="text-sm text-gray-200 mb-4">
              You are about to prestige and reset your hunter back to Level 1. You will keep:
            </p>

            <ul className="text-sm text-green-300 mb-6 space-y-1">
              <li>✓ All items and equipment</li>
              <li>✓ All stats and skills</li>
              <li>✓ Shadow army progression</li>
              <li>✓ {(prestige.bonusMultiplier + 0.5).toFixed(1)}x EXP Multiplier (new)</li>
            </ul>

            <div className="bg-red-900/50 border border-red-500 rounded p-3 mb-6 text-xs text-red-300">
              ⚠️ Your current level {hunterLevel} and quests will be recorded in prestige stats.
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowPrestigeWarning(false)}
                className="flex-1 py-3 bg-slate-600 hover:bg-slate-700 text-white rounded-lg font-bold transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onPrestige();
                  setShowPrestigeWarning(false);
                }}
                className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-lg font-bold transition-all"
              >
                PRESTIGE!
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
