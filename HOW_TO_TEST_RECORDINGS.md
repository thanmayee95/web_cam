# How to Test Video Recordings Feature

## 🎥 Step-by-Step Guide to Create and View Recordings

### ⚠️ Important
Recordings are only created when:
1. A student takes a test
2. **Camera is enabled** during the test
3. Test is submitted

---

## 📋 Complete Test Scenario

### Step 1: Create a Test (Instructor)

1. Go to `http://localhost:8083/`
2. Click **"Create Test"** card
3. Fill in the form:
   - **Test Title**: "Sample Test"
   - **Duration**: 5 minutes
   - **Description**: "Test for recording"
4. Add a question:
   - **Question Type**: Multiple Choice
   - **Question**: "What is 2+2?"
   - **Options**: 
     - 3
     - 4 ✓ (correct)
     - 5
   - **Points**: 10
5. Click **"Create Test"**
6. **Copy the test code** (e.g., ABC123)

---

### Step 2: Take the Test (Student)

1. Go to `http://localhost:8083/`
2. Click **"Take Test"** card
3. Fill in the form:
   - **Your Name**: "John Doe"
   - **Test Code**: Paste the code from Step 1
4. Click **"Validate Test Code"**
5. **IMPORTANT: Enable your camera** when prompted
   - Click "Allow" when browser asks for camera permission
   - You should see your webcam feed
6. Click **"Start Test"**
7. Answer the question (select "4")
8. Click **"Submit Test"**
9. View your results

---

### Step 3: View Recordings (Instructor)

1. Go to `http://localhost:8083/`
2. Click **"Video Recordings"** card (4th card)
3. You should see your recording in the list:
   - Student name: "John Doe"
   - Test code: "ABC123"
   - Recording date/time
   - File size

---

### Step 4: Watch the Recording

1. Click on the recording in the list
2. Video player opens
3. Click play button to watch
4. Use controls: play, pause, seek, fullscreen

---

### Step 5: Download Recording

1. In the detail view, click **"Download Recording"**
2. File saves as: `recording_John_Doe_[date].webm`
3. Can be played in any video player

---

### Step 6: Delete Recording

1. In the detail view, click **"Delete"**
2. Confirm deletion
3. Recording removed from storage

---

## 🔍 Troubleshooting

### Problem: No Recordings Appear

**Cause**: Camera was not enabled during test

**Solution**:
1. Go back to Step 2
2. Make sure to **enable camera** when prompted
3. You should see your webcam feed
4. Complete the test
5. Check recordings page again

### Problem: Recording Appears But Won't Play

**Cause**: Browser doesn't support WebM format

**Solution**:
1. Try a different browser (Chrome, Firefox, Edge)
2. Download the recording
3. Play with VLC media player

### Problem: Can't Enable Camera

**Cause**: Browser permissions not granted

**Solution**:
1. Check browser address bar for camera icon
2. Click and allow camera access
3. Refresh page
4. Try again

### Problem: Recording File is Very Small

**Cause**: Test was submitted too quickly

**Solution**:
1. Create a longer test
2. Take more time answering questions
3. Recording will be larger

---

## 📊 What Gets Recorded

### Recorded Content
- ✅ Your webcam feed
- ✅ Entire exam session
- ✅ From start to submission

### Not Recorded
- ❌ Screen content (only webcam)
- ❌ Audio (video only)
- ❌ System sounds

---

## 💾 Storage Information

### Where Recordings Are Stored
- Browser's IndexedDB database
- Local storage (not cloud)
- Persists across browser sessions

### File Format
- Format: WebM (.webm)
- Codec: VP8/VP9 video
- Size: ~100-200 MB per hour

### Accessing Recordings
- Only accessible from same browser
- Not accessible from other devices
- Cleared when browser cache is cleared

---

## 🧪 Testing Checklist

- [ ] Created a test with code
- [ ] Took test with camera enabled
- [ ] Submitted test
- [ ] Recording appears in list
- [ ] Can view recording details
- [ ] Video player works
- [ ] Can download recording
- [ ] Can delete recording
- [ ] Refresh button works
- [ ] Back button works

---

## 🎯 Quick Test (5 minutes)

1. **Create Test** (1 min)
   - Go to Create Test
   - Add 1 simple question
   - Copy test code

2. **Take Test** (2 min)
   - Go to Take Test
   - Enter name and code
   - **Enable camera**
   - Answer question
   - Submit

3. **View Recording** (2 min)
   - Go to Recordings
   - See recording in list
   - Click to view
   - Watch video

---

## 📱 Testing on Different Devices

### Desktop
- Full functionality
- Best experience
- All features work

### Tablet
- Good experience
- Touch-friendly
- All features work

### Mobile
- Basic functionality
- Smaller screen
- All features work

---

## 🔐 Privacy Notes

### During Testing
- Your webcam is recorded
- Recording stored locally
- Only you can access it

### After Testing
- Recording linked to test code
- Visible to instructors
- Can be downloaded/deleted

---

## 📞 Common Questions

### Q: Why is my recording empty?
**A**: Camera might not have been enabled. Try again with camera enabled.

### Q: Can I re-record?
**A**: Take the test again with camera enabled. New recording will be created.

### Q: How long can recordings be?
**A**: As long as your test duration. Limited by browser storage.

### Q: Can I edit recordings?
**A**: Download and edit with video editing software.

### Q: Where do I find downloaded recordings?
**A**: In your Downloads folder with name `recording_[name]_[date].webm`

---

## ✅ Success Indicators

You'll know it's working when:
- ✅ Recording appears in list after test
- ✅ Student name shows correctly
- ✅ Test code shows correctly
- ✅ Video player works
- ✅ Download creates a file
- ✅ Delete removes recording

---

## 🎊 You're Ready!

Follow these steps to test the video recordings feature.

**Expected Result**: Recording appears in Recordings page after completing a test with camera enabled.

---

**Version**: 2.1
**Feature**: Video Recordings
**Status**: Ready to Test

