# Hunter's Ascent - Solo Leveling Themed Productivity App

## Project Overview
- **Project Name**: Hunter's Ascent (Shadow System)
- **Type**: Gamified productivity webapp (PWA-ready)
- **Core Functionality**: Combined to-do list, habit tracker, daily quests system with RPG progression inspired by Solo Leveling anime
- **Target Users**: Productivity enthusiasts who love anime/gaming aesthetics

---

## UI/UX Specification

### Color Palette
| Role | Color | Hex Code |
|------|-------|----------|
| Background Primary | Deep Black | #000000 |
| Background Secondary | Near Black | #0a0a0a |
| Background Tertiary | Dark Gray | #121212 |
| Accent Primary | Electric Blue / Cyan Neon | #00f0ff / #00d4ff |
| Accent Secondary | Glowing Purple/Violet | #9d4edd / #7b2cbf |
| Urgent/Boss Warning | Crimson Red | #ff0033 / #c40000 |
| Panel Background | Translucent Dark | rgba(10, 10, 20, 0.85) |

### Typography
- **Headings**: Orbitron (700 bold)
- **Body**: Rajdhani (500 medium)
- **Fallback**: system-ui, sans-serif

### Responsive Breakpoints
- Mobile: <640px
- Tablet: 640px - 1024px
- Desktop: >=1024px

### Visual Effects
- Glassmorphism panels with backdrop-blur(12px)
- Cyan neon borders (1px, 20% opacity)
- Scanline overlay effect
- Box-shadow glow on interactive elements
- Particle effects on level-ups

### Animations
- Panel fade-in: 500ms easeOutExpo
- Level-up glitch effect: 2s
- Shadow soldier silhouette on milestones

---

## Functionality Specification

### 1. Quest System (To-dos + Habits)
- **Daily Quests**: Recurring habits with streak tracking
- **Emergency Quests**: One-off to-dos with due dates
- Quest attributes: title, description, difficulty (E-S rank), estimated time, tags, due date
- Rewards: EXP, gold, mana stones

### 2. Status Window / Profile
- Hunter name, level, class (E-Rank → Shadow Monarch)
- Stats: Strength, Intelligence, Vitality, Dexterity
- Total EXP bar with level-up animation
- Shadow Army counter

### 3. Leveling & Rewards
- Level-up triggers epic animation
- Unlock titles: "The Weakest Hunter", "Double Awakening", "Monarch of Shadows"
- Shop for cosmetics

### 4. Penalty System
- Missed dailies = Fatigue debuff
- Red Gate challenge mode for recovery

### 5. Dashboard
- Quest log with rank-colored borders
- Progress overview
- Calendar heatmap

---

## Technical Stack
- Frontend: Next.js 15 (App Router), React 19, TypeScript
- Styling: Tailwind CSS + Framer Motion
- State: Zustand
- Backend: Next.js API Routes
- Database: PostgreSQL with Prisma
- Auth: NextAuth.js v5
- Docker: docker-compose with nginx, Next.js, PostgreSQL

---

## Acceptance Criteria
1. App loads with Solo Leveling dark theme
2. User can create/view/complete quests
3. EXP and leveling system works
4. Status window displays user stats
5. Level-up animation triggers correctly
6. Docker setup works with docker-compose up
7. All core features functional
