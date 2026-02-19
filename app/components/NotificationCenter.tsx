'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message?: string;
  duration?: number;
}

interface NotificationCenterProps {
  notifications: Notification[];
  onDismiss: (id: string) => void;
}

export default function NotificationCenter({ notifications, onDismiss }: NotificationCenterProps) {
  useEffect(() => {
    notifications.forEach((notif) => {
      if (notif.duration !== 0) {
        const timer = setTimeout(() => {
          onDismiss(notif.id);
        }, notif.duration || 3000);
        return () => clearTimeout(timer);
      }
    });
  }, [notifications, onDismiss]);

  return (
    <AnimatePresence>
      <div className="fixed top-8 right-8 z-50 space-y-3">
        {notifications.map((notif) => {
          const Icon = notif.type === 'success' ? CheckCircle : notif.type === 'error' ? AlertCircle : Zap;
          const colors = {
            success: 'bg-green-500/20 border-green-500/50 text-green-400',
            error: 'bg-red-500/20 border-red-500/50 text-red-400',
            info: 'bg-blue-500/20 border-blue-500/50 text-blue-400',
          };

          return (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, y: -20, x: 100 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, y: -20, x: 100 }}
              className={`glass-panel border flex items-gap-3 p-4 rounded-lg ${colors[notif.type]}`}
            >
              <Icon size={20} className="flex-shrink-0" />
              <div className="ml-3 flex-1">
                <h3 className="font-orbitron text-sm font-bold">{notif.title}</h3>
                {notif.message && <p className="text-xs font-rajdhani opacity-90">{notif.message}</p>}
              </div>
              <button
                onClick={() => onDismiss(notif.id)}
                className="ml-4 text-lg hover:opacity-80 transition-opacity"
              >
                ×
              </button>
            </motion.div>
          );
        })}
      </div>
    </AnimatePresence>
  );
}
