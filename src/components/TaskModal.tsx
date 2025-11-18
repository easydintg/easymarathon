import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Circle } from 'lucide-react';
import { tasks } from './tasks';

interface TaskModalProps {
  day: number | null;
  isCompleted: boolean;
  onClose: () => void;
  onToggle: () => void;
}

export function TaskModal({ day, isCompleted, onClose, onToggle }: TaskModalProps) {
  if (!day) return null;

  const task = tasks[day - 1];
  if (!task) return null;

  const handleToggle = () => {
    onToggle();
    // Small delay before closing for better UX
    setTimeout(() => onClose(), 300);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
        onClick={onClose}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/40 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.95 }}
          transition={{ 
            duration: 0.4,
            ease: [0.16, 1, 0.3, 1]
          }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full sm:max-w-lg bg-white rounded-t-[2rem] sm:rounded-[2rem] shadow-2xl overflow-hidden"
          style={{ maxHeight: '90vh' }}
        >
          {/* Header gradient */}
          <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-br from-[#7a9375]/10 to-[#a4b8a0]/5 pointer-events-none" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur-xl flex items-center justify-center shadow-sm border border-black/5 hover:bg-white hover:scale-105 transition-all"
          >
            <X className="w-5 h-5 text-[#1d1d1f]/60" />
          </button>

          <div className="relative p-8 sm:p-10">
            {/* Day badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-xl rounded-full shadow-sm border border-black/5 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-[#7a9375]" />
              <span className="text-sm text-[#1d1d1f]/60">День {day}</span>
            </motion.div>

            {/* Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
              className="text-6xl mb-6"
            >
              {task.icon}
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-3xl sm:text-4xl tracking-tight text-[#1d1d1f] mb-4"
            >
              {task.title}
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-lg text-[#1d1d1f]/60 mb-8 leading-relaxed"
            >
              {task.description}
            </motion.p>

            {/* Benefits */}
            {task.benefits && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-[#7a9375]/5 rounded-2xl p-6 mb-8"
              >
                <p className="text-sm text-[#1d1d1f]/60 mb-3">Польза:</p>
                <p className="text-[#1d1d1f]">{task.benefits}</p>
              </motion.div>
            )}

            {/* Action button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              onClick={handleToggle}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                w-full h-14 rounded-2xl
                flex items-center justify-center gap-3
                transition-all duration-300
                ${isCompleted
                  ? 'bg-[#1d1d1f] text-white hover:bg-[#2d2d2f]'
                  : 'bg-gradient-to-r from-[#7a9375] to-[#a4b8a0] text-white shadow-lg shadow-[#7a9375]/25 hover:shadow-xl hover:shadow-[#7a9375]/30'
                }
              `}
            >
              {isCompleted ? (
                <>
                  <Circle className="w-5 h-5" />
                  <span className="tracking-wide">Отметить невыполненным</span>
                </>
              ) : (
                <>
                  <Check className="w-5 h-5" strokeWidth={3} />
                  <span className="tracking-wide">Отметить выполненным</span>
                </>
              )}
            </motion.button>

            {/* Tip */}
            {task.tip && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="text-sm text-center text-[#1d1d1f]/40 mt-6"
              >
                💡 {task.tip}
              </motion.p>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
