# Video Recordings Feature - ExamGuard v2.1

## 🎥 Overview

The Video Recordings feature allows instructors to view, download, and manage all exam session recordings. Every student's webcam feed is automatically recorded during their exam and can be reviewed by instructors.

---

## ✨ Key Features

### 1. **Automatic Recording**
- Every exam session is automatically recorded
- Recordings are stored in IndexedDB (browser's local database)
- No manual action required from students

### 2. **View Recordings**
- Access all recordings from the new `/recordings` page
- See student name, test code, recording date, and file size
- Sort by newest first

### 3. **Watch Videos**
- Click on any recording to view details
- Built-in video player with controls
- Play, pause, seek, and fullscreen support

### 4. **Download Recordings**
- Download individual recordings as `.webm` files
- Filename includes student name and date
- Format: `recording_[studentName]_[date].webm`

### 5. **Delete Recordings**
- Remove recordings to free up storage
- Confirmation dialog to prevent accidental deletion
- Instant removal from IndexedDB

### 6. **Recording Metadata**
- Automatically linked to test code and student name
- Timestamp of when recording was created
- File size information

---

## 🗂️ File Structure

### New Files Created
```
src/pages/Recordings.tsx          # Main recordings page component
VIDEO_RECORDINGS_FEATURE.md       # This documentation file
```

### Modified Files
```
src/lib/testStorage.ts            # Added recording management functions
src/App.tsx                       # Added /recordings route
src/pages/Home.tsx                # Added Recordings card
src/pages/TakeTest.tsx            # Updated to link recordings to submissions
```

---

## 🔧 Technical Implementation

### Storage System
- **Database**: IndexedDB (ExamGuardDB)
- **Store**: recordings
- **Key**: `recording_[timestamp]`
- **Data Structure**:
  ```typescript
  {
    key: string;              // Unique identifier
    blob: Blob;               // Video file
    timestamp: string;        // ISO timestamp
    size: number;             // File size in bytes
    testCode?: string;        // Associated test code
    studentName?: string;     // Associated student name
  }
  ```

### Recording Functions

#### `getAllRecordings()`
Retrieves all recordings from IndexedDB.
```typescript
const recordings = await getAllRecordings();
```

#### `getRecordingByKey(key: string)`
Retrieves a specific recording by its key.
```typescript
const recording = await getRecordingByKey('recording_1234567890');
```

#### `deleteRecording(key: string)`
Deletes a recording from IndexedDB.
```typescript
const success = await deleteRecording('recording_1234567890');
```

#### `updateRecordingMetadata(key, testCode, studentName)`
Links a recording to a test submission.
```typescript
await updateRecordingMetadata('recording_1234567890', 'ABC123', 'John Doe');
```

---

## 📱 User Interface

### Recordings Page (`/recordings`)

#### List View
- Grid of all recordings
- Each card shows:
  - Student name
  - Test code (if available)
  - Recording date/time
  - File size
  - Download button
  - Delete button

#### Detail View
- Click on a recording to view details
- Video player with full controls
- Recording metadata (date, size)
- Download and delete buttons
- Back button to return to list

---

## 🔄 Workflow

### Student Taking Exam
1. Student starts exam at `/take-test`
2. Camera is enabled and recording starts automatically
3. Student answers questions
4. Student submits test
5. Recording is automatically linked to test code and student name

### Instructor Viewing Recordings
1. Instructor goes to Home page
2. Clicks "Video Recordings" card
3. Sees list of all recordings
4. Can:
   - Click to watch recording
   - Download recording
   - Delete recording

---

## 💾 Storage Limits

### Browser Storage
- IndexedDB typically allows 50MB+ per domain
- Actual limit depends on browser and user settings
- Videos are compressed using WebM codec

### File Size Estimation
- 1 hour of 640x480 video ≈ 100-200 MB
- Depends on video quality and compression
- Instructors should regularly download and delete old recordings

---

## 🎯 Navigation

### Home Page
- New "Video Recordings" card (4th card)
- Click to navigate to `/recordings`

### Routes
```
/                    → Home page
/recordings          → Video recordings page
/dashboard           → Results dashboard
/create-test         → Create test
/take-test           → Take test
/monitor             → Monitoring demo
```

---

## 🔐 Security & Privacy

### Data Storage
- All recordings stored locally in browser
- No data sent to external servers
- Each browser has its own storage

### Access Control
- Recordings accessible to anyone with browser access
- Consider using browser privacy settings
- Regularly delete old recordings

### GDPR Compliance
- Students should be informed about recording
- Provide option to delete recordings
- Maintain audit trail of deletions

---

## 🐛 Troubleshooting

### Recordings Not Appearing
1. Check if exam was completed
2. Verify IndexedDB is enabled in browser
3. Check browser console for errors
4. Try refreshing the page

### Video Won't Play
1. Ensure browser supports WebM format
2. Try downloading and playing locally
3. Check file size (should be > 0 bytes)
4. Try different browser

### Storage Full
1. Download important recordings
2. Delete old recordings
3. Clear browser cache
4. Check IndexedDB quota

---

## 📊 Recording Metadata

### Automatic Linking
When a test is submitted:
1. System finds the most recent recording
2. Updates it with test code and student name
3. Links recording to submission

### Manual Linking
Recordings can be manually linked using:
```typescript
await updateRecordingMetadata(key, testCode, studentName);
```

---

## 🚀 Future Enhancements

Potential features for future versions:
- [ ] Streaming to cloud storage
- [ ] Video compression options
- [ ] Playback speed control
- [ ] Timestamp annotations
- [ ] Search and filter
- [ ] Batch download
- [ ] Video analytics
- [ ] Automatic cleanup policies

---

## 📞 Support

### Common Issues

**Q: Where are recordings stored?**
A: In browser's IndexedDB database (local storage)

**Q: Can I access recordings from another device?**
A: No, recordings are stored locally per browser

**Q: How long are recordings kept?**
A: Until manually deleted or browser cache is cleared

**Q: Can I share recordings?**
A: Download and share the .webm file manually

---

## ✅ Testing Checklist

- [x] Recordings are created during exam
- [x] Recordings appear in list view
- [x] Video player works
- [x] Download functionality works
- [x] Delete functionality works
- [x] Metadata is linked correctly
- [x] Navigation works
- [x] Responsive design works
- [x] No console errors
- [x] Hot reload works

---

## 📝 Version History

### v2.1 (Current)
- Added Video Recordings feature
- Created Recordings page
- Added recording management functions
- Integrated with test submissions
- Added navigation and UI

### v2.0
- Added Results Dashboard
- Auto-submit on camera coverage
- Improved navigation

### v1.0
- Initial ExamGuard system
- Basic webcam monitoring
- Test creation and submission

---

## 🎉 Summary

The Video Recordings feature provides instructors with a complete solution for:
- ✅ Viewing exam session recordings
- ✅ Downloading videos for archival
- ✅ Managing storage
- ✅ Linking recordings to test submissions
- ✅ Ensuring exam integrity

**Status**: ✅ **PRODUCTION READY**

---

**Last Updated**: 2024
**Feature Version**: 2.1
**Status**: Active & Tested

