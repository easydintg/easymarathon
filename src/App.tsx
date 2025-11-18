import { useState, useEffect } from 'react';
import { AdventPath } from './components/AdventPath';
import { Header } from './components/Header';
import { PrizeModal } from './components/PrizeModal';
import { TaskModal } from './components/TaskModal';
import logo from 'figma:asset/ac1f67cd2f373fe5e4a8c3d4846dcea09bb019c8.png';
import { initTelegramWebApp, getTelegramUser, isTelegramWebApp } from './utils/telegram';
import { getProgress, saveProgress, registerUser } from './utils/api';

export default function App() {
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [showPrizeModal, setShowPrizeModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [offlineMode, setOfflineMode] = useState(false);

  // Initialize Telegram WebApp and load user progress
  useEffect(() => {
    const initialize = async () => {
      // Console info
      console.log('%c🎄 easyme Новогодний Марафон', 'font-size: 20px; font-weight: bold; color: #7a9375;');
      console.log('%c📱 Режим работы: localStorage (оффлайн)', 'font-size: 14px; color: #666;');
      console.log('%cℹ️  Приложение работает БЕЗ сервера - это нормально!', 'font-size: 12px; color: #999;');
      console.log('%c💾 Все данные сохраняются локально и безопасны', 'font-size: 12px; color: #999;');
      console.log('%c📖 Подробнее: см. файл OFFLINE_MODE.md', 'font-size: 12px; color: #999;');
      console.log('');
      
      try {
        // Initialize Telegram WebApp
        if (isTelegramWebApp()) {
          initTelegramWebApp();
          
          const telegramUser = getTelegramUser();
          if (telegramUser) {
            const userIdString = telegramUser.id.toString();
            setUserId(userIdString);

            // Register user if first time
            await registerUser(
              userIdString,
              telegramUser.first_name,
              telegramUser.last_name,
              telegramUser.username
            );

            // Load user's progress
            const progress = await getProgress(userIdString);
            setCompletedDays(progress);
          } else {
            // No user data from Telegram, use demo mode
            const demoUserId = 'demo_user';
            setUserId(demoUserId);
            const progress = await getProgress(demoUserId);
            setCompletedDays(progress);
          }
        } else {
          // For testing outside Telegram, use demo user
          console.log('🧪 Demo режим: работа вне Telegram');
          const demoUserId = 'demo_user';
          setUserId(demoUserId);
          const progress = await getProgress(demoUserId);
          setCompletedDays(progress);
        }
      } catch (err) {
        console.error('Initialization error:', err);
        setError('Ошибка инициализации');
        // Still set demo user to continue
        setUserId('demo_user');
      } finally {
        // Always stop loading after 2 seconds max
        setTimeout(() => setIsLoading(false), 100);
      }
    };

    initialize();
  }, []);

  // Save progress when completedDays changes (with debounce)
  useEffect(() => {
    if (userId && !isLoading && completedDays.length > 0) {
      const timeoutId = setTimeout(() => {
        saveProgress(userId, completedDays);
      }, 500);
      
      return () => clearTimeout(timeoutId);
    }
  }, [completedDays, userId, isLoading]);

  const toggleDay = (day: number) => {
    setCompletedDays(prev => {
      if (prev.includes(day)) {
        return prev.filter(d => d !== day);
      } else {
        const newCompleted = [...prev, day];
        if (newCompleted.length === 21) {
          setTimeout(() => setShowPrizeModal(true), 800);
        }
        return newCompleted;
      }
    });
  };

  const handleDayClick = (day: number, isUnlocked: boolean) => {
    if (isUnlocked) {
      setSelectedDay(day);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f5f7f5] to-white flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="relative">
            <img 
              src={logo} 
              alt="easyme" 
              className="w-20 h-20 mx-auto"
              style={{
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
              }}
            />
            <div className="absolute inset-0 w-20 h-20 mx-auto rounded-full bg-[#7a9375]/10 animate-ping" />
          </div>
          <p className="text-[#1d1d1f] opacity-60">Загрузка марафона...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e8f4e8] via-[#f5f9f5] to-[#fff9f0] overflow-hidden relative">
      {/* Premium background effects with Christmas vibes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#7a9375]/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-gradient-to-bl from-[#ffd700]/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-gradient-to-tr from-[#ff6b9d]/10 to-transparent rounded-full blur-3xl" />
        
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #7a9375 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }} />
      </div>

      {/* Enhanced Snowflakes - more festive! */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute text-[#7a9375]/30"
            style={{
              left: `${Math.random() * 100}%`,
              animation: `snowfall ${6 + Math.random() * 15}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
              fontSize: `${10 + Math.random() * 20}px`,
            }}
          >
            {['❄', '❅', '❆'][Math.floor(Math.random() * 3)]}
          </div>
        ))}
        
        {/* Floating sparkles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
              fontSize: `${12 + Math.random() * 12}px`,
              opacity: 0.6,
            }}
          >
            {['✨', '⭐', '💫'][Math.floor(Math.random() * 3)]}
          </div>
        ))}
      </div>

      {/* Logo - minimal and clean */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20">
        <img 
          src={logo} 
          alt="easyme" 
          className="w-14 h-14 drop-shadow-lg transition-transform hover:scale-105" 
        />
      </div>

      <Header completedDays={completedDays.length} />
      <AdventPath 
        completedDays={completedDays} 
        onToggleDay={toggleDay}
        onDayClick={handleDayClick}
      />
      
      <PrizeModal 
        isOpen={showPrizeModal} 
        onClose={() => setShowPrizeModal(false)} 
      />
      
      <TaskModal
        day={selectedDay}
        isCompleted={selectedDay ? completedDays.includes(selectedDay) : false}
        onClose={() => setSelectedDay(null)}
        onToggle={() => {
          if (selectedDay) {
            toggleDay(selectedDay);
          }
        }}
      />

      {/* Error notification */}
      {error && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-red-500/90 backdrop-blur-xl text-white px-6 py-3 rounded-full shadow-lg z-50">
          {error}
        </div>
      )}
    </div>
  );
}