import React from 'react';
import { Trophy, Star, Clock, RotateCcw, Target } from 'lucide-react';
import { QuizResult } from '../types/quiz';

interface ResultProps {
  result: QuizResult;
  totalQuestions: number;
  onPlayAgain: () => void;
}

const Result: React.FC<ResultProps> = ({ result, totalQuestions, onPlayAgain }) => {
  // Format time display
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs}s`;
  };

  // Get performance message based on score percentage
  const getPerformanceMessage = (percentage: number): { message: string; color: string; icon: React.ReactElement } => {
    if (percentage >= 80) {
      return {
        message: "Outstanding! You're a quiz master! 🏆",
        color: "text-green-600",
        icon: <Trophy className="w-8 h-8 text-yellow-500" />
      };
    } else if (percentage >= 60) {
      return {
        message: "Great job! Well done! 👏",
        color: "text-blue-600",
        icon: <Star className="w-8 h-8 text-blue-500" />
      };
    } else {
      return {
        message: "Good effort! Keep practicing! 💪",
        color: "text-purple-600",
        icon: <Target className="w-8 h-8 text-purple-500" />
      };
    }
  };

  const performanceData = getPerformanceMessage(result.percentage);

  return (
    <div className="w-full max-w-2xl mx-auto animate-bounce-in">
      {/* New High Score Celebration */}
      {result.isNewHighScore && (
        <div className="mb-6 p-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl text-white text-center shadow-lg animate-pulse-slow">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Trophy className="w-6 h-6" />
            <span className="text-lg font-bold">🎉 NEW HIGH SCORE! 🎉</span>
            <Trophy className="w-6 h-6" />
          </div>
          <p className="text-sm opacity-90">You've set a new personal record!</p>
        </div>
      )}

      {/* Main Results Card */}
      <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            {performanceData.icon}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Quiz Complete!
          </h1>
          <p className={`text-lg font-semibold ${performanceData.color}`}>
            {performanceData.message}
          </p>
        </div>

        {/* Score Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Base Score */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {result.baseScore}/{totalQuestions}
            </div>
            <div className="text-blue-800 font-medium">Correct Answers</div>
            <div className="text-sm text-blue-600 mt-1">
              {result.percentage.toFixed(1)}% Accuracy
            </div>
          </div>

          {/* Time Taken */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="w-6 h-6 text-purple-600 mr-2" />
              <span className="text-3xl font-bold text-purple-600">
                {formatTime(result.timeTaken)}
              </span>
            </div>
            <div className="text-purple-800 font-medium">Time Taken</div>
            <div className="text-sm text-purple-600 mt-1">
              {(result.timeTaken / totalQuestions).toFixed(1)}s per question
            </div>
          </div>
        </div>

        {/* Bonus Score Calculation */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-bold text-green-800 mb-4 flex items-center">
            <Star className="w-5 h-5 mr-2" />
            Score Breakdown
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-green-700">Base Score:</span>
              <span className="font-semibold text-green-800">{result.baseScore} points</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-green-700">Speed Bonus:</span>
              <span className="font-semibold text-green-800">+{result.bonusScore} points</span>
            </div>
            <div className="border-t border-green-200 pt-3">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-green-800">Final Score:</span>
                <span className="text-2xl font-bold text-green-800">{result.finalScore} points</span>
              </div>
            </div>
          </div>
          <div className="mt-4 text-xs text-green-600 bg-green-100 rounded-lg p-3">
            <strong>Speed Bonus Formula:</strong> Math.floor((correctAnswers × 1000) / timeTaken)
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center">
          <button
            onClick={onPlayAgain}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Play Again
          </button>
        </div>

        {/* Fun Statistics */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-600">{result.percentage.toFixed(0)}%</div>
              <div className="text-xs text-gray-500">Accuracy</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-600">{(result.timeTaken / totalQuestions).toFixed(1)}s</div>
              <div className="text-xs text-gray-500">Avg/Question</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-600">{result.finalScore}</div>
              <div className="text-xs text-gray-500">Total Points</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;