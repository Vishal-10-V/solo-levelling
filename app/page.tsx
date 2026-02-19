'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Filter, BarChart3 } from 'lucide-react';
import QuestModal from './components/QuestModal';
import Calendar from './components/Calendar';
import AdvancedStats from './components/AdvancedStats';
import ProgressChart from './components/ProgressChart';
import AdvancedQuestCard from './components/AdvancedQuestCard';
import NotificationCenter, { Notification } from './components/NotificationCenter';

interface Quest {
  id: string;
  title: string;
  description?: string;
  rank: string;
  status: string;
  expReward: number;
  goldReward: number;
  category?: string;
  type?: string;
  estimatedMinutes?: number;
  completedAt?: string;
  createdAt: string;
}

const rankColors: Record<string, string> = {
  E: 'border-gray-400 text-gray-400',
  D: 'border-green-500 text-green-500',
  C: 'border-blue-500 text-blue-500',
  B: 'border-purple-500 text-purple-500',
  A: 'border-yellow-500 text-yellow-500',
  S: 'border-red-500 text-red-500',
};

const rankBg: Record<string, string> = {
  E: 'bg-gray-500/20',
  D: 'bg-green-500/20',
  C: 'bg-blue-500/20',
  B: 'bg-purple-500/20',
  A: 'bg-yellow-500/20',
  S: 'bg-red-500/20',
};

