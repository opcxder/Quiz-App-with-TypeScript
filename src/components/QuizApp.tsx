import React, { useState, useEffect, useCallback } from 'react';
import { Brain } from 'lucide-react';
import { QuizState, QuizResult } from '../types/quiz';
import { quizQuestions } from '../data/questions';
import { 
  getHighScore, 
  saveHighScore, 
  setSessionStart, 
  getSessionStart, 
  clearSession,
  getQuizData,
  saveQuizData 
} from '../utils/storage';
import Question from './Question';
import Result from './Result';
import Timer from './Timer';

const QuizApp: React.FC = () => {
  // Quiz state management
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    selectedAnswer: null,
    score: 0,
    showResult: false,
    startTime: null,
    endTime: null,
    answers: new Array(quizQuestions.length).fill(null)
  });

  // UI state
  const [showAnswerFeedback, setShowAnswerFeedback] = useState<boolean>(false);
  const [highScore, setHighScore] = useState<number>(0);
  const [quizStarted, setQuizStarted] = useState<boolean>(false);

  // Initialize quiz data on component mount
  useEffect(() => {
    const savedHighScore = getHighScore();
    setHighScore(savedHighScore);
  }, []);

  // Start quiz function
  const startQuiz = useCallback(() => {
    const startTime = Date.now();
    setSessionStart(startTime); // Save to sessionStorage
    
    setQuizState({
      currentQuestion: 0,
      selectedAnswer: null,
      score: 0,
      showResult: false,
      startTime,
      endTime: null,
      answers: new Array(quizQuestions.length).fill(null)
    });
    
    setShowAnswerFeedback(false);
    setQuizStarted(true);
  }, []);

  // Handle answer selection
  const handleAnswerSelect = useCallback((answerIndex: number) => {
    if (quizState.selectedAnswer !== null || showAnswerFeedback) return;

    // Update selected answer
    setQuizState(prev => ({
      ...prev,
      selectedAnswer: answerIndex,
      answers: prev.answers.map((answer, index) => 
        index === prev.currentQuestion ? answerIndex : answer
      )
    }));

    setShowAnswerFeedback(true);

    // Check if answer is correct and update score
    const isCorrect = answerIndex === quizQuestions[quizState.currentQuestion].correct;
    if (isCorrect) {
      setQuizState(prev => ({ ...prev, score: prev.score + 1 }));
    }

            // Auto-advance after showing feedback
    setTimeout(() => {
      if (quizState.currentQuestion < quizQuestions.length - 1) {
        // Move to next question
        setQuizState(prev => ({
          ...prev,
          currentQuestion: prev.currentQuestion + 1,
          selectedAnswer: null
        }));
        setShowAnswerFeedback(false);
      } else {
        // Quiz completed - show results
        const endTime = Date.now();
        setQuizState(prev => ({ ...prev, endTime, showResult: true }));
      }
    }, 1500);
  }, [quizState.currentQuestion, quizState.selectedAnswer, showAnswerFeedback]);

  // Calculate quiz results
  const calculateResults = useCallback((): QuizResult => {
    const timeTaken = Math.floor((quizState.endTime! - quizState.startTime!) / 1000);
    const baseScore = quizState.score;
    const bonusScore = Math.floor((quizState.score * 1000) / timeTaken);
    const finalScore = baseScore + bonusScore;
    const percentage = (baseScore / quizQuestions.length) * 100;
    
    // Check and update high score
    const isNewHighScore = finalScore > highScore;
    if (isNewHighScore) {
      setHighScore(finalScore);
      saveHighScore(finalScore);
      
      // Update quiz statistics
      const quizData = getQuizData();
      const updatedData = {
        highScore: finalScore,
        totalQuizzesCompleted: quizData.totalQuizzesCompleted + 1,
        averageTime: quizData.totalQuizzesCompleted === 0 
          ? timeTaken 
          : Math.round((quizData.averageTime * quizData.totalQuizzesCompleted + timeTaken) / (quizData.totalQuizzesCompleted + 1))
      };
      saveQuizData(updatedData);
    }

    return {
      baseScore,
      bonusScore,
      finalScore,
      timeTaken,
      percentage,
      isNewHighScore
    };
  }, [quizState.endTime, quizState.startTime, quizState.score, highScore]);

  // Reset quiz for play again
  const handlePlayAgain = useCallback(() => {
    clearSession(); // Clear sessionStorage
    setQuizStarted(false);
    setShowAnswerFeedback(false);
    setQuizState({
      currentQuestion: 0,
      selectedAnswer: null,
      score: 0,
      showResult: false,
      startTime: null,
      endTime: null,
      answers: new Array(quizQuestions.length).fill(null)
    });
  }, []);

  // Render quiz start screen
  if (!quizStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 animate-bounce-in">
            <div className="flex justify-center mb-6">
              <Brain className="w-16 h-16 text-purple-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Quiz Master
            </h1>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Test your knowledge with 5 challenging questions. 
              Your score will be calculated based on accuracy and speed!
            </p>
            
            {/* High Score Display */}
            {highScore > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-center">
                  <span className="text-yellow-800 font-semibold">
                    🏆 High Score: {highScore} points
                  </span>
                </div>
              </div>
            )}

            <button
              onClick={startQuiz}
              className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300"
            >
              Start Quiz
            </button>
            
            {/* Quiz Info */}
            <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="font-semibold text-gray-800">Questions</div>
                <div className="text-gray-600">{quizQuestions.length}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="font-semibold text-gray-800">Format</div>
                <div className="text-gray-600">Multiple Choice</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render quiz results
  if (quizState.showResult) {
    const results = calculateResults();
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Result 
          result={results}
          totalQuestions={quizQuestions.length}
          onPlayAgain={handlePlayAgain}
        />
      </div>
    );
  }

  // Render active quiz
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* Header with timer */}
      <div className="w-full max-w-4xl mx-auto mb-6 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Brain className="w-8 h-8 text-white" />
          <h1 className="text-2xl font-bold text-white">Quiz Master</h1>
        </div>
        <Timer 
          startTime={quizState.startTime}
          isRunning={!quizState.showResult}
        />
      </div>

      {/* Question Component */}
      <Question
        question={quizQuestions[quizState.currentQuestion]}
        currentIndex={quizState.currentQuestion}
        totalQuestions={quizQuestions.length}
        selectedAnswer={quizState.selectedAnswer}
        showFeedback={showAnswerFeedback}
        onAnswerSelect={handleAnswerSelect}
      />
    </div>
  );
};

export default QuizApp;