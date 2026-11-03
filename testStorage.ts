// Test storage utility for managing tests with unique codes

export interface Question {
  id: number;
  type: 'multiple-choice' | 'text';
  question: string;
  options?: string[];
  correctAnswer?: string;
  points: number;
}

export interface Test {
  id: string;
  code: string;
  title: string;
  duration: number;
  description: string;
  questions: Question[];
  createdAt: string;
  totalPoints: number;
  interfaceType?: 'standard' | 'survey' | 'timed';
}

export interface StudentAnswer {
  questionId: number;
  answer: string;
  isCorrect?: boolean;
  pointsEarned?: number;
}

export interface TestSubmission {
  testCode: string;
  studentName: string;
  answers: StudentAnswer[];
  submittedAt: string;
  totalScore: number;
  totalPoints: number;
  percentage: number;
  recordingId?: string; // Link to video recording
}

// Alias for convenience
export type Submission = TestSubmission;

export interface VideoRecording {
  key: string;
  blob: Blob;
  timestamp: string;
  size: number;
  testCode?: string;
  studentName?: string;
}

const TESTS_STORAGE_KEY = 'examguard_tests';
const SUBMISSIONS_STORAGE_KEY = 'examguard_submissions';

// Generate a unique test code (6 uppercase alphanumeric characters)
export const generateTestCode = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

// Save a test to localStorage
export const saveTest = (test: Omit<Test, 'id' | 'code' | 'createdAt' | 'totalPoints'>): Test => {
  const tests = getAllTests();
  
  // Calculate total points
  const totalPoints = test.questions.reduce((sum, q) => sum + q.points, 0);
  
  const newTest: Test = {
    id: Date.now().toString(),
    code: generateTestCode(),
    ...test,
    createdAt: new Date().toISOString(),
    totalPoints,
  };

  tests.push(newTest);
  localStorage.setItem(TESTS_STORAGE_KEY, JSON.stringify(tests));
  
  return newTest;
};

// Get all tests
export const getAllTests = (): Test[] => {
  const tests = localStorage.getItem(TESTS_STORAGE_KEY);
  return tests ? JSON.parse(tests) : [];
};

// Get test by code
export const getTestByCode = (code: string): Test | null => {
  const tests = getAllTests();
  return tests.find(t => t.code === code) || null;
};

// Get test by ID
export const getTestById = (id: string): Test | null => {
  const tests = getAllTests();
  return tests.find(t => t.id === id) || null;
};

// Delete a test
export const deleteTest = (code: string): boolean => {
  const tests = getAllTests();
  const filtered = tests.filter(t => t.code !== code);
  
  if (filtered.length < tests.length) {
    localStorage.setItem(TESTS_STORAGE_KEY, JSON.stringify(filtered));
    return true;
  }
  return false;
};

// Grade a test submission
export const gradeSubmission = (test: Test, answers: StudentAnswer[]): StudentAnswer[] => {
  return answers.map(answer => {
    const question = test.questions.find(q => q.id === answer.questionId);
    
    if (!question) {
      return answer;
    }

    let isCorrect = false;
    let pointsEarned = 0;

    if (question.type === 'multiple-choice') {
      isCorrect = answer.answer === question.correctAnswer;
      pointsEarned = isCorrect ? question.points : 0;
    } else {
      // For text answers, mark as pending (manual grading)
      isCorrect = false;
      pointsEarned = 0;
    }

    return {
      ...answer,
      isCorrect,
      pointsEarned,
    };
  });
};

// Save test submission
export const saveSubmission = (submission: TestSubmission): void => {
  const submissions = getAllSubmissions();
  submissions.push(submission);
  localStorage.setItem(SUBMISSIONS_STORAGE_KEY, JSON.stringify(submissions));
};

// Get all submissions
export const getAllSubmissions = (): TestSubmission[] => {
  const submissions = localStorage.getItem(SUBMISSIONS_STORAGE_KEY);
  return submissions ? JSON.parse(submissions) : [];
};

// Get submissions for a specific test
export const getSubmissionsByTestCode = (code: string): TestSubmission[] => {
  const submissions = getAllSubmissions();
  return submissions.filter(s => s.testCode === code);
};

// Calculate test statistics
export const calculateTestStats = (testCode: string) => {
  const submissions = getSubmissionsByTestCode(testCode);

  if (submissions.length === 0) {
    return {
      totalSubmissions: 0,
      averageScore: 0,
      highestScore: 0,
      lowestScore: 0,
    };
  }

  const scores = submissions.map(s => s.percentage);

  return {
    totalSubmissions: submissions.length,
    averageScore: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
    highestScore: Math.max(...scores),
    lowestScore: Math.min(...scores),
  };
};

// Get all submissions (alias for getAllSubmissions)
export const getSubmissions = (): TestSubmission[] => {
  return getAllSubmissions();
};

