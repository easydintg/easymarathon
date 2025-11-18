import { motion } from 'motion/react';
import { DayStep } from './DayStep';
import { Prize } from './Prize';

interface AdventPathProps {
  completedDays: number[];
  onToggleDay: (day: number) => void;
  onDayClick: (day: number, isUnlocked: boolean) => void;
}

export function AdventPath({ completedDays, onToggleDay, onDayClick }: AdventPathProps) {
  const days = Array.from({ length: 21 }, (_, i) => i + 1);
  
  // Create magical Christmas tree path - zigzag pattern (2 columns max for mobile)
  const getStepPosition = (index: number) => {
    const row = index;
    // Alternate between left (0) and right (1) for zigzag
    const col = index % 2;
    
    return {
      row,
      col,
    };
  };

  // Decorations along the path - елочки и снеговики
  const getDecoration = (index: number) => {
    const decorations = ['🎄', '⛄', '🎁', '⭐', '🎅', '🦌'];
    return decorations[index % decorations.length];
  };

  return (
    <div className="relative z-10 px-4 pb-32 pt-8">
      <div className="max-w-md mx-auto">
        {/* Magical Christmas Title */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative inline-block">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#7a9375] via-[#a4b8a0] to-[#7a9375] bg-clip-text text-transparent">
              🎄 Твой путь к здоровью 🎄
            </h2>
            <motion.div 
              className="absolute -inset-4 bg-gradient-to-r from-[#7a9375]/10 via-[#a4b8a0]/10 to-[#7a9375]/10 rounded-3xl blur-xl -z-10"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
          <p className="text-sm text-[#1d1d1f]/60 mt-3">
            Собери все подарки до Нового Года! 🎁
          </p>
        </motion.div>

        {/* Path container with Christmas tree shape */}
        <div className="relative">
          {/* SNOWY ROAD - Beautiful wide path */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 0 }}
          >
            <defs>
              {/* Snow texture gradient */}
              <linearGradient id="snowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 0.3 }} />
                <stop offset="50%" style={{ stopColor: '#e8f4f9', stopOpacity: 0.9 }} />
                <stop offset="100%" style={{ stopColor: '#ffffff', stopOpacity: 0.3 }} />
              </linearGradient>
              
              {/* Glowing snow effect */}
              <filter id="snowGlow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>

              {/* Snow sparkles */}
              <filter id="sparkle">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Draw snowy road segments */}
            {days.slice(0, -1).map((day, i) => {
              const current = getStepPosition(i);
              const next = getStepPosition(i + 1);
              
              // Calculate positions for zigzag path
              const startX = current.col === 0 ? 25 : 75;
              const startY = current.row * 150 + 80;
              const endX = next.col === 0 ? 25 : 75;
              const endY = next.row * 150 + 80;
              
              // Control point for smooth curve
              const midX = (startX + endX) / 2;
              const midY = (startY + endY) / 2;
              const controlX = midX;
              const controlY = midY;
              
              const isCompleted = completedDays.includes(day) && completedDays.includes(day + 1);
              
              return (
                <g key={i}>
                  {/* Wide snowy road background */}
                  <motion.path
                    d={`M ${startX}% ${startY}px Q ${controlX}% ${controlY}px ${endX}% ${endY}px`}
                    stroke="url(#snowGradient)"
                    strokeWidth="45"
                    fill="none"
                    strokeLinecap="round"
                    opacity={isCompleted ? 0.95 : 0.4}
                    filter="url(#snowGlow)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ 
                      pathLength: 1, 
                      opacity: isCompleted ? 0.95 : 0.4 
                    }}
                    transition={{ 
                      duration: 0.8, 
                      delay: i * 0.05,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                  />
                  
                  {/* Inner path with color */}
                  <motion.path
                    d={`M ${startX}% ${startY}px Q ${controlX}% ${controlY}px ${endX}% ${endY}px`}
                    stroke={isCompleted ? '#7a9375' : '#d4e4d9'}
                    strokeWidth="6"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={isCompleted ? "0" : "10 5"}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ 
                      pathLength: 1, 
                      opacity: isCompleted ? 0.9 : 0.5 
                    }}
                    transition={{ 
                      duration: 0.8, 
                      delay: i * 0.05 + 0.1,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                  />

                  {/* Footprints on completed path */}
                  {isCompleted && (
                    <>
                      <motion.circle
                        cx={`${startX + (endX - startX) * 0.25}%`}
                        cy={startY + (endY - startY) * 0.25}
                        r="3"
                        fill="#7a9375"
                        opacity="0.3"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.3 }}
                        transition={{ delay: i * 0.05 + 0.3, duration: 0.4 }}
                      />
                      <motion.circle
                        cx={`${startX + (endX - startX) * 0.5}%`}
                        cy={startY + (endY - startY) * 0.5}
                        r="3"
                        fill="#7a9375"
                        opacity="0.3"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.3 }}
                        transition={{ delay: i * 0.05 + 0.4, duration: 0.4 }}
                      />
                      <motion.circle
                        cx={`${startX + (endX - startX) * 0.75}%`}
                        cy={startY + (endY - startY) * 0.75}
                        r="3"
                        fill="#7a9375"
                        opacity="0.3"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.3 }}
                        transition={{ delay: i * 0.05 + 0.5, duration: 0.4 }}
                      />
                    </>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Days grid - zigzag Christmas path with more space for decorations */}
          <div className="relative" style={{ minHeight: `${21 * 150 + 200}px` }}>
            {days.map((day, index) => {
              const position = getStepPosition(index);
              const isCompleted = completedDays.includes(day);
              const isUnlocked = day === 1 || completedDays.includes(day - 1);
              
              // Calculate X position for zigzag (left or right)
              const xPos = position.col === 0 ? 25 : 75;
              
              return (
                <motion.div
                  key={day}
                  className="absolute"
                  style={{
                    left: `${xPos}%`,
                    top: `${position.row * 150 + 80}px`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: 10,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.05,
                    ease: [0.34, 1.56, 0.64, 1]
                  }}
                >
                  <DayStep
                    day={day}
                    isCompleted={isCompleted}
                    isUnlocked={isUnlocked}
                    onClick={() => onDayClick(day, isUnlocked)}
                  />
                </motion.div>
              );
            })}

            {/* Decorations along the snowy path - елочки, снеговики НА ДОРОГЕ */}
            {days.slice(0, -1).map((day, index) => {
              const current = getStepPosition(index);
              const next = getStepPosition(index + 1);
              
              // Position decoration in the middle of the path
              const currentX = current.col === 0 ? 25 : 75;
              const nextX = next.col === 0 ? 25 : 75;
              const midX = (currentX + nextX) / 2;
              const midY = (current.row * 150 + 80 + next.row * 150 + 80) / 2;
              
              const decoration = getDecoration(index);
              const isPathCompleted = completedDays.includes(day) && completedDays.includes(day + 1);
              
              return (
                <motion.div
                  key={`decoration-${index}`}
                  className="absolute pointer-events-none"
                  style={{
                    left: `${midX}%`,
                    top: `${midY}px`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: 8,
                  }}
                  initial={{ opacity: 0, scale: 0, y: -20 }}
                  animate={{ 
                    opacity: isPathCompleted ? 1 : 0.25,
                    scale: isPathCompleted ? [1, 1.1, 1] : 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.05 + 0.3,
                    scale: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                >
                  <div className={`
                    text-3xl 
                    ${isPathCompleted ? 'drop-shadow-lg' : 'grayscale opacity-40'}
                  `}>
                    {decoration}
                  </div>
                  
                  {/* Sparkle effect when completed */}
                  {isPathCompleted && (
                    <motion.div
                      className="absolute -top-1 -right-1 text-sm"
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0.5, 1, 0.5],
                        rotate: [0, 180, 360]
                      }}
                      transition={{
                        duration: 2,
                        delay: index * 0.1,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      ✨
                    </motion.div>
                  )}
                </motion.div>
              );
            })}

            {/* Additional snow sparkles on the road */}
            {days.slice(0, -1).map((day, index) => {
              const current = getStepPosition(index);
              const next = getStepPosition(index + 1);
              
              const currentX = current.col === 0 ? 25 : 75;
              const nextX = next.col === 0 ? 25 : 75;
              
              // Create multiple sparkles along each segment
              const sparkles = [0.2, 0.4, 0.6, 0.8];
              const isPathCompleted = completedDays.includes(day) && completedDays.includes(day + 1);
              
              return sparkles.map((position, sparkleIndex) => {
                const sparkleX = currentX + (nextX - currentX) * position;
                const sparkleY = (current.row * 150 + 80) + ((next.row * 150 + 80) - (current.row * 150 + 80)) * position;
                const offsetX = (sparkleIndex % 2 === 0 ? -8 : 8);
                
                return (
                  <motion.div
                    key={`sparkle-${index}-${sparkleIndex}`}
                    className="absolute pointer-events-none text-xs"
                    style={{
                      left: `calc(${sparkleX}% + ${offsetX}px)`,
                      top: `${sparkleY}px`,
                      transform: 'translate(-50%, -50%)',
                      zIndex: 7,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: isPathCompleted ? [0.3, 0.8, 0.3] : 0,
                      scale: isPathCompleted ? [0.8, 1.2, 0.8] : 0,
                    }}
                    transition={{
                      duration: 1.5,
                      delay: index * 0.1 + sparkleIndex * 0.2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    ❄️
                  </motion.div>
                );
              });
            })}
          </div>

          {/* Giant Prize at the end - Christmas Star */}
          <motion.div 
            className="mt-12 mb-8"
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Prize isUnlocked={completedDays.length === 21} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}