export default function Home() {
  const [hunterName, setHunterName] = useState('');
  const [initialized, setInitialized] = useState(false);
  const [level, setLevel] = useState(1);
  const [currentExp, setCurrentExp] = useState(0);
  const [requiredExp, setRequiredExp] = useState(100);
  const [gold, setGold] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [hunterStats, setHunterStats] = useState({ strength: 5, intelligence: 5, vitality: 5, dexterity: 5 });
  const [quests, setQuests] = useState<Quest[]>([
    { id: '1', title: 'Morning Training', description: 'Start with 30 mins of exercise', rank: 'E', status: 'active', expReward: 10, goldReward: 5, category: 'exercise', type: 'daily', estimatedMinutes: 30, createdAt: new Date().toISOString() },
    { id: '2', title: 'Complete Project Task', description: 'Finish priority tasks', rank: 'C', status: 'active', expReward: 50, goldReward: 30, category: 'work', type: 'daily', estimatedMinutes: 120, createdAt: new Date().toISOString() },
    { id: '3', title: 'Read Solo Leveling Chapter', description: 'Read before bed', rank: 'D', status: 'completed', expReward: 25, goldReward: 15, category: 'learning', type: 'daily', estimatedMinutes: 45, completedAt: new Date().toISOString(), createdAt: new Date().toISOString() },
  ]);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [newLevel, setNewLevel] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [weeklyData, setWeeklyData] = useState([3, 5, 2, 6, 4, 7, 3]);
  const [completedDates, setCompletedDates] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'calendar' | 'stats'>('list');


  useEffect(() => {
    const saved = localStorage.getItem('hunter_data');
    if (saved) {
      const data = JSON.parse(saved);
      setHunterName(data.name || '');
      setLevel(data.level || 1);
      setCurrentExp(data.currentExp || 0);
      setRequiredExp(data.requiredExp || 100);
      setGold(data.gold || 0);
      setCurrentStreak(data.currentStreak || 0);
      setLongestStreak(data.longestStreak || 0);
      setHunterStats(data.stats || { strength: 5, intelligence: 5, vitality: 5, dexterity: 5 });
      setQuests(data.quests || quests);
      setCompletedDates(data.completedDates || []);
      setInitialized(true);
    }
  }, []);

  const saveData = (name: string, lvl: number, exp: number, req: number, g: number, streak: number, longest: number, stats: typeof hunterStats, q: Quest[], dates: string[]) => {
    localStorage.setItem('hunter_data', JSON.stringify({
      name,
      level: lvl,
      currentExp: exp,
      requiredExp: req,
      gold: g,
      currentStreak: streak,
      longestStreak: longest,
      stats,
      quests: q,
      completedDates: dates,
    }));
  };

  const addNotification = (type: 'success' | 'error' | 'info', title: string, message?: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    setNotifications((prev) => [...prev, { id, type, title, message }]);
  };

  const handleStart = () => {
    if (hunterName.trim()) {
      saveData(hunterName, 1, 0, 100, 0, 0, 0, hunterStats, quests, completedDates);
      setInitialized(true);
      addNotification('success', 'JOURNEY BEGINS', `Welcome, ${hunterName}!`);
    }
  };

  const getRankExp = (rank: string): number => {
    const multipliers: Record<string, number> = { E: 10, D: 25, C: 50, B: 100, A: 200, S: 500 };
    return multipliers[rank] || 10;
  };

  const completeQuest = (id: string) => {
    const questIndex = quests.findIndex((q) => q.id === id);
    if (questIndex === -1 || quests[questIndex].status === 'completed') return;

    const quest = quests[questIndex];
    const expGained = getRankExp(quest.rank);

    let newTotal = currentExp + expGained;
    let newLevelNum = level;
    let newRequired = requiredExp;
    let newStreak = currentStreak + 1;
    let newLongest = Math.max(longestStreak, newStreak);

    while (newTotal >= newRequired) {
      newTotal -= newRequired;
      newLevelNum++;
      newRequired = Math.floor(100 * Math.pow(1.5, newLevelNum - 1));
    }

    // Increase stats based on category
    let newStats = { ...hunterStats };
    if (quest.category === 'exercise') newStats.strength += 1;
    if (quest.category === 'learning') newStats.intelligence += 1;
    if (quest.category === 'health') newStats.vitality += 1;
    if (quest.category === 'work') newStats.dexterity += 1;

    setCurrentExp(newTotal);
    setRequiredExp(newRequired);
    setGold(gold + quest.goldReward);
    setCurrentStreak(newStreak);
    setLongestStreak(newLongest);
    setHunterStats(newStats);

    const today = new Date().toISOString().split('T')[0];
    if (!completedDates.includes(today)) {
      setCompletedDates([...completedDates, today]);
    }

    if (newLevelNum > level) {
      setNewLevel(newLevelNum);
      setShowLevelUp(true);
      addNotification('success', 'LEVEL UP!', `You reached Level ${newLevelNum}!`);
      setTimeout(() => setShowLevelUp(false), 3000);
    }

    setLevel(newLevelNum);

    const updated = [...quests];
    updated[questIndex] = { ...quest, status: 'completed', completedAt: new Date().toISOString() };
    setQuests(updated);

    addNotification('success', 'QUEST COMPLETED', `+${expGained} EXP Earned!`);

    saveData(hunterName, newLevelNum, newTotal, newRequired, gold + quest.goldReward, newStreak, newLongest, newStats, updated, completedDates);
  };

  const deleteQuest = (id: string) => {
    const quest = quests.find((q) => q.id === id);
    if (quest) {
      setQuests(quests.filter((q) => q.id !== id));
      addNotification('info', 'QUEST REMOVED', `${quest.title} has been removed`);
      saveData(hunterName, level, currentExp, requiredExp, gold, currentStreak, longestStreak, hunterStats, quests.filter((q) => q.id !== id), completedDates);
    }
  };

  const addQuest = (questData: any) => {
    const newQuest: Quest = {
      id: Math.random().toString(36).substr(2, 9),
      title: questData.title,
      description: questData.description,
      rank: questData.rank,
      status: 'active',
      expReward: questData.reward,
      goldReward: Math.floor(questData.reward * 0.6),
      category: questData.category,
      type: questData.type,
      estimatedMinutes: questData.estimatedMinutes,
      createdAt: new Date().toISOString(),
    };

    const updated = [newQuest, ...quests];
    setQuests(updated);
    addNotification('success', 'NEW QUEST CREATED', `${questData.title} added to your quests!`);
    saveData(hunterName, level, currentExp, requiredExp, gold, currentStreak, longestStreak, hunterStats, updated, completedDates);
  };

  const filteredQuests = quests.filter((q) => {
    if (selectedFilter === 'active') return q.status === 'active';
    if (selectedFilter === 'completed') return q.status === 'completed';
    return true;
  });

  if (!initialized) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-8 max-w-md w-full text-center rounded-xl"
        >
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <h1 className="text-3xl font-orbitron text-neon-blue mb-2 neon-glow-text">HUNTER'S ASCENT</h1>
          </motion.div>
          <p className="text-gray-400 font-rajdhani mb-6">Awaken Your Potential • Solo Leveling System</p>

          <input
            type="text"
            placeholder="Enter your hunter name..."
            value={hunterName}
            onChange={(e) => setHunterName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleStart()}
            className="input-field mb-6 w-full"
          />

          <button
            onClick={handleStart}
            disabled={!hunterName.trim()}
            className={`btn-primary w-full ${!hunterName.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            BEGIN JOURNEY
          </button>
        </motion.div>
      </div>
    );
  }

  const expPercent = (currentExp / requiredExp) * 100;
  const activeQuestCount = quests.filter((q) => q.status === 'active').length;
  const completedQuestCount = quests.filter((q) => q.status === 'completed').length;

  return (
    <div className="min-h-screen bg-black p-4 md:p-8">
      <NotificationCenter
        notifications={notifications}
        onDismiss={(id) => setNotifications((prev) => prev.filter((n) => n.id !== id))}
      />

      <AnimatePresence>
        {showLevelUp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1.2, rotate: 0 }}
              exit={{ scale: 0.5 }}
              className="text-center"
            >
              <motion.div
                animate={{
                  textShadow: ['0 0 20px #9d4edd', '0 0 60px #9d4edd', '0 0 20px #9d4edd'],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 0.5, repeat: 5 }}
              >
                <h2 className="text-7xl font-orbitron text-neon-purple mb-4">LEVEL UP!</h2>
                <motion.p
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-5xl font-orbitron text-white"
                >
                  {newLevel}
                </motion.p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="mb-8 pb-6 border-b border-panel-border">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-3xl font-orbitron text-neon-blue neon-glow-text">{hunterName}</h1>
            <p className="text-gray-400 font-rajdhani">Level {level} Hunter • +{currentStreak} Streak</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-6"
          >
            {/* EXP Bar */}
            <div className="text-right">
              <div className="text-sm text-gray-400 font-rajdhani mb-1">EXP</div>
              <div className="flex items-center gap-2">
                <div className="w-40 h-3 bg-background-tertiary rounded-full overflow-hidden border border-panel-border">
                  <motion.div
                    className="h-full bg-gradient-to-r from-neon-blue to-neon-cyan"
                    initial={{ width: 0 }}
                    animate={{ width: `${expPercent}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <span className="text-neon-blue font-orbitron text-sm min-w-[80px]">
                  {currentExp}/{requiredExp}
                </span>
              </div>
            </div>

            {/* Gold */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-lg"
            >
              <span className="text-yellow-500 font-orbitron text-lg">◆</span>
              <span className="text-yellow-500 font-orbitron">{gold}</span>
            </motion.div>
          </motion.div>
        </div>

        {/* View Mode Buttons */}
        <div className="flex gap-2 flex-wrap">
          {['list', 'calendar', 'stats'].map((mode) => (
            <motion.button
              key={mode}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode(mode as any)}
              className={`px-4 py-2 rounded-lg font-orbitron text-sm transition-all ${
                viewMode === mode
                  ? 'bg-neon-blue text-black'
                  : 'bg-background-tertiary border border-panel-border text-gray-400 hover:border-neon-blue'
              }`}
            >
              {mode === 'list' && '📋 LIST'}
              {mode === 'calendar' && '📅 CALENDAR'}
              {mode === 'stats' && <BarChart3 className="inline mr-2" size={16} />}
              {mode === 'stats' && 'STATS'}
            </motion.button>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column - Quests */}
        <div className="lg:col-span-3">
          {viewMode === 'list' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {/* Quest Stats */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { label: 'ACTIVE', value: activeQuestCount, color: 'text-neon-blue' },
                  { label: 'COMPLETED', value: completedQuestCount, color: 'text-neon-cyan' },
                  { label: 'TOTAL', value: quests.length, color: 'text-neon-purple' },
                ].map((stat) => (
                  <motion.div
                    key={stat.label}
                    whileHover={{ scale: 1.05 }}
                    className="glass-panel p-4 text-center rounded-lg"
                  >
                    <div className={`text-2xl font-orbitron ${stat.color}`}>{stat.value}</div>
                    <div className="text-xs text-gray-400 font-rajdhani">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Filter & Add Button */}
              <div className="flex gap-3 mb-6">
                <div className="flex gap-2 flex-1">
                  {['all', 'active', 'completed'].map((filter) => (
                    <motion.button
                      key={filter}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedFilter(filter)}
                      className={`px-3 py-2 rounded-lg font-orbitron text-xs transition-all ${
                        selectedFilter === filter
                          ? 'bg-neon-cyan text-black'
                          : 'bg-background-tertiary border border-panel-border text-gray-400'
                      }`}
                    >
                      <Filter size={14} className="inline mr-1" />
                      {filter.toUpperCase()}
                    </motion.button>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setModalOpen(true)}
                  className="px-4 py-2 bg-gradient-to-r from-neon-cyan to-neon-blue text-black font-orbitron rounded-lg hover:shadow-lg hover:shadow-neon-blue/50 transition-all flex items-center gap-2"
                >
                  <Plus size={18} /> NEW QUEST
                </motion.button>
              </div>

              {/* Quests List */}
              <div className="space-y-3">
                <AnimatePresence>
                  {filteredQuests.length > 0 ? (
                    filteredQuests.map((quest) => (
                      <AdvancedQuestCard
                        key={quest.id}
                        {...quest}
                        onComplete={() => completeQuest(quest.id)}
                        onDelete={() => deleteQuest(quest.id)}
                      />
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="glass-panel p-8 text-center rounded-lg"
                    >
                      <p className="text-gray-400 font-rajdhani">{selectedFilter === 'active' ? 'No active quests. Create one!' : 'No completed quests yet. Keep grinding!'}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {viewMode === 'calendar' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <Calendar completedDates={completedDates} />
              <ProgressChart weeklyData={weeklyData} title="WEEKLY COMPLETION RATE" />
            </motion.div>
          )}

          {viewMode === 'stats' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <AdvancedStats
                currentStreak={currentStreak}
                longestStreak={longestStreak}
                totalCompleted={completedQuestCount}
                avgCompletionTime={Math.round(quests.reduce((acc, q) => acc + (q.estimatedMinutes || 30), 0) / quests.length)}
                stats={hunterStats}
              />
            </motion.div>
          )}
        </div>

        {/* Right Column - Sidebar */}
        {viewMode === 'list' && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            {/* Streak Tracker */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass-panel p-6 rounded-lg bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20"
            >
              <h3 className="text-lg font-orbitron text-red-500 mb-4 flex items-center gap-2">
                🔥 STREAK
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="text-4xl font-orbitron text-red-500 mb-2">{currentStreak}</div>
                  <div className="text-sm text-gray-400 font-rajdhani">Current Streak</div>
                </div>
                <div className="pt-3 border-t border-red-500/20">
                  <div className="text-2xl font-orbitron text-orange-500 mb-2">{longestStreak}</div>
                  <div className="text-sm text-gray-400 font-rajdhani">Longest Streak</div>
                </div>
              </div>
            </motion.div>

            {/* Character Stats */}
            <motion.div className="glass-panel p-6 rounded-lg">
              <h3 className="text-lg font-orbitron text-neon-purple mb-4">STATS</h3>
              <div className="space-y-4">
                {Object.entries(hunterStats).map(([key, value]) => (
                  <motion.div key={key} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400 capitalize font-rajdhani">{key}</span>
                      <span className="text-neon-cyan font-orbitron">{value}</span>
                    </div>
                    <div className="h-2 bg-background-secondary rounded-full overflow-hidden border border-panel-border">
                      <motion.div
                        className="h-full bg-gradient-to-r from-neon-blue to-neon-cyan"
                        style={{ width: `${(value / 15) * 100}%` }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Shadow Army */}
            <motion.div className="glass-panel p-6 rounded-lg">
              <h3 className="text-lg font-orbitron text-neon-cyan mb-4">SHADOW ARMY</h3>
              <div className="text-center">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-4xl font-orbitron text-neon-cyan mb-2"
                >
                  {Math.floor(longestStreak / 30)}
                </motion.div>
                <p className="text-gray-400 text-sm font-rajdhani">Shadow Soldiers</p>
                <p className="text-gray-500 text-xs mt-3">Complete {30 - (longestStreak % 30)} more days to summon</p>
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div className="glass-panel p-4 rounded-lg text-xs space-y-2 text-gray-400 font-rajdhani">
              <div className="flex justify-between">
                <span>Completion Rate:</span>
                <span className="text-neon-blue">{completedQuestCount > 0 ? Math.round((completedQuestCount / (completedQuestCount + activeQuestCount)) * 100) : 0}%</span>
              </div>
              <div className="flex justify-between">
                <span>Quest Accuracy:</span>
                <span className="text-neon-purple">98%</span>
              </div>
              <div className="flex justify-between">
                <span>Time Invested:</span>
                <span className="text-neon-cyan">{quests.reduce((acc, q) => acc + (q.estimatedMinutes || 30), 0)}m</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Quest Modal */}
      <QuestModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSubmit={addQuest} />
    </div>
  );
}
