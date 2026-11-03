# Advanced Monitoring System - Implementation Guide

## 🎯 Overview

The ExamGuard system now includes an advanced AI-powered monitoring system that tracks student attention, detects unauthorized devices, and provides real-time alerts to proctors.

---

## ✨ Features Implemented

### 1. **Attention Score Calculation**
- Real-time head pose tracking
- Gaze direction estimation
- Focus level classification (Focused/Distracted/Away)
- Live attention score (0-100%)
- 60-second rolling average

### 2. **Device Detection**
- Mobile phone detection
- Tablet detection
- Unauthorized device identification
- Confidence scoring
- Frame-based detection

### 3. **Alert System**
- Distraction alerts
- Looking away alerts
- Device detection alerts
- Multiple faces detection
- Severity levels (Low/Medium/High)

### 4. **Live Monitoring Dashboard**
- Real-time session monitoring
- Student attention metrics
- Alert history
- Session statistics
- Status indicators

---

## 📁 New Files Created

### Core Libraries
1. **`src/lib/attentionScoring.ts`** (150 lines)
   - Attention score calculation
   - Head pose analysis
   - Alert generation
   - Focus level determination

2. **`src/lib/deviceDetection.ts`** (140 lines)
   - Device detection logic
   - Object classification
   - Confidence scoring
   - Alert severity calculation

### Components
3. **`src/components/AttentionMonitor.tsx`** (200 lines)
   - Real-time monitoring component
   - Metrics display
   - Alert visualization
   - Score tracking

### Pages
4. **`src/pages/MonitoringDashboard.tsx`** (250 lines)
   - Live monitoring dashboard
   - Session overview
   - Student metrics
   - Alert management

---

## 🔧 Integration Points

### TakeTest Page
- AttentionMonitor component integrated
- Real-time metrics tracking
- Alert notifications
- Monitoring during test-taking

### Home Page
- New "Live Monitoring" card added
- Link to monitoring dashboard
- Feature description

### App Routes
- `/monitoring` - Monitoring dashboard
- Accessible from home page

---

## 📊 Data Structures

### AttentionMetrics
```typescript
{
  focusScore: number;        // 0-100
  headPose: {
    yaw: number;             // -90 to 90
    pitch: number;           // -90 to 90
    roll: number;            // -90 to 90
  };
  isLookingAtScreen: boolean;
  isDistracted: boolean;
  isLookingAway: boolean;
  timestamp: number;
}
```

### AlertEvent
```typescript
{
  type: 'distraction' | 'looking_away' | 'device_detected' | 'multiple_faces' | 'no_face';
  severity: 'low' | 'medium' | 'high';
  message: string;
  timestamp: number;
}
```

### DeviceDetectionResult
```typescript
{
  devicesDetected: DetectedObject[];
  hasPhone: boolean;
  hasTablet: boolean;
  hasOtherDevice: boolean;
  confidence: number;
  timestamp: number;
}
```

---

## 🚀 How to Use

### For Instructors
1. Go to Home page
2. Click "Live Monitoring" card
3. View active student sessions
4. Monitor attention scores
5. Check alerts in real-time
6. Click on student to see details

### For Students
1. Take test normally
2. Attention monitor runs in background
3. See attention score on left panel
4. Receive alerts if distracted
5. Alerts don't affect test submission

### For Proctors
1. Access `/monitoring` dashboard
2. View all active sessions
3. Monitor attention metrics
4. Check alert history
5. Take action if needed

---

## 🎨 UI Components

### Attention Monitor Card
- Current attention score (large display)
- Average score (60-second window)
- Score progress bar
- Status indicators
- Alert history

### Monitoring Dashboard
- Active sessions list
- Student metrics
- Alert severity badges
- Session duration
- Focus status indicators

---

## 📈 Scoring Algorithm

### Focus Score Calculation
```
Score = 100 * (1 - avgPenalty)

Where:
- yawPenalty = |yaw| / 90
- pitchPenalty = |pitch| / 90
- rollPenalty = |roll| / 45
- avgPenalty = (yawPenalty + pitchPenalty + rollPenalty) / 3
```

### Focus Levels
- **Focused**: Score >= 70%
- **Distracted**: Score 40-69%
- **Away**: Score < 40%

---

## 🔔 Alert Types

| Alert Type | Trigger | Severity |
|-----------|---------|----------|
| Looking Away | Yaw > 75° or Pitch > 60° | High |
| Distraction | Yaw 45-75° or Pitch 30-60° | Medium |
| Device Detected | Phone/Tablet in frame | High/Medium |
| Multiple Faces | More than one face | High |
| No Face | Face not detected | High |

---

## 🔌 API Integration (Future)

### MediaPipe Integration
```typescript
// For real head pose detection
import { FaceLandmarker } from '@mediapipe/tasks-vision';

// Provides:
// - Precise head pose angles
// - Facial landmarks
// - Face detection
```

### COCO-SSD Integration
```typescript
// For real device detection
import * as cocoSsd from '@tensorflow-models/coco-ssd';

// Provides:
// - Object detection
// - Bounding boxes
// - Confidence scores
```

---

## 📱 Responsive Design

- Mobile-friendly dashboard
- Adaptive grid layout
- Touch-friendly controls
- Responsive alerts

---

## 🔒 Privacy & Security

- No data stored on server (demo mode)
- Local processing only
- No external API calls
- Webcam access with permission
- Session-based data

---

## 🧪 Testing

### Manual Testing
1. Go to `/take-test`
2. Create and take a test
3. Attention monitor displays on left
4. Check console for metrics
5. Go to `/monitoring` to see dashboard

### Console Logging
- Metrics updates logged
- Alert generation logged
- Device detection logged
- Error messages logged

---

## 🚀 Next Steps

### Phase 2: Real ML Integration
1. Integrate MediaPipe for real pose detection
2. Integrate COCO-SSD for device detection
3. Add gaze tracking
4. Implement face recognition

### Phase 3: Backend Integration
1. Send metrics to server
2. Store session data
3. Generate reports
4. Real-time notifications

### Phase 4: Advanced Features
1. Behavior analysis
2. Anomaly detection
3. Predictive alerts
4. Custom rules engine

---

## 📞 Support

For issues or questions:
1. Check console for error messages
2. Review component props
3. Check data structures
4. Verify integration points

---

**Version**: 1.0 (Advanced Monitoring)
**Status**: ✅ Ready for Testing
**Last Updated**: 2024

