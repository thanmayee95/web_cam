// Authentication and access control for test creators

export interface TestCreator {
  id: string;
  email: string;
  name: string;
  createdTests: string[]; // Array of test codes created by this user
}

const CREATORS_STORAGE_KEY = 'examguard_creators';

// Store test creator info and their created tests
export function saveTestCreator(testCode: string, creatorInfo: TestCreator): void {
  const creators = getTestCreators();
  const existingCreator = creators.find(c => c.id === creatorInfo.id);
  
  if (existingCreator) {
    existingCreator.createdTests.push(testCode);
    localStorage.setItem(CREATORS_STORAGE_KEY, JSON.stringify(creators));
  } else {
    creators.push({
      ...creatorInfo,
      createdTests: [testCode]
    });
    localStorage.setItem(CREATORS_STORAGE_KEY, JSON.stringify(creators));
  }
}

export function getTestCreators(): TestCreator[] {
  const creators = localStorage.getItem(CREATORS_STORAGE_KEY);
  return creators ? JSON.parse(creators) : [];
}

// Check if a user is the creator of a specific test
export function isTestCreator(testCode: string, creatorId: string): boolean {
  const creators = getTestCreators();
  const creator = creators.find(c => c.id === creatorId);
  return creator ? creator.createdTests.includes(testCode) : false;
}

// Get creator info for a specific test
export function getTestCreatorInfo(testCode: string): TestCreator | null {
  const creators = getTestCreators();
  return creators.find(c => c.createdTests.includes(testCode)) || null;
}

// Create a mock login session for test creators
export function createCreatorSession(email: string, name: string): TestCreator {
  const creator: TestCreator = {
    id: Date.now().toString(),
    email,
    name,
    createdTests: []
  };
  
  const creators = getTestCreators();
  const existing = creators.find(c => c.email === email);
  if (!existing) {
    creators.push(creator);
    localStorage.setItem(CREATORS_STORAGE_KEY, JSON.stringify(creators));
  }
  
  localStorage.setItem('current_creator', JSON.stringify(existing || creator));
  return existing || creator;
}

// Get current logged in creator
export function getCurrentCreator(): TestCreator | null {
  const current = localStorage.getItem('current_creator');
  return current ? JSON.parse(current) : null;
}

// Log out creator
export function logoutCreator(): void {
  localStorage.removeItem('current_creator');
}