import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles } from 'lucide-react';
import { Prize } from './Prize';

interface PrizeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrizeModal({ isOpen, onClose }: PrizeModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Backdrop with premium blur */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#7a9375]/20 via-black/40 to-[#a4b8a0]/20 backdrop-blur-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Confetti effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{
                x: '50vw',
                y: '50vh',
                scale: 0,
                rotate: 0,
              }}
              animate={{
                x: `${Math.random() * 100}vw`,
                y: `${Math.random() * 100}vh`,
                scale: [0, 1, 0.8],
                rotate: Math.random() * 360,
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.02,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: ['#7a9375', '#a4b8a0', '#c5d4c1', '#ffffff'][i % 4],
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
          }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
        >
          {/* Premium gradient header */}
          <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-br from-[#7a9375]/10 via-[#a4b8a0]/5 to-transparent pointer-events-none" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 w-11 h-11 rounded-full bg-white/90 backdrop-blur-xl flex items-center justify-center shadow-lg border border-black/5 hover:bg-white hover:scale-110 transition-all"
          >
            <X className="w-5 h-5 text-[#1d1d1f]/60" />
          </button>

          <div className="relative p-10 sm:p-12 text-center">
            {/* Sparkles animation */}
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute top-12 left-12 text-[#7a9375]/30"
            >
              <Sparkles className="w-6 h-6" />
            </motion.div>
            <motion.div
              animate={{
                rotate: -360,
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute top-16 right-16 text-[#a4b8a0]/30"
            >
              <Sparkles className="w-5 h-5" />
            </motion.div>

            {/* Success icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              className="inline-block mb-6"
            >
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-[#7a9375] to-[#a4b8a0] rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-4xl">🎉</span>
                </div>
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute inset-0 rounded-full bg-[#7a9375]/20 blur-xl"
                />
              </div>
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl sm:text-5xl tracking-tight text-[#1d1d1f] mb-4"
            >
              Поздравляем!
            </motion.h2>

            {/* Message */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-[#1d1d1f]/60 mb-8 leading-relaxed"
            >
              Вы успешно прошли все 21 день марафона!
              <br />
              Вы заслужили особый приз 🎁
            </motion.p>

            {/* Prize showcase */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mb-8"
            >
              <Prize isUnlocked={true} showLabel={false} />
            </motion.div>

            {/* Prize description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-gradient-to-br from-[#7a9375]/10 to-[#a4b8a0]/5 rounded-2xl p-6 mb-8"
            >
              <h3 className="text-xl text-[#1d1d1f] mb-2">
                Фирменная футболка easyme
              </h3>
              <p className="text-[#1d1d1f]/60">
                Премиальное качество, эксклюзивный дизайн
              </p>
            </motion.div>

            {/* CTA */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              onClick={onClose}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#7a9375] to-[#a4b8a0] text-white shadow-lg shadow-[#7a9375]/25 hover:shadow-xl hover:shadow-[#7a9375]/30 transition-all"
            >
              <span className="tracking-wide">Отлично!</span>
            </motion.button>

            {/* Achievement badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-8 inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-xl rounded-full border border-black/5"
            >
              <span className="text-2xl">🏆</span>
              <span className="text-sm text-[#1d1d1f]/60">Марафон завершён</span>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
