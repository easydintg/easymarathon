import { motion } from 'motion/react';
import { Trophy, Zap, Star, Target } from 'lucide-react';

interface HeaderProps {
  completedDays: number;
}

export function Header({ completedDays }: HeaderProps) {
  const progress = (completedDays / 21) * 100;
  const daysLeft = 21 - completedDays;

  return (
    <div className="relative z-10 pt-28 pb-8 px-4">
      <div className="max-w-md mx-auto">
        {/* Compact Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-6"
        >
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-[#7a9375] via-[#a4b8a0] to-[#7a9375] bg-clip-text text-transparent">
              Новогодний Марафон
            </span>
          </h1>
        </motion.div>

        {/* Gamified Progress Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-gradient-to-br from-white/95 via-white/90 to-white/85 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 p-6 overflow-hidden"
        >
          {/* Animated background particles */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-[#7a9375]/10 to-[#a4b8a0]/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-br from-[#ffd700]/10 to-[#ff6b9d]/10 rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </div>
          
          <div className="relative z-10 space-y-5">
            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-3">
              {/* Completed */}
              <motion.div 
                className="bg-gradient-to-br from-[#7a9375] to-[#a4b8a0] rounded-2xl p-4 shadow-lg text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Trophy className="w-6 h-6 text-white/90 mx-auto mb-2" strokeWidth={2} />
                <div className="text-2xl font-bold text-white">{completedDays}</div>
                <div className="text-[10px] text-white/80 uppercase tracking-wider">Готово</div>
              </motion.div>

              {/* Left */}
              <motion.div 
                className="bg-gradient-to-br from-[#ffd700] to-[#ffed4e] rounded-2xl p-4 shadow-lg text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Target className="w-6 h-6 text-white/90 mx-auto mb-2" strokeWidth={2} />
                <div className="text-2xl font-bold text-white">{daysLeft}</div>
                <div className="text-[10px] text-white/80 uppercase tracking-wider">Осталось</div>
              </motion.div>

              {/* Streak */}
              <motion.div 
                className="bg-gradient-to-br from-[#ff6b9d] to-[#ff8fab] rounded-2xl p-4 shadow-lg text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Zap className="w-6 h-6 text-white/90 mx-auto mb-2" strokeWidth={2} />
                <div className="text-2xl font-bold text-white">{Math.round(progress)}%</div>
                <div className="text-[10px] text-white/80 uppercase tracking-wider">Прогресс</div>
              </motion.div>
            </div>

            {/* Animated Progress Bar */}
            <div className="relative">
              <div className="relative h-4 bg-gradient-to-r from-black/5 to-black/10 rounded-full overflow-hidden shadow-inner">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full overflow-hidden"
                  style={{
                    background: 'linear-gradient(90deg, #7a9375 0%, #a4b8a0 50%, #ffd700 100%)',
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Animated shimmer */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                    animate={{
                      x: ['-200%', '200%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  
                  {/* Pulsing glow */}
                  <motion.div
                    className="absolute inset-0 bg-white/30"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>

                {/* Progress indicator icon */}
                {progress > 0 && (
                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2"
                    style={{ left: `${progress}%` }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, x: '-50%' }}
                    transition={{ duration: 0.5, delay: 1 }}
                  >
                    <motion.div
                      animate={{
                        y: [0, -3, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Star className="w-5 h-5 text-[#ffd700] drop-shadow-lg fill-[#ffd700]" />
                    </motion.div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Motivational Status */}
            <motion.div 
              className="text-center"
              key={completedDays}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#7a9375]/10 to-[#a4b8a0]/10 rounded-full">
                <span className="text-xl">
                  {completedDays === 21 ? '🎉' : completedDays > 15 ? '🔥' : completedDays > 10 ? '⭐' : completedDays > 5 ? '💪' : '🎯'}
                </span>
                <span className="text-sm font-medium text-[#1d1d1f]/80">
                  {completedDays === 21 
                    ? 'Марафон завершен!'
                    : completedDays > 15
                    ? 'Финальный рывок!'
                    : completedDays > 10
                    ? 'Больше половины!'
                    : completedDays > 5
                    ? 'Отличный старт!'
                    : completedDays > 0
                    ? 'Так держать!'
                    : 'Начни приключение!'}
                </span>
              </div>
            </motion.div>
          </div>

          {/* Achievement Badges */}
          {completedDays >= 7 && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-3 right-3"
            >
              <motion.div
                className="relative"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#ffd700] to-[#ffed4e] rounded-full flex items-center justify-center shadow-lg">
                  <Trophy className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
                <motion.div
                  className="absolute inset-0 rounded-full bg-[#ffd700]/30 blur-xl"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}