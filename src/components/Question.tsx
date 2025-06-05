import React from 'react';
import { Question as QuestionType } from '../types/quiz';

interface QuestionProps {
  question: QuestionType;
  currentIndex: number;
  totalQuestions: number;
  selectedAnswer: number | null;
  showFeedback: boolean;
  onAnswerSelect: (answerIndex: number) => void;
}

const Question: React.FC<QuestionProps> = ({
  question,
  currentIndex,
  totalQuestions,
  selectedAnswer,
  showFeedback,
  onAnswerSelect
}) => {
  // Get option styling based on selection and correctness
  const getOptionStyle = (optionIndex: number): string => {
    const baseStyle = "option-card w-full p-4 text-left rounded-xl border-2 font-medium transition-all duration-300 transform hover:scale-105 cursor-pointer";
    
    if (!showFeedback) {
      // Before answer is shown
      if (selectedAnswer === optionIndex) {
        return `${baseStyle} bg-blue-500 text-white border-blue-600 shadow-lg`;
      }
      return `${baseStyle} bg-white hover:bg-blue-50 border-gray-200 hover:border-blue-300 text-gray-800`;
    } else {
      // After answer is shown
      if (optionIndex === question.correct) {
        return `${baseStyle} success-gradient text-white border-green-500 shadow-lg`;
      } else if (selectedAnswer === optionIndex && optionIndex !== question.correct) {
        return `${baseStyle} error-gradient text-white border-red-500 shadow-lg`;
      }
      return `${baseStyle} bg-gray-100 text-gray-500 border-gray-300 cursor-not-allowed`;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-slide-up">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-white text-sm mb-2">
          <span>Question {currentIndex + 1} of {totalQuestions}</span>
          <span>{Math.round(((currentIndex + 1) / totalQuestions) * 100)}%</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div 
            className="bg-white h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 leading-relaxed">
          {question.question}
        </h2>

        {/* Options Grid - Responsive Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {question.options.map((option, index) => (
            <button
              key={index}
              className={getOptionStyle(index)}
              onClick={() => onAnswerSelect(index)}
              disabled={showFeedback}
            >
              <span className="flex items-center">
                <span className="w-8 h-8 rounded-full bg-current bg-opacity-20 flex items-center justify-center mr-3 text-sm font-bold">
                  {String.fromCharCode(65 + index)}
                </span>
                {option}
              </span>
            </button>
          ))}
        </div>

        {/* Answer Explanation */}
        {showFeedback && question.explanation && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400 animate-fade-in">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700 font-medium">
                  {question.explanation}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Question;