'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Sword, Gem, Shirt, Trash2, Info } from 'lucide-react';

interface EquipmentItem {
  id: string;
  name: string;
  type: 'weapon' | 'armor' | 'accessory' | 'ring';
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  level: number;
  equipped: boolean;
  maxDurability: number;
  currentDurability: number;
  statBoosts: Record<string, number>;
  goldValue: number;
}

interface EquipmentPanelProps {
  equipment: EquipmentItem[];
  gold: number;
  onEquip: (equipmentId: string) => void;
  onUnequip: (equipmentId: string) => void;
  onRepair: (equipmentId: string) => void;
  onSell: (equipmentId: string) => void;
}

const rarityColors: Record<string, string> = {
  common: 'text-gray-400 border-gray-500',
  uncommon: 'text-green-400 border-green-500',
  rare: 'text-blue-400 border-blue-500',
  epic: 'text-purple-400 border-purple-500',
  legendary: 'text-yellow-400 border-yellow-500',
};

const rarityBg: Record<string, string> = {
  common: 'bg-gray-500/10',
  uncommon: 'bg-green-500/10',
  rare: 'bg-blue-500/10',
  epic: 'bg-purple-500/10',
  legendary: 'bg-yellow-500/10',
};

const typeIcons: Record<string, React.ReactNode> = {
  weapon: <Sword size={20} />,
  armor: <Shirt size={20} />,
  accessory: <Shield size={20} />,
  ring: <Gem size={20} />,
};

export default function EquipmentPanel({
  equipment,
  gold,
  onEquip,
  onUnequip,
  onRepair,
  onSell,
}: EquipmentPanelProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const equipped = equipment.filter((e) => e.equipped);
  const inventory = equipment.filter((e) => !e.equipped);

  return (
    <div className="w-full max-w-4xl">
      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-600 mb-6">
        Equipment & Inventory
      </h2>

      {/* Gold Counter */}
      <div className="mb-6 p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/50 rounded-lg flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-4xl">💰</span>
          <div>
            <div className="text-yellow-300 text-sm font-semibold">Gold Balance</div>
            <div className="text-3xl font-bold text-yellow-400">{gold}</div>
          </div>
        </div>
        <div className="text-right text-sm text-yellow-300/70">
          Spend to upgrade & repair
        </div>
      </div>

      {/* Equipped Items */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Shield size={20} className="text-orange-400" />
          Currently Equipped ({equipped.length})
        </h3>

        {equipped.length === 0 ? (
          <div className="p-6 bg-slate-800/50 border border-dashed border-slate-600 rounded-lg text-center text-slate-400">
            No equipment equipped yet. Equip items from your inventory!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {equipped.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.02 }}
                className={`p-4 ${rarityBg[item.rarity]} border ${rarityColors[item.rarity]} rounded-lg`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{typeIcons[item.type]}</span>
                    <div>
                      <h4 className="font-bold">{item.name}</h4>
                      <p className="text-xs opacity-75">Lvl {item.level}</p>
                    </div>
                  </div>
                  <span className={`text-sm font-bold capitalize px-2 py-1 rounded ${rarityColors[item.rarity]} bg-black/30`}>
                    {item.rarity}
                  </span>
                </div>

                {/* Durability */}
                <div className="mb-3">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-gray-300">Durability</span>
                    <span className="text-xs text-gray-400">{item.currentDurability}/{item.maxDurability}</span>
                  </div>
                  <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${
                        item.currentDurability > item.maxDurability * 0.5
                          ? 'bg-green-500'
                          : 'bg-yellow-500'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.currentDurability / item.maxDurability) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                {/* Stat Boosts */}
                <div className="mb-3 text-xs">
                  {Object.entries(item.statBoosts).map(([stat, boost]) => (
                    <div key={stat} className="text-green-400">
                      +{boost} {stat}
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => onUnequip(item.id)}
                    className="flex-1 py-2 bg-orange-500/20 hover:bg-orange-500/40 text-orange-300 border border-orange-500/50 rounded font-semibold transition-all text-sm"
                  >
                    Unequip
                  </button>
                  <button
                    onClick={() => onRepair(item.id)}
                    disabled={item.currentDurability === item.maxDurability}
                    className={`flex-1 py-2 rounded font-semibold transition-all text-sm ${
                      item.currentDurability < item.maxDurability
                        ? 'bg-blue-500/20 hover:bg-blue-500/40 text-blue-300 border border-blue-500/50'
                        : 'bg-gray-500/20 text-gray-500 border border-gray-500/50 cursor-not-allowed'
                    }`}
                  >
                    Repair
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Inventory */}
      <div>
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Shirt size={20} className="text-blue-400" />
          Inventory ({inventory.length})
        </h3>

        {inventory.length === 0 ? (
          <div className="p-6 bg-slate-800/50 border border-dashed border-slate-600 rounded-lg text-center text-slate-400">
            Your inventory is empty. Complete quests to find new equipment!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {inventory.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.05 }}
                className={`p-3 ${rarityBg[item.rarity]} border ${rarityColors[item.rarity]} rounded-lg cursor-pointer transition-all`}
                onClick={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xl">{typeIcons[item.type]}</span>
                  <span className={`text-xs font-bold capitalize px-2 py-0.5 rounded ${rarityColors[item.rarity]} bg-black/30`}>
                    {item.rarity}
                  </span>
                </div>

                <h4 className="font-bold text-sm mb-1">{item.name}</h4>
                <p className="text-xs opacity-75 mb-2">Lvl {item.level}</p>

                {/* Quick Stats */}
                <div className="text-xs mb-2">
                  {Object.entries(item.statBoosts).slice(0, 2).map(([stat, boost]) => (
                    <div key={stat} className="text-green-400">
                      +{boost} {stat}
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => onEquip(item.id)}
                    className="flex-1 py-1.5 bg-green-500/20 hover:bg-green-500/40 text-green-300 border border-green-500/50 rounded text-xs font-semibold transition-all"
                  >
                    Equip
                  </button>
                  <button
                    onClick={() => onSell(item.id)}
                    className="py-1.5 px-3 bg-red-500/20 hover:bg-red-500/40 text-red-300 border border-red-500/50 rounded text-xs font-semibold transition-all"
                    title={`Sell for ${item.goldValue} gold`}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Equipment Tips */}
      <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
        <div className="flex items-start gap-3">
          <Info className="text-blue-400 mt-1 flex-shrink-0" size={20} />
          <div className="text-sm">
            <p className="font-semibold text-blue-300 mb-2">⚙️ Equipment Guide</p>
            <ul className="text-xs text-blue-300/80 space-y-1">
              <li>• Equip gear to boost your stats permanently</li>
              <li>• Durability decreases with quest activity</li>
              <li>• Repair gear using Gold from quest rewards</li>
              <li>• Legendary items grant massive stat boosts</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
