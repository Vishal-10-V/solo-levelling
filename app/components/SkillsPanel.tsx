'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Lock, TrendingUp, Clock } from 'lucide-react';

interface SkillData {
  id: string;
  name: string;
  description: string;
  level: number;
  maxLevel: number;
  currentExp: number;
  requiredExp: number;
  cooldownMinutes: number;
  costManaStones: number;
  icon: string;
}

interface SkillsPanelProps {
  skills: SkillData[];
  manaStones: number;
  onUpgradeSkill: (skillId: string) => void;
  onActivateSkill: (skillId: string) => void;
}

const skillColors: Record<string, string> = {
  'Mana Amplification': 'from-purple-500 to-indigo-500',
  'Shadow Clone': 'from-gray-600 to-gray-800',
  'Healing Light': 'from-green-500 to-emerald-500',
  'Berserk': 'from-red-500 to-orange-500',
  'Time Warp': 'from-cyan-500 to-blue-500',
  'Dual Wielding': 'from-yellow-500 to-orange-500',
};

export default function SkillsPanel({
  skills,
  manaStones,
  onUpgradeSkill,
  onActivateSkill,
}: SkillsPanelProps) {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  return (
    <div className="w-full max-w-4xl">
      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 mb-6">
        Hunter Skills
      </h2>

      {/* Mana Stones Counter */}
      <div className="mb-6 p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/50 rounded-lg">
        <div className="flex items-center gap-3">
          <Zap className="text-purple-400" size={24} />
          <div>
            <div className="text-purple-300 text-sm font-semibold">Mana Stones Available</div>
            <div className="text-3xl font-bold text-purple-400">{manaStones}</div>
          </div>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skills.map((skill) => (
          <motion.div
            key={skill.id}
            whileHover={{ scale: 1.02 }}
            className={`p-4 bg-gradient-to-br ${skillColors[skill.name] || 'from-slate-700 to-slate-800'}/20 border border-${skillColors[skill.name] || 'slate-700'}/50 rounded-lg cursor-pointer transition-all`}
            onClick={() => setSelectedSkill(selectedSkill === skill.id ? null : skill.id)}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-lg font-bold text-white">{skill.name}</h3>
                <p className="text-xs text-gray-300 mt-1">{skill.description}</p>
              </div>
              <span className="text-2xl">⚔️</span>
            </div>

            {/* Level Bar */}
            <div className="mb-3">
              <div className="flex justify-between mb-1">
                <span className="text-xs font-semibold text-gray-300">Level {skill.level}</span>
                <span className="text-xs text-gray-400">{skill.currentExp}/{skill.requiredExp}</span>
              </div>
              <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${(skill.currentExp / skill.requiredExp) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Skill Stats */}
            <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
              <div className="bg-black/30 p-2 rounded">
                <Clock size={14} className="inline mr-1 text-gray-400" />
                <span className="text-gray-300">{skill.cooldownMinutes}min cooldown</span>
              </div>
              <div className="bg-black/30 p-2 rounded">
                <Zap size={14} className="inline mr-1 text-purple-400" />
                <span className="text-purple-300">{skill.costManaStones} mana</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => onActivateSkill(skill.id)}
                disabled={manaStones < skill.costManaStones}
                className={`flex-1 py-2 rounded font-semibold transition-all ${
                  manaStones >= skill.costManaStones
                    ? 'bg-cyan-500/30 text-cyan-300 hover:bg-cyan-500/50 border border-cyan-500/50'
                    : 'bg-gray-500/20 text-gray-500 border border-gray-500/50 cursor-not-allowed'
                }`}
              >
                Activate
              </button>
              <button
                onClick={() => onUpgradeSkill(skill.id)}
                disabled={skill.level >= skill.maxLevel || skill.currentExp < skill.requiredExp}
                className={`flex-1 py-2 rounded font-semibold transition-all flex items-center justify-center gap-1 ${
                  skill.level < skill.maxLevel && skill.currentExp >= skill.requiredExp
                    ? 'bg-green-500/30 text-green-300 hover:bg-green-500/50 border border-green-500/50'
                    : 'bg-gray-500/20 text-gray-500 border border-gray-500/50 cursor-not-allowed'
                }`}
              >
                <TrendingUp size={14} /> Level Up
              </button>
            </div>

            {/* Max Level Indicator */}
            {skill.level >= skill.maxLevel && (
              <div className="mt-3 text-center text-sm font-bold text-yellow-400">
                ⭐ Max Level Reached
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Locked Skills Info */}
      <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
        <div className="flex items-start gap-3">
          <Lock className="text-amber-400 mt-1 flex-shrink-0" size={20} />
          <div className="text-sm">
            <p className="font-semibold text-amber-300 mb-2">New Skills Available at:</p>
            <ul className="text-xs text-amber-300/80 space-y-1">
              <li>• Level 10: Shadow Clones x2</li>
              <li>• Level 25: Time Dimension</li>
              <li>• Level 50: Shadow Extraction</li>
              <li>• Level 100: Rulers Authority</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
