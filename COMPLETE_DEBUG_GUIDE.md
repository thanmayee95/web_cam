# Complete Debug Guide - Video Recording Issue

## 🔧 New Debug Page Created

I've created a debug page to help diagnose the recording issue.

**Access it at**: `http://localhost:8083/debug`

---

## 📋 Step-by-Step Debugging

### Step 1: Open Debug Page
1. Go to `http://localhost:8083/debug`
2. You should see a page showing IndexedDB recordings
3. Initially it should say "No recordings found"

### Step 2: Create and Take a Test
1. Go to `http://localhost:8083/`
2. Click "Create Test"
3. Add a simple question
4. Click "Create Test" and copy the code
5. Click "Take Test"
6. Enter name and test code
7. **Enable camera** (important!)
8. Click "Start Test"
9. Answer the question
10. Click "Submit Test"

### Step 3: Check Debug Page
1. Go back to `http://localhost:8083/debug`
2. Click "Refresh" button
3. Check if recording appears

---

## 🔍 What to Look For

### If Recording Appears ✅
- You'll see a table with recording details
- Shows: Key, Timestamp, Size, Test Code, Student Name
- Size should be > 0 MB
- Test Code and Student Name should be filled

### If No Recording Appears ❌
- Page shows "No recordings found in IndexedDB"
- This means recording was never saved
- Check console for errors

---

## 🧪 Console Debugging

### Step 1: Open DevTools
1. Press **F12**
2. Go to **Console** tab
3. Keep it open while testing

### Step 2: Watch for Messages
When you take a test, watch for:

```
Video recording started
Recording stopped, blob size: [NUMBER]
Saving recording to IndexedDB...
Saving video to IndexedDB. Blob size: [NUMBER] bytes
Video saved to IndexedDB: recording_[TIMESTAMP] Size: [NUMBER]
Recording save result: true
```

### Step 3: Check for Errors
Look for any error messages like:
- "No recorded data to save"
- "IndexedDB error"
- "Error saving to IndexedDB"

---

## 🔎 Manual IndexedDB Check

### In Browser Console:
```javascript
// Check if IndexedDB has recordings
const request = indexedDB.open('ExamGuardDB', 1);
request.onsuccess = () => {
  const db = request.result;
  const transaction = db.transaction(['recordings'], 'readonly');
  const objectStore = transaction.objectStore('recordings');
  const getAllRequest = objectStore.getAll();
  getAllRequest.onsuccess = () => {
    console.log('All recordings:', getAllRequest.result);
  };
};
```

---

## 📊 Expected Results

### Successful Recording Flow:
1. ✅ Console shows "Video recording started"
2. ✅ Console shows blob size > 0
3. ✅ Console shows "Video saved to IndexedDB"
4. ✅ Debug page shows recording in list
5. ✅ Recording has test code and student name

### Failed Recording Flow:
1. ❌ Console shows "No recorded data to save"
2. ❌ Debug page shows no recordings
3. ❌ IndexedDB is empty

---

## 🚨 Common Issues & Solutions

### Issue 1: "No recorded data to save"
**Cause**: Recording blob is empty
**Solution**:
- Make sure camera was enabled
- Check if test duration was long enough
- Try again with camera enabled

### Issue 2: Recording appears but size is 0
**Cause**: Recording didn't capture any data
**Solution**:
- Camera might not have been working
- Try different browser
- Check camera permissions

### Issue 3: Recording appears but no test code
**Cause**: Metadata wasn't updated
**Solution**:
- Recording was saved but not linked to test
- This is a separate issue
- Recording still exists in IndexedDB

### Issue 4: IndexedDB error
**Cause**: Browser storage issue
**Solution**:
- Clear browser cache
- Try different browser
- Check storage quota

---

## 🎯 Quick Test Checklist

- [ ] Opened debug page at /debug
- [ ] Created a test
- [ ] Took test with camera enabled
- [ ] Submitted test
- [ ] Went back to debug page
- [ ] Clicked "Refresh"
- [ ] Recording appears in list
- [ ] Recording has size > 0
- [ ] Recording has test code
- [ ] Recording has student name

---

## 📱 Using Debug Page

### Buttons:
- **Refresh**: Reload recordings from IndexedDB
- **Clear All Recordings**: Delete all recordings (use with caution!)

### Information Shown:
- **Key**: Unique identifier for recording
- **Timestamp**: When recording was created
- **Size**: File size in MB
- **Blob Size**: Actual blob size in MB
- **Test Code**: Associated test code
- **Student Name**: Associated student name

---

## 🔧 Technical Details

### Recording Storage:
- **Database**: ExamGuardDB
- **Store**: recordings
- **Key Path**: key
- **Format**: WebM video

### Recording Object:
```typescript
{
  key: "recording_1234567890",
  blob: Blob,
  timestamp: "2024-01-15T14:30:00Z",
  size: 2500000,
  testCode: "ABC123",
  studentName: "John Doe"
}
```

---

## 📞 Troubleshooting Steps

1. **Check Console**
   - Open DevTools (F12)
   - Look for error messages
   - Check for "Video recording started" message

2. **Check Debug Page**
   - Go to /debug
   - Click Refresh
   - See if recording appears

3. **Check IndexedDB**
   - Open DevTools (F12)
   - Go to Application tab
   - Check ExamGuardDB → recordings

4. **Try Different Browser**
   - Chrome, Firefox, Edge, Safari
   - See if issue persists

5. **Clear Cache**
   - Clear browser cache
   - Close and reopen browser
   - Try again

---

## ✅ Success Indicators

You'll know it's working when:
- ✅ Debug page shows recording
- ✅ Recording has size > 0 MB
- ✅ Recording has test code
- ✅ Recording has student name
- ✅ Recordings page shows recording
- ✅ Can view/download recording

---

## 🎊 Next Steps

1. **Test the debug page**:
   - Go to /debug
   - Take a test
   - Check if recording appears

2. **If recording appears**:
   - Great! Recording is being saved
   - Check why it's not showing in Recordings page

3. **If recording doesn't appear**:
   - Check console for errors
   - Try different browser
   - Check IndexedDB manually

---

**Version**: 2.1 (Debug)
**Status**: Ready to Test
**Last Updated**: 2024

