'use client';

import { motion } from 'framer-motion';
import { useHunterStore } from '../store';
import { cn, formatNumber } from '../lib/utils';
import { Shield, Zap, Heart, Wind, Sparkles, Coins, Gem, Swords, Crown } from 'lucide-react';

export function StatusWindow() {
  const hunter = useHunterStore((state) => state.hunter);

  if (!hunter) return null;

  const expPercentage = (hunter.currentExp / hunter.requiredExp) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass-panel p-6 w-full max-w-md"
    >
      {/* Header with Hunter Name and Level */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-orbitron font-bold text-neon-blue neon-glow-text">
            {hunter.name}
          </h2>
          <p className="text-sm text-gray-400 font-rajdhani">{hunter.class}</p>
        </div>
        <div className="flex items-center gap-2">
          <Crown className="w-6 h-6 text-rank-s" />
          <span className="text-3xl font-orbitron font-bold text-white">
            LVL {hunter.level}
          </span>
        </div>
      </div>

      {/* Title */}
      <div className="mb-4">
        <span className="px-3 py-1 bg-neon-purple/20 border border-neon-purple rounded-full text-sm font-rajdhani text-neon-purple">
          {hunter.title}
        </span>
      </div>

      {/* EXP Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-400 font-rajdhani">EXP</span>
          <span className="text-neon-blue font-rajdhani">
            {formatNumber(hunter.currentExp)} / {formatNumber(hunter.requiredExp)}
          </span>
        </div>
        <div className="h-3 bg-background-tertiary rounded-full overflow-hidden border border-panel-border">
          <motion.div
            className="h-full bg-gradient-to-r from-neon-blue to-neon-cyan"
            initial={{ width: 0 }}
            animate={{ width: `${expPercentage}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-1 font-rajdhani">
          Total EXP: {formatNumber(hunter.totalExp)}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <StatItem
          icon={<Swords className="w-4 h-4" />}
          label="STR"
          value={hunter.stats.strength}
          color="text-rank-a"
        />
        <StatItem
          icon={<Sparkles className="w-4 h-4" />}
          label="INT"
          value={hunter.stats.intelligence}
          color="text-rank-b"
        />
        <StatItem
          icon={<Heart className="w-4 h-4" />}
          label="VIT"
          value={hunter.stats.vitality}
          color="text-rank-c"
        />
        <StatItem
          icon={<Wind className="w-4 h-4" />}
          label="DEX"
          value={hunter.stats.dexterity}
          color="text-rank-d"
        />
      </div>

      {/* Currency Row */}
      <div className="flex items-center justify-between pt-4 border-t border-panel-border">
        <div className="flex items-center gap-2">
          <Coins className="w-5 h-5 text-yellow-500" />
          <span className="font-orbitron text-yellow-500">{formatNumber(hunter.gold)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Gem className="w-5 h-5 text-neon-purple" />
          <span className="font-orbitron text-neon-purple">{formatNumber(hunter.manaStones)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-neon-cyan" />
          <span className="font-orbitron text-neon-cyan">{hunter.shadowArmyCount}</span>
        </div>
      </div>

      {/* Streak */}
      <div className="mt-4 pt-4 border-t border-panel-border">
        <div className="flex items-center justify-between">
          <span className="text-gray-400 font-rajdhani">Daily Streak</span>
          <span className="text-neon-blue font-orbitron">{hunter.currentStreak} days</span>
        </div>
        {hunter.fatigueLevel > 0 && (
          <div className="mt-2 flex items-center gap-2">
            <span className="text-neon-red text-sm font-rajdhani">Fatigue:</span>
            <div className="flex-1 h-2 bg-background-tertiary rounded-full overflow-hidden">
              <div
                className="h-full bg-neon-red"
                style={{ width: `${hunter.fatigueLevel * 10}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function StatItem({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="flex items-center gap-2 p-3 bg-background-secondary rounded-lg border border-panel-border">
      <div className={cn('p-1 rounded', color)}>{icon}</div>
      <div>
        <span className="text-xs text-gray-500 font-rajdhani">{label}</span>
        <div className={cn('text-lg font-orbitron font-bold', color)}>{value}</div>
      </div>
    </div>
  );
}
