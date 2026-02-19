import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Hunter, Quest, Notification, DashboardStats, QuestRank } from '../types';

// Helper to calculate EXP required for next level
const calculateRequiredExp = (level: number): number => {
  return Math.floor(100 * Math.pow(1.5, level - 1));
};

// Helper to get exp reward based on rank
const getExpReward = (rank: QuestRank): number => {
  const rewards: Record<QuestRank, number> = {
    E: 10,
    D: 25,
    C: 50,
    B: 100,
    A: 200,
    S: 500,
  };
  return rewards[rank];
};

// Helper to get gold reward based on rank
const getGoldReward = (rank: QuestRank): number => {
  const rewards: Record<QuestRank, number> = {
    E: 5,
    D: 15,
    C: 30,
    B: 60,
    A: 120,
    S: 300,
  };
  return rewards[rank];
};

// Helper to get mana stone reward based on rank
const getManaStoneReward = (rank: QuestRank): number => {
  const rewards: Record<QuestRank, number> = {
    E: 1,
    D: 2,
    C: 5,
    B: 10,
    A: 25,
    S: 50,
  };
  return rewards[rank];
};

interface HunterStore {
  // Hunter state
  hunter: Hunter | null;
  
  // Quests
  quests: Quest[];
  
  // Notifications
  notifications: Notification[];
  
  // Dashboard stats
  stats: DashboardStats;
  
  // Sound settings
  soundEnabled: boolean;
  
  // Actions
  initializeHunter: (name: string) => void;
  addQuest: (quest: Omit<Quest, 'id' | 'createdAt' | 'updatedAt' | 'expReward' | 'goldReward' | 'manaStoneReward'>) => void;
  completeQuest: (questId: string) => { leveledUp: boolean; newLevel?: number };
  failQuest: (questId: string) => void;
  deleteQuest: (questId: string) => void;
  toggleSound: () => void;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => void;
  markNotificationRead: (notificationId: string) => void;
  clearNotifications: () => void;
}

