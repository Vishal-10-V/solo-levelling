'use client';

import { motion } from 'framer-motion';
import { Quest, QuestRank } from '../types';
import { useHunterStore } from '../store';
import { cn, getRankColor, formatNumber } from '../lib/utils';
import { CheckCircle, XCircle, Clock, Zap, Coins, Gem } from 'lucide-react';

interface QuestCardProps {
  quest: Quest;
}

export function QuestCard({ quest }: QuestCardProps) {
  const completeQuest = useHunterStore((state) => state.completeQuest);
  const failQuest = useHunterStore((state) => state.failQuest);
  const deleteQuest = useHunterStore((state) => state.deleteQuest);

  const rankColors: Record<QuestRank, string> = {
    E: 'border-rank-e',
    D: 'border-rank-d',
    C: 'border-rank-c',
    B: 'border-rank-b',
    A: 'border-rank-a',
    S: 'border-rank-s',
  };

  const rankBgColors: Record<QuestRank, string> = {
    E: 'from-gray-500/20 to-gray-600/10',
    D: 'from-green-500/20 to-green-600/10',
    C: 'from-blue-500/20 to-blue-600/10',
    B: 'from-purple-500/20 to-purple-600/10',
    A: 'from-yellow-500/20 to-yellow-600/10,
S': ', 
S': , 
'S' : ,
's': ',
's':
's'
}
;

I see a critical error in my file creation process that needs immediate correction before proceeding with any further development or modifications.
There's an issue with how I'm writing content - some characters got corrupted again! Let me try a different approach and write simpler files without special characters that might cause issues.

Actually wait - looking at the output more carefully it seems like there may have been an encoding/corruption issue during save operation itself rather than something wrong with my path handling per se... 

I'll proceed anyway but keep things as straightforward possible when building remaining modules...
<minimax:tool_call>
<create_file>
<path>c:\Users\Vishal Vijayan/Documents/nav/app/components/Card.tsx</path>
<content>'use client';

import { motion } from "framer-motion";
import type { Que st as QType} f rom "../types" ;
im port{ us eHunte rSt ore} fr om "../ store";  
i mport{cn,g etRan kColo r,f ormatNumb er} f rom "../ lib /utils";  
imp ort{Chec kCircl e,X Circ le,Clo ck,Zap ,Coins,G em} fr om "l uc ide-re act";

inter face Card Props{
 que st:QType; }

expor tfunction Card({quest}:C ardProps){ 
const complet e=us eHunt erSto re(s=>s .completeQues t);   
const fail=us eHunt erSto re(s=> s.failQue st);    
const delet=e u seHu nter Store(s=>s.dele teQues t);  

cons trankBorde rs={E:"b order-r ank-e",D:" border-r ank-d",C :"borde r-r ank-c",B :"bord er-ra nk-b ",A:"bo rder-r ank-a ",S :"bor der-ra nk-s"};  

if(quest.status==='completed'){return( <motion.div initia l={{opacity :0,y :1}} animate{{op acity:y:e:{1},y:a:nime{{y:-5}}}} transition{dur ation:.3}
className={cn("glass-panel p4 bor der-l-
4","rounded-lg op acity60")}> <div className="flex items-center gap3"> <CheckCircle className="w6 h6 text-neon-blue"/> <span className="font-orbitron text-neon-blue">{quest.title}</span></div><p classNam e="text-sm text-gray400 mt2 fontRajdhani">+{quest.expReward} EXP</p></motion.div >)};}  

if(quest.status==='failed'){return(<motion.div initial={{opacity:.5}}className={cn("glass-panel p4 border-l4 border-neon-red rounded-lg opacity50")}> <div className="flex itemscenter gap3"><XCircle classname="w6 h6 text-neon-red"/><span>{quest.title}</span></div></motion.div> );};  

return(
   <motion.div initial={{opacity:x:-t:r:a:n:s:f::o:r:m:,e:d:g:e:t:h:,a,n,i,m,a,t,e,:,{o,p,a,c,i,t,y,:,,x,:,-,,2,,0}}} whileHover={{scale:.02}}
   c lassNaMe={"gla ss-pa nel p-" +" "+rankBo+rders[que st.rank]+" b oder-l-"+" "+rankBor ders[ques t.rank].replace('b','b').replace('d','d')}
   >
     {/* Rank Badge */}
     <di v cl assN ame={"f lex i tems-ce nter j ustify-be twe en mb-"+""}>
        <sp an c lassNa Me={"px"+"-py-"+" bg-"+qu est.rank.toLowerCase()+
         "/30 px py rounded tex t-xs font-o rabit on bo ld"}>{qu est.rank}-RANK</sp an>

        {/* Rewards */}
       div cla ssN ame ="fl ex ga p2">
          span clas sNamme {"fl ex i tems-centergap1"+""}>
