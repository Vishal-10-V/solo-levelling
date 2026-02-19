'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface CalendarProps {
  completedDates: string[];
  onDateClick?: (date: string) => void;
}

export default function Calendar({ completedDates, onDateClick }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const days = [];
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const isDateCompleted = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return completedDates.includes(dateStr);
  };

  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="glass-panel p-6 rounded-xl"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-orbitron text-neon-cyan">HABIT CALENDAR</h3>
        <div className="flex gap-2">
          <button
            onClick={previousMonth}
            className="p-1 hover:bg-neon-blue/20 rounded transition-colors"
          >
            <ChevronLeft size={20} className="text-neon-blue" />
          </button>
          <span className="text-sm text-gray-400 font-rajdhani min-w-[120px] text-center">{monthName}</span>
          <button
            onClick={nextMonth}
            className="p-1 hover:bg-neon-blue/20 rounded transition-colors"
          >
            <ChevronRight size={20} className="text-neon-blue" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center text-xs font-orbitron text-gray-500 py-2">
            {day}
          </div>
        ))}

        {days.map((day, idx) => (
          <motion.div
            key={idx}
            whileHover={day ? { scale: 1.1 } : {}}
            whileTap={day ? { scale: 0.95 } : {}}
            onClick={() => day && onDateClick && onDateClick(`${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`)}
            className={`
              aspect-square flex items-center justify-center rounded-lg font-orbitron text-sm
              ${!day ? 'bg-transparent' : 'cursor-pointer transition-all duration-300'}
              ${day && isDateCompleted(day)
                ? 'bg-gradient-to-br from-neon-cyan to-neon-blue text-black font-bold shadow-lg shadow-neon-cyan/50'
                : day ? 'bg-background-tertiary border border-panel-border hover:border-neon-blue text-gray-400'
                : ''
              }
            `}
          >
            {day && (
              isDateCompleted(day) ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-full h-full flex items-center justify-center"
                >
                  ✓
                </motion.div>
              ) : (
                day
              )
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-4 flex gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-gradient-to-br from-neon-cyan to-neon-blue"></div>
          <span className="text-gray-400">Completed</span>
        </div>
      </div>
    </motion.div>
  );
}
