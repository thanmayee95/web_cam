/**
 * Attention Scoring System
 * Calculates focus/attention score based on head pose and gaze direction
 */

export interface HeadPose {
  yaw: number;   // Left-right rotation (-90 to 90)
  pitch: number; // Up-down rotation (-90 to 90)
  roll: number;  // Tilt (-90 to 90)
}

export interface AttentionMetrics {
  focusScore: number;        // 0-100: Overall focus score
  headPose: HeadPose;
  isLookingAtScreen: boolean;
  isDistracted: boolean;
  isLookingAway: boolean;
  timestamp: number;
}

export interface AlertEvent {
  type: 'distraction' | 'looking_away' | 'device_detected' | 'multiple_faces' | 'no_face';
  severity: 'low' | 'medium' | 'high';
  message: string;
  timestamp: number;
}

/**
 * Calculate attention score based on head pose
 * Returns 0-100 score where 100 is fully focused
 */
export const calculateAttentionScore = (headPose: HeadPose): number => {
  // Ideal position: yaw ~0, pitch ~0, roll ~0
  // Penalize deviation from ideal position
  
  const yawPenalty = Math.abs(headPose.yaw) / 90; // 0-1
  const pitchPenalty = Math.abs(headPose.pitch) / 90; // 0-1
  const rollPenalty = Math.abs(headPose.roll) / 45; // 0-1
  
  // Average penalty
  const avgPenalty = (yawPenalty + pitchPenalty + rollPenalty) / 3;
  
  // Convert to score (100 = perfect, 0 = completely turned away)
  const score = Math.max(0, 100 * (1 - avgPenalty));
  
  return Math.round(score);
};

/**
 * Determine if student is looking at screen
 */
export const isLookingAtScreen = (headPose: HeadPose): boolean => {
  // Looking at screen if:
  // - Yaw is between -45 and 45 degrees
  // - Pitch is between -30 and 30 degrees
  // - Roll is between -30 and 30 degrees
  
  return (
    Math.abs(headPose.yaw) <= 45 &&
    Math.abs(headPose.pitch) <= 30 &&
    Math.abs(headPose.roll) <= 30
  );
};

/**
 * Determine if student is distracted (looking away but not completely)
 */
export const isDistracted = (headPose: HeadPose): boolean => {
  // Distracted if:
  // - Yaw is between 45 and 90 degrees (looking to side)
  // - Or pitch is between 30 and 60 degrees (looking down/up)
  
  const yawDistracted = Math.abs(headPose.yaw) > 45 && Math.abs(headPose.yaw) <= 75;
  const pitchDistracted = Math.abs(headPose.pitch) > 30 && Math.abs(headPose.pitch) <= 60;
  
  return yawDistracted || pitchDistracted;
};

/**
 * Determine if student is looking away (completely turned away)
 */
export const isLookingAway = (headPose: HeadPose): boolean => {
  // Looking away if:
  // - Yaw is > 75 degrees (turned away)
  // - Or pitch is > 60 degrees (looking far up/down)
  
  return Math.abs(headPose.yaw) > 75 || Math.abs(headPose.pitch) > 60;
};

/**
 * Generate alert based on attention metrics
 */
export const generateAlert = (
  metrics: AttentionMetrics,
  previousScore: number
): AlertEvent | null => {
  // Alert for looking away
  if (metrics.isLookingAway) {
    return {
      type: 'looking_away',
      severity: 'high',
      message: 'Student is looking away from screen',
      timestamp: metrics.timestamp,
    };
  }
  
  // Alert for distraction
  if (metrics.isDistracted && metrics.focusScore < 40) {
    return {
      type: 'distraction',
      severity: 'medium',
      message: 'Student appears distracted',
      timestamp: metrics.timestamp,
    };
  }
  
  // Alert for sudden drop in focus
  if (previousScore - metrics.focusScore > 30) {
    return {
      type: 'distraction',
      severity: 'medium',
      message: 'Sudden drop in focus detected',
      timestamp: metrics.timestamp,
    };
  }
  
  return null;
};

/**
 * Calculate average attention score over time window
 */
export const calculateAverageScore = (scores: number[], windowSize: number = 30): number => {
  if (scores.length === 0) return 0;
  
  const recentScores = scores.slice(-windowSize);
  const sum = recentScores.reduce((a, b) => a + b, 0);
  
  return Math.round(sum / recentScores.length);
};

/**
 * Determine focus level based on score
 */
export const getFocusLevel = (score: number): 'focused' | 'distracted' | 'away' => {
  if (score >= 70) return 'focused';
  if (score >= 40) return 'distracted';
  return 'away';
};

/**
 * Get color for focus level
 */
export const getFocusColor = (level: 'focused' | 'distracted' | 'away'): string => {
  switch (level) {
    case 'focused':
      return '#10b981'; // Green
    case 'distracted':
      return '#f59e0b'; // Amber
    case 'away':
      return '#ef4444'; // Red
  }
};

