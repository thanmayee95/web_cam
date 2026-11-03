# ExamGuard Test System - Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### For Instructors: Create Your First Test

1. **Go to Create Test Page**
   - Click "Create Test" button on home page
   - Or navigate to `/create-test`

2. **Fill in Test Details**
   ```
   Title: "Biology Quiz"
   Duration: 30 (minutes)
   Description: "Chapter 1-3 Quiz"
   ```

3. **Add Your First Question**
   - Select "Multiple Choice"
   - Enter question: "What is photosynthesis?"
   - Add options:
     - A. Process of making food from sunlight
     - B. Process of breaking down food
     - C. Process of cell division
     - D. Process of protein synthesis
   - Select correct answer (A)
   - Set points: 1
   - Click "Add Question to Test"

4. **Add More Questions** (repeat step 3)
   - Add at least 2-3 questions for a complete test

5. **Create Test**
   - Click "Create Test with X Questions"
   - You'll see your **Test Code** (e.g., `QUIZ42`)
   - **Copy the code** using the copy button

6. **Share with Students**
   - Send them the test code
   - They'll use it to take the test

---

### For Students: Take Your First Test

1. **Go to Take Test Page**
   - Click "Take Test" button on home page
   - Or navigate to `/take-test`

2. **Enter Your Information**
   ```
   Your Name: "John Smith"
   Test Code: "QUIZ42" (from instructor)
   ```
   - Click "Start Test"

3. **Answer Questions**
   - Read each question carefully
   - For multiple choice: Click the radio button next to your answer
   - For text answers: Type your response
   - Use "Previous" and "Next" buttons to navigate
   - Or click question numbers on the right to jump

4. **Monitor Your Progress**
   - Top right shows time remaining
   - Right panel shows which questions you've answered
   - Green = answered, Gray = not answered

5. **Submit Your Test**
   - When you reach the last question, click "Submit Test"
   - Your answers will be graded automatically

6. **View Your Results**
   - See your score and percentage
   - Review each answer
   - See which ones were correct/incorrect
   - For multiple choice: See the correct answer if you got it wrong

---

## 📋 Question Types

### Multiple Choice
- Student selects one answer from options
- Automatically graded
- Instant feedback on results

**Example**:
```
Question: "What is 2 + 2?"
Options:
  A. 3
  B. 4 ✓ (correct)
  C. 5
  D. 6
```

### Text Answer
- Student types their answer
- Requires manual grading
- Reference answer provided for instructor

**Example**:
```
Question: "Explain photosynthesis in 2-3 sentences"
Expected Answer: "Photosynthesis is the process where plants use sunlight..."
Student Answer: "Plants make food from sunlight..."
```

---

## 🔑 Test Codes

### What is a Test Code?
- 6-character unique identifier (e.g., `ABC123`)
- Generated automatically when test is created
- Used by students to access the test
- Each test has its own code

### How to Share
1. Create test → Get code
2. Copy code (click copy button)
3. Share via:
   - Email
   - Learning Management System (LMS)
   - Classroom announcement
   - Text message

### Example
```
Instructor creates test "Math Quiz"
↓
System generates code: MATH99
↓
Instructor shares: "Use code MATH99 to take the quiz"
↓
Student enters code MATH99
↓
Student takes test
```

---

## ⏱️ Timer & Time Management

### How Timer Works
- Starts when student clicks "Start Test"
- Counts down in real-time
- Shows in top right corner
- Format: MM:SS (minutes:seconds)

### Time Warnings
- **Normal**: Green timer
- **< 5 minutes**: Red timer (warning)
- **Time expires**: Test auto-submits

### Tips
- Don't wait until last minute
- Budget time per question
- Review answers if time allows

---

## 📊 Scoring & Results

### How Scoring Works
```
Multiple Choice:
  - Correct answer = Full points
  - Wrong answer = 0 points

Text Answer:
  - Requires manual grading
  - Shows expected answer for reference

Total Score = Sum of all points earned
Percentage = (Total Score / Total Points) × 100
```

### Example
```
Test: 5 questions, 20 points total
Question 1: Correct (4 points) ✓
Question 2: Correct (4 points) ✓
Question 3: Wrong (4 points) ✗
Question 4: Correct (4 points) ✓
Question 5: Correct (4 points) ✓

Total: 16/20 = 80%
```

---

## 🎥 Webcam Monitoring

### Requirements
- Camera must be on during test
- Good lighting recommended
- Face should be visible
- Don't cover camera

### What Happens If
- **Camera turns off**: Warning message, test continues
- **Tab switches**: Warning message
- **Face not visible**: Monitoring alert

### Tips
- Test camera before starting
- Ensure good lighting
- Position camera at eye level
- Minimize distractions

---

## ❓ Common Questions

**Q: Can I retake a test?**
A: Yes! Use the same test code to take it again. Each attempt is recorded separately.

**Q: What if I lose my test code?**
A: Ask your instructor for the code again. It doesn't change.

**Q: Can I save my progress?**
A: Answers are saved automatically as you type. If you refresh, you can continue.

**Q: What if time runs out?**
A: Test automatically submits your current answers.

**Q: Can I see my answers after submitting?**
A: Yes! Results page shows all your answers and scores.

**Q: How long are results saved?**
A: Results are saved in your browser. Clearing browser data will delete them.

**Q: Can multiple students use the same code?**
A: Yes! Multiple students can take the same test using the same code.

**Q: Is my data secure?**
A: Data is stored locally in your browser. Use secure networks for sensitive tests.

---

## 🔧 Troubleshooting

### Test Code Not Found
- Check spelling (case doesn't matter)
- Verify code from instructor
- Make sure test was created successfully

### Timer Not Working
- Refresh page
- Check system clock
- Try different browser

### Camera Issues
- Check permissions
- Ensure camera not in use
- Refresh page
- Try different browser

### Can't Submit Test
- Check all questions answered (optional)
- Ensure camera is on
- Try refreshing page

---

## 📚 More Information

For detailed documentation, see:
- `TEST_SYSTEM_GUIDE.md` - Complete user guide
- `IMPLEMENTATION_SUMMARY.md` - Technical details

---

## 🎯 Best Practices

### For Instructors
✓ Test your questions before sharing
✓ Provide clear instructions
✓ Allow adequate time
✓ Use meaningful test codes
✓ Keep backup of codes

### For Students
✓ Read questions carefully
✓ Answer all questions
✓ Review before submitting
✓ Ensure camera is on
✓ Minimize distractions

---

**Ready to get started? Go to the home page and click "Create Test" or "Take Test"!**

