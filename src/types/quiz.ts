// Type definitions for the quiz application
export interface Question {
    id: number;
    question: string;
    options: string[];
    correct: number;
    explanation?: string;
  }
  
  export interface QuizState {
    currentQuestion: number;
    selectedAnswer: number | null;
    score: number;
    showResult: boolean;
    startTime: number | null;
    endTime: number | null;
    answers: (number | null)[];
  }
  
  export interface QuizResult {
    baseScore: number;
    bonusScore: number;
    finalScore: number;
    timeTaken: number;
    percentage: number;
    isNewHighScore: boolean;
  }
  
  export interface StorageData {
    highScore: number;
    totalQuizzesCompleted: number;
    averageTime: number;
  }