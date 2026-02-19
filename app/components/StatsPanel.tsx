'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, BarChart3 } from 'lucide-react';

interface Stats {
  strength: number;
  intelligence: number;
  vitality: number;
  dexterity: number;
  wisdom: number;
  luck: number;
  endurance: number;
  charisma: number;
  perception: number;
}

interface StatsPanelProps {
  stats: Stats;
  statPoints: number;
  onStatIncrease: (stat: keyof Stats) => void;
  totalDamage: number;
  totalDefense: number;
  totalHealPower: number;
}

const statDescriptions: Record<keyof Stats, string> = {
  strength: 'Physical power - affects damage & quest rewards',
  intelligence: 'Mental capacity - improved learning quests',
  vitality: 'Health/stamina - extends quest duration',
  dexterity: 'Speed & agility - faster quest completion',
  wisdom: 'Judgment - reflects experience gain',
  luck: 'Fortune - affects item rarity & bonus rewards',
  endurance: 'Stamina - reduces fatigue from quests',
  charisma: 'Social charm - team quest bonuses',
  perception: 'Awareness - detects hidden rewards',
};

const statIcons: Record<keyof Stats, string> = {
  strength: '💪',
  intelligence: '🧠',
  vitality: '❤️',
  dexterity: '⚡',
  wisdom: '🔮',
  luck: '🍀',
  endurance: '🏃',
  charisma: '✨',
  perception: '👁️',
};

export default function StatsPanel({
  stats,
  statPoints,
  onStatIncrease,
  totalDamage,
  totalDefense,
  totalHealPower,
}: StatsPanelProps) {
  const [expandedStat, setExpandedStat] = useState<keyof Stats | null>(null);

  const statEntries = Object.entries(stats) as [keyof Stats, number][];

  return (
    <div className="w-full max-w-4xl">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Hunter Stats
          </h2>
          <div className="px-4 py-2 bg-blue-500/20 border border-blue-500 rounded-lg">
            <span className="text-blue-400 font-bold">Available Points: {statPoints}</span>
          </div>
        </div>

        {/* Combat Stats Overview */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg"
          >
            <div className="text-red-400 text-sm font-semibold mb-2">Damage</div>
            <div className="text-3xl font-bold text-red-500">{totalDamage}</div>
            <div className="text-xs text-red-400/70 mt-1">+STR +DEX +LCK</div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-4 bg-blue-500/10 border border-blue-500/50 rounded-lg"
          >
            <div className="text-blue-400 text-sm font-semibold mb-2">Defense</div>
            <div className="text-3xl font-bold text-blue-500">{totalDefense}</div>
            <div className="text-xs text-blue-400/70 mt-1">+VIT +END +ARM</div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-4 bg-green-500/10 border border-green-500/50 rounded-lg"
          >
            <div className="text-green-400 text-sm font-semibold mb-2">Heal Power</div>
            <div className="text-3xl font-bold text-green-500">{totalHealPower}</div>
            <div className="text-xs text-green-400/70 mt-1">+WIS +INT +VIT</div>
          </motion.div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {statEntries.map(([statName, value]) => (
          <motion.div
            key={statName}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg hover:border-purple-500/50 transition-all"
            onClick={() => setExpandedStat(expandedStat === statName ? null : statName)}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{statIcons[statName]}</span>
                <div>
                  <div className="font-bold text-white capitalize">{statName}</div>
                  <div className="text-xs text-gray-400">
                    {statDescriptions[statName]}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                  {value}
                </div>
              </div>
            </div>

            {/* Stat Bar */}
            <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden mb-3">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all"
                style={{ width: `${Math.min(value * 10, 100)}%` }}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => onStatIncrease(statName)}
                disabled={statPoints === 0}
                className={`flex-1 py-2 rounded font-semibold transition-all flex items-center justify-center gap-1 ${
                  statPoints > 0
                    ? 'bg-green-500/20 text-green-400 hover:bg-green-500/40 border border-green-500/50'
                    : 'bg-gray-500/20 text-gray-500 border border-gray-500/50 cursor-not-allowed'
                }`}
              >
                <Plus size={16} /> Add
              </button>

              {expandedStat === statName && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute mt-2 text-xs text-gray-300 bg-black/50 p-2 rounded"
                >
                  Points: {value}
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tips Section */}
      <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
        <div className="text-sm text-blue-300">
          <p className="font-semibold mb-2">💡 Stat Allocation Tips:</p>
          <ul className="text-xs space-y-1 text-blue-300/80">
            <li>• Every 5 levels: +2 stat points</li>
            <li>• Balanced stats are key - no stat should be 0</li>
            <li>• Higher stats = better quest success rates</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
