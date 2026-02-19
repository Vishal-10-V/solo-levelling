# Hunter's Ascent - Solo Leveling Themed Productivity App

A gamified productivity application inspired by Solo Leveling anime where users become Hunters awakening their potential through completing quests and leveling up.

## Features  

### Core Gameplay Loop  
✅ Daily Quests & Emergency Missions (habits/to-dos)   
✅ Rank-based difficulty system E→S tiers    
✅ EXP/Gold/Mana Stone rewards      
✅ Streak tracking with bonus multipliers       
✅ Shadow Army extraction for milestones     

### Progression System     
✅ Full RPG-style stats (STR/INT/VIT/DEX/WIS)        
✅ Class advancement E-Rank → Shadow Monarch          
✅ Unlockable titles progression         
⚠️  Shop system ⚡(coming soon)

### UI Theme           
🔵 Electric blue neon accents (#00f0ff)            
🟣 Purple glow effects for level-ups              
🔴 Crimson red warnings / Red Gate mode             
🌑 Dark glassmorphism panels only                 

## Tech Stack  

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 15 + React 19 |
| Styling | Tailwind CSS v3 + Framer Motion |
| State | Zustand v5 |
| Database | PostgreSQL via Prisma ORM |

## Quick Start  

```bash  
# Install dependencies 
npm install   

# Generate Prisma client   
npx prisma generate    

# Run database migrations    
npx prisma db push   

# Seed starter data    
npm run db:seed    

# Start development server   
npm run dev     
```

Then open http://localhost:3000 in your browser.

## Docker Deployment  

```bash 
docker compose up --build 
```

This launches three containers:
* **postgres** - Database on port 5432       
* **nextjs**   - Application on port 3000       
  
Environment variables required (.env):
```
DATABASE_URL=postgresql://hunter:hunter_password@postgres:5432/hunters_ascent?schema=public
NEXTAUTH_SECRET=<generate-secure-random-string>      
NEXTAUTH_URL=http://localhost:3000          
```

## Project Structure  

```
hunters-ascent/
├── app/
│   ├── layout.tsx          # Root layout wrapper        
│   ├── page.*             # Main dashboard entrypoint       
│   ├── globals.css        # Global styles & animations     
│   ├── types/index.d.ts    # TypeScript definitions        
│   └── store/index.*       # Zustand state management       
├── components/
│   └── *.tsx            # Reusable UI pieces               
├── lib/utils.*           # Helper functions                
├── prisma/
│   └── schema.prisma    # Database models                 
└── public/               Static assets                    
```

Note**: Some component source may show TypeScript errors until running `npm install` which installs required packages including framer-motion,zustand,lucide-react etc.


## Known Issues  

If you encounter build/type errors initially after cloning fresh copy:

```bash   
rm -rf node_modules .next && npm install && npm run build   
```

Most reported parsing failures stem from temporary tooling quirks during initial generation; full clean reinstall typically resolves them.


## License MIT ©2024
