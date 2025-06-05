import { StorageData } from '../types/quiz';

// localStorage utilities
export const StorageKeys = {
  HIGH_SCORE: 'quiz_high_score',
  QUIZ_DATA: 'quiz_app_data',
  SESSION_START: 'quiz_session_start'
} as const;

// Get high score from localStorage
export const getHighScore = (): number => {
  try {
    const score = localStorage.getItem(StorageKeys.HIGH_SCORE);
    return score ? parseInt(score, 10) : 0;
  } catch (error) {
    console.error('Error reading high score from localStorage:', error);
    return 0;
  }
};

// Save high score to localStorage
export const saveHighScore = (score: number): void => {
  try {
    localStorage.setItem(StorageKeys.HIGH_SCORE, score.toString());
  } catch (error) {
    console.error('Error saving high score to localStorage:', error);
  }
};

// Get quiz statistics from localStorage
export const getQuizData = (): StorageData => {
  try {
    const data = localStorage.getItem(StorageKeys.QUIZ_DATA);
    return data ? JSON.parse(data) : {
      highScore: 0,
      totalQuizzesCompleted: 0,
      averageTime: 0
    };
  } catch (error) {
    console.error('Error reading quiz data from localStorage:', error);
    return {
      highScore: 0,
      totalQuizzesCompleted: 0,
      averageTime: 0
    };
  }
};

// Save quiz statistics to localStorage
export const saveQuizData = (data: StorageData): void => {
  try {
    localStorage.setItem(StorageKeys.QUIZ_DATA, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving quiz data to localStorage:', error);
  }
};

// sessionStorage utilities for current session
export const setSessionStart = (timestamp: number): void => {
  try {
    sessionStorage.setItem(StorageKeys.SESSION_START, timestamp.toString());
  } catch (error) {
    console.error('Error saving session start to sessionStorage:', error);
  }
};

export const getSessionStart = (): number | null => {
  try {
    const timestamp = sessionStorage.getItem(StorageKeys.SESSION_START);
    return timestamp ? parseInt(timestamp, 10) : null;
  } catch (error) {
    console.error('Error reading session start from sessionStorage:', error);
    return null;
  }
};

export const clearSession = (): void => {
  try {
    sessionStorage.removeItem(StorageKeys.SESSION_START);
  } catch (error) {
    console.error('Error clearing session storage:', error);
  }
};