export const useHunterStore = create<HunterStore>()(
  persist(
    (set, get) => ({
      hunter: null,
      quests: [],
      notifications: [],
      soundEnabled: true,
      stats: {
        questsCompletedToday: 0,
        questsCompletedThisWeek: 0,
        totalQuestsCompleted: 0,
        currentStreak: 0,
        expGainedToday: 0,
        goldGainedToday: 0,
        shadowArmyCount: 0,
      },

      initializeHunter: (name: string) => {
        const newHunter: Hunter = {
          id: crypto.randomUUID(),
          name,
          level: 1,
          class: 'E-Rank Hunter',
          title: 'The Weakest Hunter',
          currentExp: 0,
          requiredExp: calculateRequiredExp(1),
          totalExp: 0,
          stats: {
            strength: 5,
            intelligence: 5,
            vitality: 5,
            dexterity: 5,
            wisdom: 5,
          },
          gold: 0,
          manaStones: 0,
          shadowArmyCount: 0,
          currentStreak: 0,
          longestStreak: 0,
          fatigueLevel: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        set({ hunter: newHunter });
        
        // Add welcome notification
        get().addNotification({
          type: 'level_up',
          title: 'Awakening Complete',
          message: 'Welcome, Hunter. Your journey begins now.',
        });
      },

      addQuest: (questData) => {
        const newQuest: Quest = {
          ...questData,
          id: crypto.randomUUID(),
          expReward: getExpReward(questData.rank),
          goldReward: getGoldReward(questData.rank),
          manaStoneReward: getManaStoneReward(questData.rank),
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        set((state) => ({
          quests: [...state.quests, newQuest],
        }));
      },

      completeQuest: (questId) => {
        const state = get();
        const quest = state.quests.find((q) => q.id === questId);
        
        if (!quest || !state.hunter) return { leveledUp: false };

        const newExp = state.hunter.currentExp + quest.expReward;
        const newGold = state.hunter.gold + quest.goldReward;
        const newManaStones = state.hunter.manaStones + quest.manaStoneReward;
        let newLevel = state.hunter.level;
        let requiredExp = state.hunter.requiredExp;
        let leveledUp = false;

        // Check for level up
        if (newExp >= requiredExp) {
          newLevel += 1;
          requiredExp = calculateRequiredExp(newLevel);
          leveledUp = true;
          
          // Update class and title based on level
          let newClass = state.hunter.class;
          let newTitle = state.hunter.title;
          
          if (newLevel >= 50) {
            newClass = 'Shadow Monarch';
            newTitle = 'Monarch of Shadows';
          } else if (newLevel >= 40) {
            newClass = 'S-Rank Hunter';
            newTitle = 'King Hunter';
          } else if (newLevel >= 30) {
            newClass = 'A-Rank Hunter';
            newTitle = 'National Hunter';
          } else if (newLevel >= 20) {
            newClass = 'B-Rank Hunter';
            newTitle = 'Elite Hunter';
          } else if (newLevel >= 10) {
            newClass = 'C-Rank Hunter';
            newTitle = 'Rising Hunter';
          } else if (newLevel >= 5) {
            newClass = 'D-Rank Hunter';
          }

          set((state) => ({
            hunter: {
              ...state.hunter!,
              level: newLevel,
              class: newClass,
              title: newTitle,
              currentExp: newExp - requiredExp,
              requiredExp,
              totalExp: state.hunter.totalExp + quest.expReward,
              gold: newGold,
              manaStones: newManaStones,
              updatedAt: new Date(),
            },
            quests: state.quests.map((q) =>
              q.id === questId ? { ...q, status: 'completed' as const, completedAt: new Date() } : q
            ),
            stats: {
              ...state.stats,
              questsCompletedToday: state.stats.questsCompletedToday + 1,
              questsCompletedThisWeek: state.stats.questsCompletedThisWeek + 1,
              totalQuestsCompleted: state.stats.totalQuestsCompleted + 1,
              expGainedToday: state.stats.expGainedToday + quest.expReward,
              goldGainedToday: state.stats.goldGainedToday + quest.goldReward,
            },
          }));

          // Add level up notification
          get().addNotification({
            type: 'level_up',
            title: 'LEVEL UP!',
            message: `Congratulations! You have reached level ${newLevel}!`,
          });

          return { leveledUp: true, newLevel };
        }

        // Regular level up without quest completion
        set((state) => ({
          hunter: {
            ...state.hunter!,
            currentExp: newExp,
            totalExp: state.hunter.totalExp + quest.expReward,
            gold: newGold,
            manaStones: newManaStones,
            updatedAt: new Date(),
          },
          quests: state.quests.map((q) =>
            q.id === questId ? { ...q, status: 'completed' as const, completedAt: new Date() } : q
          ),
          stats: {
            ...state.stats,
            questsCompletedToday: state.stats.questsCompletedToday + 1,
            questsCompletedThisWeek: state.stats.questsCompletedThisWeek + 1,
            totalQuestsCompleted: state.stats.totalQuestsCompleted + 1,
            expGainedToday: state.stats.expGainedToday + quest.expReward,
            goldGainedToday: state.stats.goldGainedToday + quest.goldReward,
          },
        }));

        // Add quest complete notification
        get().addNotification({
          type: 'quest_complete',
          title: 'Quest Complete!',
          message: `+${quest.expReward} EXP, +${quest.goldReward} Gold`,
        });

        return { leveledUp: false };
      },

      failQuest: (questId) => {
        set((state) => ({
          quests: state.quests.map((q) =>
            q.id === questId ? { ...q, status: 'failed' as const } : q
          ),
          hunter: state.hunter
            ? {
                ...state.hunter,
                fatigueLevel: Math.min(state.hunter.fatigueLevel + 1, 10),
                currentStreak: 0,
                updatedAt: new Date(),
              }
            : null,
        }));
      },

      deleteQuest: (questId) => {
        set((state) => ({
          quests: state.quests.filter((q) => q.id !== questId),
        }));
      },

      toggleSound: () => {
        set((state) => ({ soundEnabled: !state.soundEnabled }));
      },

      addNotification: (notificationData) => {
        const newNotification: Notification = {
          ...notificationData,
          id: crypto.randomUUID(),
          read: false,
          createdAt: new Date(),
        };

        set((state) => ({
          notifications: [newNotification, ...state.notifications].slice(0, 50),
        }));
      },

      markNotificationRead: (notificationId) => {
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === notificationId ? { ...n, read: true } : n
          ),
        }));
      },

      clearNotifications: () => {
        set({ notifications: [] });
      },
    }),
    {
      name: 'hunters-ascent-storage',
    }
  )
);
