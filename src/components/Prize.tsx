import { motion } from 'motion/react';
import { Lock, Sparkles, Star, Trophy, Gift } from 'lucide-react';
import logo from 'figma:asset/ac1f67cd2f373fe5e4a8c3d4846dcea09bb019c8.png';

interface PrizeProps {
  isUnlocked: boolean;
  showLabel?: boolean;
}

export function Prize({ isUnlocked, showLabel = true }: PrizeProps) {
  return (
    <div className="relative flex justify-center">
      {/* Giant Star Prize Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-sm"
      >
        {/* Magical glow around prize */}
        {isUnlocked && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full blur-3xl -z-10"
              style={{
                background: 'radial-gradient(circle, rgba(255,215,0,0.4) 0%, rgba(122,147,117,0.2) 50%, transparent 70%)',
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            {/* Spinning particles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                style={{
                  left: '50%',
                  top: '50%',
                }}
                animate={{
                  x: [0, Math.cos(i * 45 * Math.PI / 180) * 100],
                  y: [0, Math.sin(i * 45 * Math.PI / 180) * 100],
                  rotate: [0, 360],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.2,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              >
                {['⭐', '✨', '💫', '🌟', '⭐', '✨', '💫', '🌟'][i]}
              </motion.div>
            ))}
          </>
        )}

        {/* Main Prize Card */}
        <motion.div
          className={`
            relative
            bg-gradient-to-br from-white/95 via-white/90 to-white/85
            backdrop-blur-2xl
            rounded-3xl
            p-8
            shadow-2xl
            border-2
            overflow-hidden
            ${isUnlocked 
              ? 'border-[#ffd700]/50' 
              : 'border-white/30'
            }
          `}
          whileHover={isUnlocked ? { scale: 1.02 } : {}}
        >
          {/* Background sparkles pattern */}
          <div className="absolute inset-0 overflow-hidden opacity-10">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-[#ffd700]"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  fontSize: `${10 + Math.random() * 20}px`,
                }}
                animate={{
                  opacity: [0.2, 0.8, 0.2],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  delay: Math.random() * 2,
                  repeat: Infinity,
                }}
              >
                ★
              </motion.div>
            ))}
          </div>

          {/* Animated gradient overlay */}
          <div className={`
            absolute inset-0 pointer-events-none
            ${isUnlocked 
              ? 'bg-gradient-to-br from-[#ffd700]/10 via-[#7a9375]/5 to-transparent' 
              : 'bg-gradient-to-br from-black/5 to-transparent'
            }
          `} />

          <div className="relative z-10 text-center space-y-6">
            {/* Status Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/90 backdrop-blur-xl rounded-full shadow-lg border border-white/50"
            >
              {isUnlocked ? (
                <>
                  <Trophy className="w-5 h-5 text-[#ffd700]" />
                  <span className="font-medium text-[#1d1d1f]">Главный Приз</span>
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5 text-[#1d1d1f]/40" />
                  <span className="text-[#1d1d1f]/60">Финальный Приз</span>
                </>
              )}
            </motion.div>

            {/* Giant Prize Icon/Image */}
            <motion.div
              className="relative"
              animate={isUnlocked ? {
                y: [0, -15, 0],
                rotate: [0, 5, -5, 0],
              } : {}}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {/* Prize Illustration - BIG STAR */}
              <div className={`
                relative mx-auto transition-all duration-700
                ${isUnlocked ? 'w-40 h-40' : 'w-32 h-32 opacity-30'}
              `}>
                {/* Outer glow rings */}
                {isUnlocked && (
                  <>
                    <motion.div
                      className="absolute inset-0 rounded-full bg-[#ffd700]/20 blur-2xl"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    <motion.div
                      className="absolute inset-0 rounded-full bg-[#7a9375]/20 blur-xl"
                      animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.2, 0.5, 0.2],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5,
                      }}
                    />
                  </>
                )}

                {/* Giant Star */}
                <motion.div
                  className="relative w-full h-full flex items-center justify-center"
                >
                  <Star 
                    className={`
                      w-full h-full
                      ${isUnlocked 
                        ? 'text-[#ffd700] fill-[#ffd700] drop-shadow-2xl' 
                        : 'text-[#e5e5e5] fill-[#e5e5e5]'
                      }
                    `}
                    strokeWidth={1.5}
                  />
                </motion.div>

                {/* Center Logo */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: isUnlocked ? 1 : 0.4 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="bg-white/95 rounded-full p-3 shadow-xl">
                    <img 
                      src={logo} 
                      alt="easyme" 
                      className="w-10 h-10" 
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Prize Title */}
            {showLabel && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="space-y-2"
              >
                <h3 className={`
                  text-2xl sm:text-3xl font-bold tracking-tight
                  ${isUnlocked 
                    ? 'bg-gradient-to-r from-[#ffd700] via-[#7a9375] to-[#ffd700] bg-clip-text text-transparent' 
                    : 'text-[#1d1d1f]/40'
                  }
                `}>
                  Фирменная футболка easyme
                </h3>
                <p className={`
                  ${isUnlocked ? 'text-[#1d1d1f]/70' : 'text-[#1d1d1f]/40'}
                `}>
                  {isUnlocked 
                    ? '🎉 Поздравляем с завершением марафона!' 
                    : '🎯 Завершите все 21 день чтобы получить приз'
                  }
                </p>
              </motion.div>
            )}

            {/* Success Badge */}
            {isUnlocked && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.7, delay: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#ffd700] via-[#7a9375] to-[#ffd700] text-white rounded-full shadow-2xl">
                  <Trophy className="w-6 h-6" />
                  <span className="font-bold tracking-wide">Приз разблокирован!</span>
                  <Trophy className="w-6 h-6" />
                </div>
              </motion.div>
            )}

            {/* Locked message */}
            {!isUnlocked && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-sm text-[#1d1d1f]/50"
              >
                Продолжай выполнять задания! 💪
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Celebration confetti when unlocked */}
        {isUnlocked && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${50 + (Math.random() - 0.5) * 100}%`,
                  top: '-10%',
                }}
                initial={{ y: 0, opacity: 1, rotate: 0 }}
                animate={{
                  y: '120vh',
                  rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
                  opacity: [1, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  delay: Math.random() * 2,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                <span className="text-xl">
                  {['🎉', '🎊', '✨', '⭐', '🌟', '💫'][Math.floor(Math.random() * 6)]}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}