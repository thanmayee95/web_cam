// Alert storage utility for managing test alerts and monitoring events

export interface TestAlert {
  id: string;
  testCode: string;
  studentName: string;
  timestamp: string;
  // include external_device for connected phones / bluetooth speakers detection
  type: 'camera_covered' | 'camera_off' | 'tab_switch' | 'face_not_visible' | 'multiple_faces' | 'suspicious_activity' | 'external_device';
  message: string;
  severity: 'low' | 'medium' | 'high';
}

export interface TestSession {
  testCode: string;
  studentName: string;
  startTime: string;
  endTime?: string;
  alerts: TestAlert[];
  attentionScore: number; // 0-100
  status: 'active' | 'completed' | 'terminated';
  // optional device information captured when session starts
  deviceInfo?: {
    isMobile?: boolean;
    userAgent?: string;
    // names/labels of connected devices detected during the session
    detectedDevices?: string[];
  };
}

const STORAGE_KEY = 'examguard_alerts';
const SESSION_KEY = 'examguard_sessions';

export function saveAlert(alert: TestAlert): void {
  const alerts = getAlerts();
  alerts.push(alert);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(alerts));
}

export function getAlerts(): TestAlert[] {
  const alerts = localStorage.getItem(STORAGE_KEY);
  return alerts ? JSON.parse(alerts) : [];
}

export function getAlertsByTest(testCode: string): TestAlert[] {
  return getAlerts().filter(alert => alert.testCode === testCode);
}

export function getAlertsByStudent(testCode: string, studentName: string): TestAlert[] {
  return getAlerts().filter(
    alert => alert.testCode === testCode && alert.studentName === studentName
  );
}

export function saveSession(session: TestSession): void {
  const sessions = getSessions();
  const existingIndex = sessions.findIndex(
    s => s.testCode === session.testCode && s.studentName === session.studentName
  );
  
  if (existingIndex >= 0) {
    sessions[existingIndex] = session;
  } else {
    sessions.push(session);
  }
  
  localStorage.setItem(SESSION_KEY, JSON.stringify(sessions));
}

export function getSessions(): TestSession[] {
  const sessions = localStorage.getItem(SESSION_KEY);
  return sessions ? JSON.parse(sessions) : [];
}

export function getSessionsByTest(testCode: string): TestSession[] {
  return getSessions().filter(session => session.testCode === testCode);
}

export function generateAlertId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

export function createAlert(
  testCode: string,
  studentName: string,
  type: TestAlert['type'],
  message: string,
  severity: TestAlert['severity']
): TestAlert {
  return {
    id: generateAlertId(),
    testCode,
    studentName,
    timestamp: new Date().toISOString(),
    type,
    message,
    severity
  };
}