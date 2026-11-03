# Camera & Session Setup - Test Security Feature

## Overview
Before students can start a test, they must now:
1. ✅ Enable and verify their camera is working
2. ✅ Start the session monitoring timer
3. ✅ Only then can they begin the test

This ensures exam integrity and proper monitoring from the start.

---

## How It Works

### Step 1: Enter Test Details
- Student enters their name
- Student enters test code from instructor
- Click "Next: Setup Camera & Session"

### Step 2: Setup Screen
The student sees a setup screen with two main sections:

#### Left Column - Camera Setup
- **Live camera feed** showing what the camera sees
- **Status indicator** showing if camera is active
- **Visual feedback** with checkmark when ready
- **Instructions** if camera is not working

#### Right Column - Session Monitoring
- **Session Controls** with "Start Session" button
- **Status indicator** showing if session is recording
- **Test Information** (duration, questions, points)
- **Visual feedback** with checkmark when ready

### Step 3: Verify Both Are Active
- Camera must show "Camera Ready" ✓
- Session must show "Session Active" ✓
- "Start Test" button becomes enabled

### Step 4: Begin Test
- Click "Start Test" button
- Test begins with both camera and session active
- Timer starts counting down

---

## Requirements Before Starting Test

### Camera Requirements
✅ Camera must be:
- Enabled and accessible
- Showing live video feed
- Detected as active by the system
- Showing "Camera Ready" status

### Session Requirements
✅ Session monitoring must be:
- Started by clicking "Start Session"
- Showing "Session Active" status
- Recording elapsed time
- Showing "Recording" indicator

### Both Must Be Active
- If camera is off → "Start Test" button is disabled
- If session is not started → "Start Test" button is disabled
- Only when BOTH are active → "Start Test" button is enabled

---

## User Interface

### Setup Screen Layout
```
┌─────────────────────────────────────────────────────┐
│ Test Setup                                    [Back] │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌──────────────────┐  ┌──────────────────┐        │
│  │ Camera Setup     │  │ Session Monitor  │        │
│  │ ● Camera Ready   │  │ ● Session Active │        │
│  │                  │  │                  │        │
│  │ [Live Feed]      │  │ [Session Timer]  │        │
│  │                  │  │ 00:00:15         │        │
│  │ ✓ Camera Ready   │  │ ✓ Session Active │        │
│  │                  │  │                  │        │
│  │                  │  │ Test Info:       │        │
│  │                  │  │ Duration: 60 min │        │
│  │                  │  │ Questions: 5     │        │
│  │                  │  │ Points: 100      │        │
│  └──────────────────┘  └──────────────────┘        │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │ ✓ Start Test                                │   │
│  │ Both camera and session must be active      │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Status Indicators

**Camera Status**:
- 🔴 Red/Warning: Camera not active
- 🟢 Green/Success: Camera is active and ready

**Session Status**:
- 🔴 Red/Warning: Session not started
- 🟢 Green/Success: Session is recording

**Start Test Button**:
- 🔒 Disabled (gray): Camera or session not ready
- 🟢 Enabled (blue): Both camera and session are active

---

## What Happens If...

### Camera Turns Off During Setup
- Status changes to "Camera Required"
- "Start Test" button becomes disabled
- Student must enable camera again

### Session Is Stopped During Setup
- Status changes to "Session Required"
- "Start Test" button becomes disabled
- Student must click "Start Session" again

### Student Clicks Back
- Returns to test code entry screen
- Can enter different test code or same code again
- Must go through setup again

### Student Closes Browser
- Session is lost
- Must start from beginning
- Can use same test code to try again

---

## For Instructors

### What This Means
- Students cannot start tests without camera
- Students cannot start tests without session monitoring
- All tests have monitoring from the very beginning
- Ensures academic integrity from start to finish

### Communicating to Students
Tell students:
1. "Make sure your camera is working before taking the test"
2. "You'll need to start the monitoring session before the test begins"
3. "Both must be active - you'll see checkmarks when ready"
4. "Once you start the test, the timer and monitoring begin"

---

## Technical Details

### State Management
```typescript
// Pre-test setup states
const [testCodeEntered, setTestCodeEntered] = useState(false);
const [sessionStarted, setSessionStarted] = useState(false);
const [cameraActive, setCameraActive] = useState<boolean | undefined>(undefined);
```

### Validation Logic
```typescript
const handleStartTest = () => {
  // Validate camera is active
  if (cameraActive !== true) {
    toast("Camera Required");
    return;
  }

  // Validate session is started
  if (!sessionStarted) {
    toast("Session Required");
    return;
  }

  // Both are active - start test
  setIsTestStarted(true);
};
```

### Screen Flow
```
Entry Form
    ↓
[Validate Code]
    ↓
Setup Screen (Camera + Session)
    ↓
[Both Active?]
    ↓
Test Taking Interface
    ↓
Results
```

---

## Troubleshooting

### Camera Not Showing
- Check browser permissions
- Ensure camera is not in use by another app
- Try refreshing the page
- Try a different browser

### Session Won't Start
- Click "Start Session" button
- Check if camera is active first
- Ensure monitoring is not blocked

### Can't Click "Start Test"
- Verify camera shows "Camera Ready" ✓
- Verify session shows "Session Active" ✓
- Both must have checkmarks
- Refresh page if stuck

### Camera Stops During Setup
- Camera may have been turned off
- Another app may have taken control
- Browser permissions may have changed
- Enable camera again and wait for status to update

---

## Security Benefits

✅ **Prevents Cheating**
- Camera must be on from the start
- No time to set up unauthorized materials

✅ **Ensures Monitoring**
- Session timer starts before test
- Continuous monitoring throughout

✅ **Accountability**
- Students know they're being monitored
- Creates deterrent for academic dishonesty

✅ **Complete Records**
- Session time matches test time
- Full monitoring from start to finish

---

## Student Experience

### Before (Old Way)
1. Enter code
2. Start test immediately
3. Camera monitoring starts later

### After (New Way)
1. Enter code
2. Setup camera and session
3. Verify both are working
4. Start test with full monitoring active

**Result**: Better security and peace of mind that monitoring is working!

