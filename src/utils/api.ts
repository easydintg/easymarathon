import { projectId, publicAnonKey } from './supabase/info.tsx';

const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-0f55acfc`;

interface ProgressData {
  completedDays: number[];
  lastUpdated: string;
}

// Get user progress from server
export const getProgress = async (userId: string): Promise<number[]> => {
  try {
    // Add timeout to prevent infinite loading
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    const response = await fetch(`${API_URL}/progress/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.log('📡 Server returned non-OK status, using local storage');
      throw new Error(`Server responded with ${response.status}`);
    }

    const data: ProgressData = await response.json();
    console.log('✅ Progress loaded from server');
    return data.completedDays || [];
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      console.log('⏱️ Server timeout - using local storage (normal for local development)');
    } else {
      console.log('📱 Server unavailable - using local storage (offline mode)');
    }
    
    // Fallback to localStorage
    try {
      const localProgress = localStorage.getItem(`easyme_progress_${userId}`);
      if (localProgress) {
        console.log('💾 Progress restored from local storage');
      }
      return localProgress ? JSON.parse(localProgress) : [];
    } catch {
      return [];
    }
  }
};

// Save user progress to server
export const saveProgress = async (userId: string, completedDays: number[]): Promise<boolean> => {
  // Always save to localStorage first for immediate feedback
  try {
    localStorage.setItem(`easyme_progress_${userId}`, JSON.stringify(completedDays));
    console.log('💾 Progress saved to local storage');
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(`${API_URL}/progress/${userId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completedDays }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json();
      console.log('📡 Server save failed, but local storage is updated');
      return false;
    }

    const result = await response.json();
    console.log('✅ Progress synced to server');
    return true;
  } catch (error) {
    // Don't show error - local storage is working fine
    console.log('📱 Server sync skipped (offline mode, data is safe locally)');
    return false;
  }
};

// Register user (first time)
export const registerUser = async (
  userId: string,
  firstName: string,
  lastName?: string,
  username?: string
): Promise<boolean> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(`${API_URL}/user/${userId}/register`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName, lastName, username }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error('Failed to register user:', response.status);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error registering user:', error);
    return false;
  }
};