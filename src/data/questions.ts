import { Question } from '../types/quiz';

export const quizQuestions: Question[] = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correct: 2,
    explanation: "Paris is the capital and most populous city of France."
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correct: 1,
    explanation: "Mars is called the Red Planet due to its reddish appearance from iron oxide on its surface."
  },
  {
    id: 3,
    question: "What is 15 × 8?",
    options: ["110", "120", "130", "140"],
    correct: 1,
    explanation: "15 × 8 = 120. This is a basic multiplication problem."
  },
  {
    id: 4,
    question: "Who painted the Mona Lisa?",
    options: ["Van Gogh", "Picasso", "Leonardo da Vinci", "Michelangelo"],
    correct: 2,
    explanation: "Leonardo da Vinci painted the Mona Lisa between 1503 and 1519."
  },
  {
    id: 5,
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    correct: 3,
    explanation: "The Pacific Ocean is the largest ocean, covering about 46% of the world's water surface."
  }
];