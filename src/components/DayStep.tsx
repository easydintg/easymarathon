import { motion } from 'motion/react';
import { Check, Lock, Gift, Star, Sparkles, Heart, Zap, Trophy } from 'lucide-react';

interface DayStepProps {
  day: number;
  isCompleted: boolean;
  isUnlocked: boolean;
  onClick: () => void;
}

// Different gift types for variety - makes it more game-like!
const getGiftIcon = (day: number) => {
  const icons = [Gift, Star, Sparkles, Heart, Zap, Trophy];
  return icons[day % icons.length];
};

// Different colors for each gift type - festive palette
const getGiftColor = (day: number, isCompleted: boolean) => {
  if (!isCompleted) return null;
  
  const colors = [
    'from-[#ff6b9d] via-[#ff8fab] to-[#ffb3c1]', // Pink
    'from-[#ffd700] via-[#ffed4e] to-[#fff9a5]', // Gold
    'from-[#7a9375] via-[#a4b8a0] to-[#c5d4c1]', // Green (brand)
    'from-[#9b87f5] via-[#b5a3f7] to-[#d0c4fa]', // Purple
    'from-[#f97316] via-[#fb923c] to-[#fdba74]', // Orange
    'from-[#06b6d4] via-[#22d3ee] to-[#67e8f9]', // Cyan
  ];
  return colors[day % colors.length];
};

export function DayStep({ day, isCompleted, isUnlocked, onClick }: DayStepProps) {
  const GiftIcon = getGiftIcon(day);
  const giftGradient = getGiftColor(day, isCompleted);
  
  return (
    <motion.button
      onClick={isUnlocked ? onClick : undefined}
      disabled={!isUnlocked}
      whileHover={isUnlocked ? { scale: 1.05 } : {}}
      whileTap={isUnlocked ? { scale: 0.95 } : {}}
      className="relative group"
    >
      {/* Outer magical glow - subtle */}
      {isCompleted && (
        <motion.div
          className="absolute inset-0 rounded-full blur-2xl -z-10"
          style={{
            background: `linear-gradient(135deg, ${giftGradient?.replace('from-', '').replace('via-', '').replace('to-', '')})`,
          }}
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      {/* Main gift container */}
      <motion.div
        className={`
          relative
          w-20 h-20 sm:w-24 sm:h-24
          rounded-3xl
          transition-all duration-300
          ${isUnlocked ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}
          ${isCompleted 
            ? `bg-gradient-to-br ${giftGradient} shadow-2xl` 
            : isUnlocked
            ? 'bg-white/95 backdrop-blur-xl shadow-xl border-2 border-white/50'
            : 'bg-white/40 backdrop-blur-xl border-2 border-white/30'
          }
        `}
      >
        {/* Glossy shine effect - premium look */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden">
          <motion.div
            className="absolute -inset-full bg-gradient-to-br from-white/40 via-transparent to-transparent"
            animate={isUnlocked ? {
              x: ['-100%', '200%'],
            } : {}}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Ribbon decoration for gifts */}
        {isCompleted && (
          <>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-full bg-gradient-to-b from-white/30 to-white/10" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-3 bg-gradient-to-r from-white/30 via-white/20 to-white/30" />
          </>
        )}

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full">
          {/* Icon or Lock - NO ROTATION */}
          <div className="flex items-center justify-center">
            {!isUnlocked ? (
              <Lock className="w-6 h-6 text-[#1d1d1f]/40" strokeWidth={2.5} />
            ) : isCompleted ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <GiftIcon className="w-10 h-10 sm:w-12 sm:h-12 text-white drop-shadow-lg" strokeWidth={2} />
              </motion.div>
            ) : (
              <div className="relative">
                {/* Day number with gradient */}
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-br from-[#7a9375] to-[#a4b8a0] bg-clip-text text-transparent">
                  {day}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Hover indicator for unlocked */}
        {isUnlocked && !isCompleted && (
          <motion.div 
            className="absolute inset-0 rounded-3xl ring-4 ring-[#7a9375]/0 group-hover:ring-[#7a9375]/50 transition-all duration-300"
          />
        )}
      </motion.div>

      {/* Day label below - ALWAYS VISIBLE */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
        <span className={`
          text-xs font-medium tracking-wide
          ${isCompleted 
            ? 'text-[#7a9375]' 
            : isUnlocked 
            ? 'text-[#1d1d1f]/70' 
            : 'text-[#1d1d1f]/30'
          }
        `}>
          День {day}
        </span>
      </div>

      {/* Completion sparkle on top-right */}
      {isCompleted && (
        <motion.div
          className="absolute -top-2 -right-2 text-2xl"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          ✨
        </motion.div>
      )}
    </motion.button>
  );
}