// Delete all submissions
export const deleteAllSubmissions = (): void => {
  localStorage.setItem(SUBMISSIONS_STORAGE_KEY, JSON.stringify([]));
};

// Delete a submission by test code and student name
export const deleteSubmission = (testCode: string, studentName: string): boolean => {
  const submissions = getAllSubmissions();
  const filtered = submissions.filter(s => !(s.testCode === testCode && s.studentName === studentName));

  if (filtered.length < submissions.length) {
    localStorage.setItem(SUBMISSIONS_STORAGE_KEY, JSON.stringify(filtered));
    return true;
  }
  return false;
};

// ============================================
// VIDEO RECORDING MANAGEMENT FUNCTIONS
// ============================================

/**
 * Get all video recordings from IndexedDB
 */
export const getAllRecordings = async (): Promise<VideoRecording[]> => {
  return new Promise((resolve, reject) => {
    try {
      const request = indexedDB.open('ExamGuardDB', 1);

      request.onerror = () => {
        console.error('IndexedDB error:', request.error);
        resolve([]);
      };

      request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction(['recordings'], 'readonly');
        const objectStore = transaction.objectStore('recordings');
        const getAllRequest = objectStore.getAll();

        getAllRequest.onsuccess = () => {
          resolve(getAllRequest.result || []);
        };

        getAllRequest.onerror = () => {
          console.error('Error getting recordings:', getAllRequest.error);
          resolve([]);
        };
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains('recordings')) {
          db.createObjectStore('recordings', { keyPath: 'key' });
        }
      };
    } catch (error) {
      console.error('Error accessing IndexedDB:', error);
      reject(error);
    }
  });
};

/**
 * Get a specific recording by key
 */
export const getRecordingByKey = async (key: string): Promise<VideoRecording | null> => {
  return new Promise((resolve, reject) => {
    try {
      const request = indexedDB.open('ExamGuardDB', 1);

      request.onerror = () => {
        console.error('IndexedDB error:', request.error);
        resolve(null);
      };

      request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction(['recordings'], 'readonly');
        const objectStore = transaction.objectStore('recordings');
        const getRequest = objectStore.get(key);

        getRequest.onsuccess = () => {
          resolve(getRequest.result || null);
        };

        getRequest.onerror = () => {
          console.error('Error getting recording:', getRequest.error);
          resolve(null);
        };
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains('recordings')) {
          db.createObjectStore('recordings', { keyPath: 'key' });
        }
      };
    } catch (error) {
      console.error('Error accessing IndexedDB:', error);
      reject(error);
    }
  });
};

/**
 * Delete a recording by key
 */
export const deleteRecording = async (key: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    try {
      const request = indexedDB.open('ExamGuardDB', 1);

      request.onerror = () => {
        console.error('IndexedDB error:', request.error);
        resolve(false);
      };

      request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction(['recordings'], 'readwrite');
        const objectStore = transaction.objectStore('recordings');
        const deleteRequest = objectStore.delete(key);

        deleteRequest.onsuccess = () => {
          console.log('Recording deleted:', key);
          resolve(true);
        };

        deleteRequest.onerror = () => {
          console.error('Error deleting recording:', deleteRequest.error);
          resolve(false);
        };
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains('recordings')) {
          db.createObjectStore('recordings', { keyPath: 'key' });
        }
      };
    } catch (error) {
      console.error('Error accessing IndexedDB:', error);
      reject(error);
    }
  });
};

/**
 * Update recording metadata (testCode, studentName)
 */
export const updateRecordingMetadata = async (
  key: string,
  testCode: string,
  studentName: string
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    try {
      const request = indexedDB.open('ExamGuardDB', 1);

      request.onerror = () => {
        console.error('IndexedDB error:', request.error);
        resolve(false);
      };

      request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction(['recordings'], 'readwrite');
        const objectStore = transaction.objectStore('recordings');
        const getRequest = objectStore.get(key);

        getRequest.onsuccess = () => {
          const recording = getRequest.result;
          if (recording) {
            recording.testCode = testCode;
            recording.studentName = studentName;
            const updateRequest = objectStore.put(recording);

            updateRequest.onsuccess = () => {
              console.log('Recording metadata updated:', key);
              resolve(true);
            };

            updateRequest.onerror = () => {
              console.error('Error updating recording:', updateRequest.error);
              resolve(false);
            };
          } else {
            resolve(false);
          }
        };

        getRequest.onerror = () => {
          console.error('Error getting recording:', getRequest.error);
          resolve(false);
        };
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains('recordings')) {
          db.createObjectStore('recordings', { keyPath: 'key' });
        }
      };
    } catch (error) {
      console.error('Error accessing IndexedDB:', error);
      reject(error);
    }
  });
};

