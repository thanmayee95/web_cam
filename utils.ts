import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface Test {
  id: string;
  code: string;
  title: string;
  duration: string;
  description: string;
  questions: {
    id: number;
    text: string;
    type: 'multiple-choice' | 'text';
    options?: string[];
    correctAnswer: string | number;
    points: number;
  }[];
  interfaceType?: 'standard' | 'survey' | 'timed';
  createdAt: string;
  // optional creator email (Gmail) used to associate tests with creators
  creatorEmail?: string;
}

export function generateTestCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export function saveTest(test: Test): void {
  const tests = getTests();
  tests.push(test);
  localStorage.setItem('examguard_tests', JSON.stringify(tests));
}

export function getTests(): Test[] {
  const tests = localStorage.getItem('examguard_tests');
  return tests ? JSON.parse(tests) : [];
}

export function getTestByCode(code: string): Test | null {
  const tests = getTests();
  return tests.find(test => test.code === code) || null;
}

export interface GradedAnswer {
  answer: string | number;
  isCorrect: boolean;
  pointsEarned: number;
  maxPoints: number;
  questionType: string;
  correctAnswer: string | number;
}

export function gradeSubmission(test: Test, studentAnswers: (string | number)[]): GradedAnswer[] {
  return studentAnswers.map((answer, index) => {
    const question = test.questions[index];
    let isCorrect = false;
    let pointsEarned = 0;

    // Handle empty or undefined answers
    if (answer === undefined || answer === null || answer === '') {
      return {
        answer: '',
        isCorrect: false,
        pointsEarned: 0,
        maxPoints: question.points || 0,
        questionType: question.type,
        correctAnswer: question.correctAnswer
      };
    }

    // Determine the canonical correct answer value.
    // Some tests store correctAnswer as an index (number) and some as the option text (string).
    let canonicalCorrect: string | number = question.correctAnswer;
    if (typeof question.correctAnswer === 'number' && question.options && question.options.length > (question.correctAnswer as number)) {
      // Map numeric index to the option text
      canonicalCorrect = question.options[question.correctAnswer as number];
    }

    // Compare selected option with correct answer (string compare)
    isCorrect = answer.toString() === String(canonicalCorrect);
    pointsEarned = isCorrect ? (question.points || 0) : 0;

    return {
      answer,
      isCorrect,
      pointsEarned,
      maxPoints: question.points || 0,
      questionType: question.type,
      correctAnswer: question.correctAnswer
    };
  });
}
