# Camera & Session Setup - Implementation Changes

## Summary
Added a mandatory pre-test setup screen that requires students to:
1. Enable and verify their camera is working
2. Start the session monitoring timer
3. Only then can they begin the test

This ensures exam integrity and proper monitoring from the very start.

---

## Files Modified

### `/src/pages/TakeTest.tsx`

#### New State Variables Added
```typescript
// Pre-test setup states
const [testCodeEntered, setTestCodeEntered] = useState(false);
const [sessionStarted, setSessionStarted] = useState(false);
const [sessionElapsed, setSessionElapsed] = useState(0);
```

#### New Functions Added

**1. `handleValidateTestCode()`**
- Validates student name and test code
- Checks if test code exists in storage
- Transitions to setup screen
- Replaces old `handleStartTest()` for code validation

**2. `handleStartTest()` (Updated)**
- Now validates camera is active: `cameraActive === true`
- Now validates session is started: `sessionStarted === true`
- Shows error toasts if either is missing
- Only starts test if both conditions are met
- Initializes test timer and student answers

#### New UI Screens Added

**1. Test Code Entry Screen** (unchanged)
- Student enters name and test code
- Button now says "Next: Setup Camera & Session"
- Calls `handleValidateTestCode()` instead of `handleStartTest()`

**2. Setup Screen** (NEW)
- **Header**: Shows test title and back button
- **Left Column - Camera Setup**:
  - Live webcam feed via `<WebcamMonitor />`
  - Status indicator (red/green dot)
  - Status message ("Camera Ready" or "Camera Required")
  - Visual feedback card with checkmark or alert icon
  - Instructions for user

- **Right Column - Session Monitoring**:
  - Session controls via `<SessionControls />`
  - Status indicator (red/green dot)
  - Status message ("Session Active" or "Session Required")
  - Visual feedback card with checkmark or alert icon
  - Test information card (duration, questions, points)

- **Bottom - Start Test Button**:
  - Disabled if camera not active OR session not started
  - Shows helpful text about what's missing
  - Enabled only when both are active
  - Calls `handleStartTest()` when clicked

#### Screen Flow Logic
```
!testCodeEntered
    ↓
[Show Entry Form]
    ↓
handleValidateTestCode() → setTestCodeEntered(true)
    ↓
testCodeEntered && !isTestStarted && test
    ↓
[Show Setup Screen]
    ↓
handleStartTest() → setIsTestStarted(true)
    ↓
isTestStarted && !isTestSubmitted
    ↓
[Show Test Questions]
    ↓
handleSubmitTest() → setIsTestSubmitted(true)
    ↓
isTestSubmitted && submissionResult
    ↓
[Show Results]
```

---

## Key Features

### 1. Camera Validation
- Checks `cameraActive` state from `WebcamMonitor`
- Must be `true` to start test
- Shows real-time status
- Visual feedback with checkmark when ready

### 2. Session Validation
- Checks `sessionStarted` state
- Student must click "Start Session" button
- Shows elapsed time while recording
- Visual feedback with checkmark when active

### 3. Button State Management
```typescript
<Button
  onClick={handleStartTest}
  disabled={cameraActive !== true || !sessionStarted}
  size="lg"
  className="w-full"
>
  {cameraActive !== true || !sessionStarted
    ? `${cameraActive !== true ? '📷 Enable Camera' : ''} ${!sessionStarted ? '⏱️ Start Session' : ''}`
    : '✓ Start Test'}
</Button>
```

### 4. Visual Feedback
- Status indicators (red/green dots)
- Checkmarks when ready
- Alert icons when not ready
- Color-coded cards (warning/success)
- Clear instructions for each state

### 5. Error Handling
- Toast notifications for missing camera
- Toast notifications for missing session
- Back button to return to code entry
- Graceful state management

---

## User Experience Flow

### Step 1: Entry
```
Input: Name, Test Code
Action: Click "Next: Setup Camera & Session"
Result: Transition to setup screen
```

### Step 2: Setup
```
See: Camera feed + Session controls
Action 1: Camera automatically starts
Action 2: Click "Start Session" button
Result: Both show "Ready" status
```

### Step 3: Verification
```
Check: Camera shows ✓ Camera Ready
Check: Session shows ✓ Session Active
Action: Click "Start Test"
Result: Test begins with monitoring active
```

### Step 4: Test
```
Timer: Countdown from test duration
Monitoring: Camera and session active
Questions: Answer all questions
Action: Click "Submit Test"
Result: Test submitted and graded
```

---

## Technical Implementation Details

### State Management
- `testCodeEntered`: Controls visibility of setup screen
- `sessionStarted`: Tracks if session monitoring is active
- `cameraActive`: Received from WebcamMonitor component
- `isTestStarted`: Controls visibility of test questions

### Component Integration
- Uses existing `WebcamMonitor` component
- Uses existing `SessionControls` component
- Reuses existing toast notification system
- Maintains existing test logic

### Validation Logic
```typescript
// Both conditions must be true
if (cameraActive !== true) {
  // Show error and return
}

if (!sessionStarted) {
  // Show error and return
}

// Both are true - proceed
setIsTestStarted(true);
```

### Props Passed to Components
```typescript
// WebcamMonitor
<WebcamMonitor onCameraChange={handleCameraChange} />

// SessionControls
<SessionControls
  onStart={() => setSessionStarted(true)}
  onPause={() => {}}
  onStop={() => setSessionStarted(false)}
  cameraActive={cameraActive}
  externalStopCounter={externalStopCounter}
/>
```

---

## Benefits

### For Students
✅ Clear setup process before test
✅ Verification that camera is working
✅ Confirmation that monitoring is active
✅ Peace of mind about system readiness

### For Instructors
✅ Ensures all tests have monitoring from start
✅ Prevents students from starting without camera
✅ Prevents students from starting without session
✅ Better exam integrity and security

### For System
✅ Guarantees camera is active when test starts
✅ Guarantees session is recording when test starts
✅ Reduces technical issues during test
✅ Provides complete monitoring records

---

## Testing Checklist

- [x] Entry form works correctly
- [x] Setup screen displays properly
- [x] Camera status updates in real-time
- [x] Session status updates when button clicked
- [x] Start Test button disabled when camera off
- [x] Start Test button disabled when session not started
- [x] Start Test button enabled when both active
- [x] Test starts correctly after setup
- [x] Back button returns to entry form
- [x] Toast notifications show for errors
- [x] No TypeScript errors
- [x] Hot reload works properly

---

## Browser Compatibility

Works on all modern browsers that support:
- WebRTC (camera access)
- React 18+
- ES2020+ JavaScript
- CSS Grid and Flexbox

---

## Future Enhancements

- [ ] Add camera quality check
- [ ] Add microphone verification
- [ ] Add internet connection test
- [ ] Add system requirements check
- [ ] Add practice mode before test
- [ ] Add setup tutorial video
- [ ] Add troubleshooting guide
- [ ] Add accessibility improvements

---

## Rollback Instructions

If you need to revert to the old behavior:
1. Remove the setup screen code (lines 282-484)
2. Restore old `handleStartTest()` function
3. Remove new state variables
4. Update screen flow logic

---

## Support

For issues or questions:
1. Check `CAMERA_SESSION_SETUP.md` for user guide
2. Review this file for technical details
3. Check browser console for errors
4. Verify camera permissions are granted

