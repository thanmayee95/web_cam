/**
 * Device Detection System
 * Detects mobile phones and unauthorized devices in the frame
 */

export interface DetectedObject {
  class: string;
  score: number;
  bbox: [number, number, number, number]; // [x, y, width, height]
}

export interface DeviceDetectionResult {
  devicesDetected: DetectedObject[];
  hasPhone: boolean;
  hasTablet: boolean;
  hasOtherDevice: boolean;
  confidence: number;
  timestamp: number;
}

// Classes that indicate unauthorized devices
const UNAUTHORIZED_DEVICES = [
  'cell phone',
  'mobile phone',
  'phone',
  'smartphone',
  'tablet',
  'ipad',
  'laptop',
  'computer',
  'monitor',
  'keyboard',
  'mouse',
  'book',
  'paper',
  'document',
];

/**
 * Check if detected object is an unauthorized device
 */
export const isUnauthorizedDevice = (className: string): boolean => {
  const lowerClass = className.toLowerCase();
  return UNAUTHORIZED_DEVICES.some(device => lowerClass.includes(device));
};

/**
 * Categorize detected device
 */
export const categorizeDevice = (className: string): 'phone' | 'tablet' | 'other' | null => {
  const lowerClass = className.toLowerCase();
  
  if (lowerClass.includes('phone') || lowerClass.includes('cell')) {
    return 'phone';
  }
  
  if (lowerClass.includes('tablet') || lowerClass.includes('ipad')) {
    return 'tablet';
  }
  
  if (isUnauthorizedDevice(className)) {
    return 'other';
  }
  
  return null;
};

/**
 * Process COCO-SSD detection results
 */
export const processDetections = (
  predictions: DetectedObject[],
  confidenceThreshold: number = 0.5
): DeviceDetectionResult => {
  const devicesDetected: DetectedObject[] = [];
  let hasPhone = false;
  let hasTablet = false;
  let hasOtherDevice = false;
  
  for (const prediction of predictions) {
    if (prediction.score >= confidenceThreshold) {
      const device = categorizeDevice(prediction.class);
      
      if (device) {
        devicesDetected.push(prediction);
        
        if (device === 'phone') hasPhone = true;
        if (device === 'tablet') hasTablet = true;
        if (device === 'other') hasOtherDevice = true;
      }
    }
  }
  
  // Calculate average confidence
  const confidence = devicesDetected.length > 0
    ? devicesDetected.reduce((sum, d) => sum + d.score, 0) / devicesDetected.length
    : 0;
  
  return {
    devicesDetected,
    hasPhone,
    hasTablet,
    hasOtherDevice,
    confidence,
    timestamp: Date.now(),
  };
};

/**
 * Check if device is in frame center (suspicious)
 */
export const isDeviceInFrameCenter = (
  bbox: [number, number, number, number],
  frameWidth: number,
  frameHeight: number,
  centerThreshold: number = 0.3
): boolean => {
  const [x, y, width, height] = bbox;
  const centerX = x + width / 2;
  const centerY = y + height / 2;
  
  const frameCenterX = frameWidth / 2;
  const frameCenterY = frameHeight / 2;
  
  const distX = Math.abs(centerX - frameCenterX) / frameCenterX;
  const distY = Math.abs(centerY - frameCenterY) / frameHeight;
  
  return distX < centerThreshold && distY < centerThreshold;
};

/**
 * Calculate device detection severity
 */
export const getDeviceSeverity = (result: DeviceDetectionResult): 'low' | 'medium' | 'high' => {
  if (!result.devicesDetected.length) return 'low';
  
  // High severity: phone detected with high confidence
  if (result.hasPhone && result.confidence > 0.7) return 'high';
  
  // Medium severity: any device detected
  if (result.devicesDetected.length > 0) return 'medium';
  
  return 'low';
};

/**
 * Generate device detection message
 */
export const getDeviceMessage = (result: DeviceDetectionResult): string => {
  if (!result.devicesDetected.length) {
    return 'No unauthorized devices detected';
  }
  
  const devices = result.devicesDetected
    .map(d => d.class)
    .filter((v, i, a) => a.indexOf(v) === i) // Remove duplicates
    .join(', ');
  
  return `Detected: ${devices}`;
};

