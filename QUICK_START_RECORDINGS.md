# Quick Start Guide - Video Recordings

## 🎥 Video Recordings Feature

Your exam recordings are now accessible to instructors through a dedicated page!

---

## 🚀 Getting Started

### Step 1: Start the Application
```bash
npm run dev
```
Application runs at: `http://localhost:8083/`

### Step 2: Create a Test (Instructor)
1. Go to Home page
2. Click "Create Test" card
3. Add questions and set duration
4. Note the test code (e.g., ABC123)

### Step 3: Take the Test (Student)
1. Go to Home page
2. Click "Take Test" card
3. Enter your name and test code
4. **Enable camera** (recording starts automatically)
5. Answer questions
6. Submit test

### Step 4: View Recordings (Instructor)
1. Go to Home page
2. Click "Video Recordings" card (4th card)
3. See all recordings in list

---

## 📺 Viewing Recordings

### List View
- Shows all exam recordings
- Each card displays:
  - Student name
  - Test code
  - Recording date/time
  - File size
  - Download button
  - Delete button

### Detail View
- Click on any recording to view details
- Built-in video player with controls
- Play, pause, seek, fullscreen
- Download and delete options

---

## ⬇️ Download Recording

### How to Download
1. Go to Recordings page (`/recordings`)
2. Click on a recording
3. Click "Download Recording" button
4. File saves as: `recording_[studentName]_[date].webm`

### Playing Downloaded Video
- Open with any video player
- Supported on: Windows, Mac, Linux
- Works in: VLC, Windows Media Player, Chrome, Firefox, etc.

---

## 🗑️ Delete Recording

### How to Delete
1. Go to Recordings page
2. Click on a recording
3. Click "Delete" button
4. Confirm deletion
5. Recording removed from storage

### Bulk Delete
- Delete from list view by clicking delete icon
- Or delete from detail view
- Confirmation required

---

## 📊 Recording Information

### What's Recorded
- Student's webcam feed
- Entire exam session
- From start to submission

### Metadata Stored
- Student name
- Test code
- Recording date/time
- File size
- Video duration

### Storage Location
- Browser's IndexedDB database
- Local storage (not cloud)
- Persists across sessions

---

## 💾 Storage Management

### Check Storage
- Go to Recordings page
- See file sizes for each recording
- Total storage used

### Free Up Space
1. Download important recordings
2. Delete old recordings
3. Clear browser cache if needed

### Storage Limits
- Typically 50MB+ available
- Depends on browser settings
- 1 hour video ≈ 100-200 MB

---

## 🔗 Navigation

### From Home Page
- Click "Video Recordings" card
- Or use URL: `/recordings`

### From Recordings Page
- Click "Back to Home" to return
- Or click browser back button

### From Other Pages
- Use Home page as hub
- All pages accessible from Home

---

## 🎯 Common Tasks

### Task: Watch a Student's Exam Recording
1. Go to Recordings page
2. Find student name in list
3. Click to open detail view
4. Watch video with player

### Task: Download All Recordings
1. Go to Recordings page
2. For each recording:
   - Click on it
   - Click "Download Recording"
   - Save file

### Task: Delete Old Recordings
1. Go to Recordings page
2. Click on recording
3. Click "Delete" button
4. Confirm deletion

### Task: Find Recording by Test Code
1. Go to Recordings page
2. Look for test code in recording card
3. Click to view details

---

## ❓ FAQ

### Q: Where are recordings stored?
**A**: In your browser's IndexedDB database (local storage)

### Q: Can I access recordings from another device?
**A**: No, recordings are stored locally per browser

### Q: How long are recordings kept?
**A**: Until you delete them or clear browser cache

### Q: Can I share recordings?
**A**: Download the .webm file and share manually

### Q: What if recording didn't start?
**A**: Check if camera was enabled during exam

### Q: Can I edit recordings?
**A**: Download and edit with video editing software

### Q: What format are recordings in?
**A**: WebM format (.webm extension)

### Q: How do I play a .webm file?
**A**: Use VLC, Chrome, Firefox, or any modern video player

---

## 🔧 Troubleshooting

### Recordings Not Appearing
1. Refresh the page
2. Check if exam was completed
3. Verify camera was enabled
4. Check browser console for errors

### Video Won't Play
1. Try different browser
2. Download and play locally
3. Check file size (should be > 0 bytes)
4. Ensure WebM support

### Can't Download
1. Check browser download settings
2. Try different browser
3. Check available disk space
4. Disable download blockers

### Storage Full
1. Download important recordings
2. Delete old recordings
3. Clear browser cache
4. Check IndexedDB quota

---

## 📱 Mobile Access

### On Mobile Devices
- Recordings page works on mobile
- Video player responsive
- Download works on mobile
- Delete works on mobile

### Best Experience
- Desktop: Full features
- Tablet: Good experience
- Mobile: Basic functionality

---

## 🔐 Privacy & Security

### Data Privacy
- Recordings stored locally
- No cloud upload
- No external servers
- Your data stays on your device

### Access Control
- Anyone with browser access can view
- Consider browser privacy settings
- Use incognito mode if needed
- Clear cache regularly

---

## 📞 Support

### Getting Help
1. Check this guide
2. Read feature documentation
3. Check browser console
4. Verify camera permissions

### Common Issues
- See Troubleshooting section above
- Check FAQ section
- Review feature documentation

---

## ✅ Checklist

Before using recordings:
- [ ] Application running at localhost:8083
- [ ] Camera permissions enabled
- [ ] Test created with code
- [ ] Test taken with camera enabled
- [ ] Recording appears in list
- [ ] Can view recording
- [ ] Can download recording
- [ ] Can delete recording

---

## 🎊 You're Ready!

You can now:
- ✅ Record exam sessions automatically
- ✅ View all recordings
- ✅ Watch videos with player
- ✅ Download for archival
- ✅ Delete to manage storage

**Enjoy using ExamGuard v2.1!** 🎉

---

**Quick Links**
- Home: `http://localhost:8083/`
- Recordings: `http://localhost:8083/recordings`
- Dashboard: `http://localhost:8083/dashboard`
- Create Test: `http://localhost:8083/create-test`
- Take Test: `http://localhost:8083/take-test`

---

**Version**: 2.1
**Feature**: Video Recordings
**Status**: ✅ Ready to Use

