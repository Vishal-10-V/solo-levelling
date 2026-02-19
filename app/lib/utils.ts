import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { QuestRank } from '../types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRankColor(rank: QuestRank): string {
  const colors: Record<QuestRank, string> = {
    E: 'text-rank-e border-rank-e',
    D: 'text-rank-d border-rank-d',
    C: 'text-rank-c border-rank-c',
    B: 'text-rank-b border-rank-b',
    A: 'text-rank-a border-rank-a',
    S: 'text-rank-s border-rank-s',
  };
  return colors[rank];
}

export function getRankBgColor(rank: QuestRank): string {
  const colors: Record<QuestRank, string> = {
    E: 'bg-rank-e',
    D: 'bg-rank-d',
    C: 'bg-rank-c',
    B: 'bg-rank-b',
    A: 'bg-rank-a',
    S: 'bg-rank-s',
  };
  return colors[rank];
}

export function getRankExpMultiplier(rank: QuestRank): number {
  const multipliers: Record<QuestRank, number> = {
    E: 1,
    D: 2,
    C: 4,
    B: 8,
    A: 16,
    S: 32,
  };
  return multipliers[rank];
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

export function calculateStreakBonus(streak: number): number {
  if (streak < 3) return 1;
  if (streak < 7) return 1.25;
  if (streak < 14) return 1.5;
  if (streak < 30) return 2;
  if (streak < 60) return 2.5;
  return 3;
}

export function getClassFromLevel(level: number): string {
  if (level >= 50) return 'Shadow Monarch';
  if (level >= 40) return 'S-Rank Hunter';
  if (level >= 30) return 'A-Rank Hunter';
  if (level >= 20) return 'B-Rank Hunter';
  if (level >= 10) return 'C-Rank Hunter';
  if (level >= 5) return 'D-Rank Hunter';
  return 'E-Rank Hunter';
}

export function getTitleFromLevel(level: number): string {
  if (level >= 50) return 'Monarch of Shadows';
  if (level >= 40) return 'King Hunter';
  if (level >= 30) return 'National Hunter';
  if (level >= 20) return 'Elite Hunter';
  if (level >= 10) return 'Rising Hunter';
  if (level >= 5) return 'The Weakest Hunter';
  return 'The Weakest Hunter';
}

export function getExpForNextLevel(level: number): number {
  return Math.floor(100 * Math.pow(1.5, level - 1));
}

export function getFatiguePenalty(fatigueLevel: number): number {
  return Math.max(0, 1 - fatigueLevel * 0.1);
}

export function getRandomQuote(): string {
  const quotes = [
    "Arise.",
    "The weak are meat, the strong eat.",
    "I am the man who's become a monster.",
    "You call me the weakest, but I'll become the strongest.",
    "In this world, it's kill or be killed.",
    "There's no such thing as an equal fight.",
    "The only ones who should fight are those who are prepared to be killed.",
    "Power. That's what defines a hunter.",
    "If you want to survive, you need power.",
    "The gate has opened. The hunt begins.",
  ];
  return quotes[Math.floor(Math.random() * quotes.length)];
}

export function generateId(): string {
  return crypto.randomUUID();
}

export function getCurrentDateString(): string {
  return new Date().toISOString().split('T')[0];
}

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export function isToday(date: Date): boolean {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
}
