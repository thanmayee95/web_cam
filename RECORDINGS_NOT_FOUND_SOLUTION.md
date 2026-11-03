# Recordings Not Found - Solution Guide

## ❓ Why Are Recordings Not Showing?

If you see "No recordings found" on the Recordings page, it's because:

1. **No tests have been completed yet**, OR
2. **Camera was not enabled during the test**, OR
3. **Recording wasn't saved to IndexedDB**

---

## ✅ Solution: Complete Test with Camera Enabled

### Step 1: Create a Test

1. Go to `http://localhost:8083/`
2. Click **"Create Test"** card
3. Fill in test details:
   - Title: "My Test"
   - Duration: 5 minutes
   - Add a question
4. Click **"Create Test"**
5. **Copy the test code** (e.g., ABC123)

---

### Step 2: Take the Test WITH CAMERA ENABLED

**⚠️ IMPORTANT: Camera MUST be enabled!**

1. Go to `http://localhost:8083/`
2. Click **"Take Test"** card
3. Enter:
   - Your name
   - Test code from Step 1
4. Click **"Validate Test Code"**
5. **ENABLE YOUR CAMERA** when prompted
   - You should see your webcam feed
   - If you don't see it, camera is not enabled
6. Click **"Start Test"**
7. Answer the question
8. Click **"Submit Test"**

---

### Step 3: Check Recordings Page

1. Go to `http://localhost:8083/`
2. Click **"Video Recordings"** card
3. **Your recording should now appear!**

---

## 🔍 Debugging: Check if Camera Was Enabled

### How to Know if Camera Was Enabled

During the test, you should see:
- ✅ Your webcam feed in the video player
- ✅ Your face/surroundings visible
- ✅ "🎥 Video Recording Active" message

If you DON'T see these, camera was NOT enabled.

---

## 🛠️ Troubleshooting Steps

### Issue 1: Camera Permission Denied

**Problem**: Browser asks for camera but you click "Deny"

**Solution**:
1. Go to browser settings
2. Find camera permissions
3. Allow camera for localhost:8083
4. Refresh page
5. Try again

### Issue 2: Camera Not Showing in Test

**Problem**: You don't see your webcam feed during test

**Solution**:
1. Check browser address bar for camera icon
2. Click and ensure camera is allowed
3. Refresh page
4. Try taking test again

### Issue 3: Recording Saved But Not Showing

**Problem**: Recording was created but doesn't appear in list

**Solution**:
1. Click **"Refresh"** button on Recordings page
2. Wait a few seconds
3. Recording should appear

### Issue 4: IndexedDB Not Working

**Problem**: Browser doesn't support IndexedDB

**Solution**:
1. Use a modern browser (Chrome, Firefox, Edge, Safari)
2. Disable browser extensions that block storage
3. Check if private/incognito mode is enabled
4. Try a different browser

---

## 📋 Complete Checklist

Before checking recordings, verify:

- [ ] Test was created successfully
- [ ] Test code was copied
- [ ] Took the test
- [ ] **Camera was enabled** (saw webcam feed)
- [ ] Answered at least one question
- [ ] Clicked "Submit Test"
- [ ] Test submission was successful
- [ ] Went to Recordings page
- [ ] Clicked "Refresh" button

---

## 🎯 Quick Test (3 minutes)

1. **Create Test** (1 min)
   - Create Test → Add 1 question → Copy code

2. **Take Test** (1 min)
   - Take Test → Enter code → **Enable camera** → Answer → Submit

3. **View Recording** (1 min)
   - Recordings → Should see your recording

---

## 📊 What Happens Behind the Scenes

### When You Take a Test with Camera:

1. Camera stream starts
2. `WebcamMonitor` component records video
3. When test is submitted:
   - Recording stops
   - Video blob is saved to IndexedDB
   - Metadata (name, test code) is added
4. Recording appears in Recordings page

### Storage Location:
- **Database**: IndexedDB (ExamGuardDB)
- **Store**: recordings
- **Key**: recording_[timestamp]

---

## 🔧 Advanced Debugging

### Check Browser Console

1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for messages like:
   - "Video recording started"
   - "Video recording stopped"
   - "Video saved to IndexedDB"

### Check IndexedDB

1. Open browser DevTools (F12)
2. Go to Application/Storage tab
3. Expand IndexedDB
4. Look for "ExamGuardDB"
5. Expand "recordings" store
6. Should see your recording

---

## ✨ Expected Behavior

### After Taking Test with Camera:

1. ✅ Test submission successful
2. ✅ Recording saved to IndexedDB
3. ✅ Recording appears in Recordings list
4. ✅ Can view, download, delete recording

### If This Doesn't Happen:

1. Check if camera was actually enabled
2. Check browser console for errors
3. Check IndexedDB for recordings
4. Try different browser
5. Clear browser cache and try again

---

## 🎊 Success Indicators

You'll know it's working when:

- ✅ You see your webcam feed during test
- ✅ Test submits successfully
- ✅ Recording appears in Recordings page
- ✅ Recording shows your name and test code
- ✅ Video player works
- ✅ Can download recording

---

## 📞 Still Not Working?

### Try These Steps:

1. **Refresh Page**
   - Go to Recordings page
   - Click "Refresh" button
   - Wait a few seconds

2. **Clear Cache**
   - Clear browser cache
   - Close and reopen browser
   - Try again

3. **Try Different Browser**
   - Chrome, Firefox, Edge, Safari
   - See if recordings appear

4. **Check Console**
   - Open DevTools (F12)
   - Check for error messages
   - Look for recording-related logs

5. **Check IndexedDB**
   - Open DevTools (F12)
   - Go to Application tab
   - Check ExamGuardDB → recordings

---

## 🎯 Key Points to Remember

1. **Camera MUST be enabled** during test
2. **Test MUST be submitted** to save recording
3. **Recording appears automatically** after submission
4. **Recordings stored locally** in browser
5. **Use Refresh button** if recording doesn't appear

---

## 📝 Summary

**Recordings not found = No test completed with camera enabled**

**Solution**: Take a test with camera enabled, then check Recordings page.

---

**Version**: 2.1
**Feature**: Video Recordings
**Status**: Working (requires camera enabled)

