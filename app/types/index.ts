// Quest/Rank types
export type QuestRank = 'E' | 'D' | 'C' | 'B' | 'A' | 'S';

export type QuestType = 'daily' | 'emergency' | 'weekly' | 'boss';

export type QuestStatus = 'active' | 'completed' | 'failed' | 'expired';

export interface Quest {
  id: string;
  title: string;
  description: string;
  rank: QuestRank;
  type: QuestType;
  status: QuestStatus;
  expReward: number;
  goldReward: number;
  manaStoneReward: number;
  estimatedMinutes?: number;
  tags: string[];
  dueDate?: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface DailyQuest extends Quest {
  type: 'daily';
  streakCount: number;
  lastCompletedAt?: Date;
}

export interface EmergencyQuest extends Quest {
  type: 'emergency';
  dueDate: Date;
}

// Hunter/Player types
export type HunterClass = 
  | 'E-Rank Hunter'
  | 'D-Rank Hunter'
  | 'C-Rank Hunter'
  | 'B-Rank Hunter'
  | 'A-Rank Hunter'
  | 'S-Rank Hunter'
  | 'Double Awakened'
  | 'Shadow Monarch';

export type HunterTitle = 
  | 'The Weakest Hunter'
  | 'Rising Hunter'
  | 'Elite Hunter'
  | 'National Hunter'
  | 'King Hunter'
  | 'Monarch of Shadows'
  | 'The One';

export interface HunterStats {
  strength: number;      // Physical habits
  intelligence: number;  // Learning/coding
  vitality: number;      // Sleep/exercise
  dexterity: number;     // Speed habits
  wisdom: number;        // Reflection/meditation
  luck: number;          // Lucky moments
  endurance: number;     // Stamina/persistence
  charisma: number;      // Social skills
  perception: number;    // Awareness/detail
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  level: number;
  maxLevel: number;
  currentExp: number;
  requiredExp: number;
  statBoosts: Partial<HunterStats>;
  cooldownMinutes: number;
  costManaStones: number;
}

export interface Equipment {
  id: string;
  name: string;
  type: 'weapon' | 'armor' | 'accessory' | 'ring';
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  level: number;
  statBoosts: Partial<HunterStats>;
  goldValue: number;
  equipped: boolean;
  maxDurability: number;
  currentDurability: number;
}

export interface Prestige {
  level: number;
  totalPrestigeExp: number;
  requiredExp: number;
  bonusMultiplier: number;
  unlockedPerks: string[];
}

export interface Hunter {
  id: string;
  name: string;
  level: number;
  class: HunterClass;
  title: HunterTitle;
  currentExp: number;
  requiredExp: number;
  totalExp: number;
  stats: HunterStats;
  statPoints: number;
  gold: number;
  manaStones: number;
  shadowArmyCount: number;
  currentStreak: number;
  longestStreak: number;
  fatigueLevel: number;
  maxFatigue: number;
  skills: Skill[];
  equipment: Equipment[];
  prestige: Prestige;
  totalDamage: number;
  totalDefense: number;
  totalHealPower: number;
  createdAt: Date;
  updatedAt: Date;
}

// User types
export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  hunter?: Hunter;
  createdAt: Date;
}

// Shop types
export type ShopItemType = 'theme' | 'avatar' | 'sound' | 'title';

export interface ShopItem {
  id: string;
  name: string;
  description: string;
  type: ShopItemType;
  cost: number;
  currency: 'gold' | 'manaStones';
  purchased: boolean;
  previewImage?: string;
}

// Notification types
export type NotificationType = 
  | 'quest_complete'
  | 'level_up'
  | 'streak_milestone'
  | 'reward_claimed'
  | 'fatigue_warning'
  | 'red_gate_available'
  | 'achievement_unlocked';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

// Stats for dashboard
export interface DashboardStats {
  questsCompletedToday: number;
  questsCompletedThisWeek: number;
  totalQuestsCompleted: number;
  currentStreak: number;
  expGainedToday: number;
  goldGainedToday: number;
  shadowArmyCount: number;
}

// Calendar heatmap data
export interface HeatmapData {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}
