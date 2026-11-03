# ExamGuard Test System Guide

## Overview
The ExamGuard test system allows instructors to create tests and students to take them using unique test codes. The system includes automatic grading for multiple-choice questions and webcam monitoring during the exam.

## For Instructors: Creating a Test

### Step 1: Navigate to Create Test
- Click the **"Create Test"** button on the home page
- Or go to `/create-test`

### Step 2: Fill in Test Details
- **Test Title**: Name of your test (e.g., "Biology Midterm")
- **Duration**: Time limit in minutes (e.g., 60)
- **Description**: Optional description for students

### Step 3: Add Questions
For each question:

1. **Select Question Type**:
   - **Multiple Choice**: Students select from options
   - **Text Answer**: Students type their answer

2. **Enter Question Text**: Type your question

3. **For Multiple Choice**:
   - Add answer options (minimum 2)
   - Click "Add Option" to add more options
   - Select the correct answer using the radio button
   - Remove options if needed

4. **For Text Answer**:
   - Optionally enter expected answer for reference
   - This helps with manual grading

5. **Set Points**: Assign points for this question

6. **Click "Add Question to Test"**

### Step 4: Review Questions
- All questions appear in the "Test Questions" section
- Review each question
- Delete any question using the trash icon
- Reorder if needed

### Step 5: Create Test
- Click **"Create Test with X Questions"** button
- You'll see a success screen with:
  - **Test Code**: 6-character code (e.g., "ABC123")
  - Test details and question overview
  - Copy button to copy code to clipboard

### Step 6: Share Test Code
- Share the test code with students
- Students will use this code to take the test

---

## For Students: Taking a Test

### Step 1: Navigate to Take Test
- Click the **"Take Test"** button on the home page
- Or go to `/take-test`

### Step 2: Enter Your Details
- **Your Name**: Enter your full name
- **Test Code**: Enter the 6-character code provided by instructor
- Click **"Start Test"**

### Step 3: Answer Questions
- **Question Display**: Current question shown with number and type
- **Navigation**:
  - Use **Previous/Next** buttons to move between questions
  - Click question numbers on the right to jump to any question
- **Answer Types**:
  - **Multiple Choice**: Click the radio button next to your answer
  - **Text Answer**: Type your answer in the text box

### Step 4: Monitor Progress
- **Top Right**: Shows time remaining (turns red when < 5 minutes)
- **Right Panel**: Shows which questions you've answered
  - Green = answered
  - Gray = not answered
  - Blue = current question

### Step 5: Submit Test
- When you reach the last question, a **"Submit Test"** button appears
- Click to submit your answers
- **Important**: Camera must stay on during the test

### Step 6: View Results
- After submission, you'll see:
  - Your score and percentage
  - Answer summary with correct/incorrect indicators
  - Points earned for each question
  - For multiple choice: shows correct answer if you got it wrong

---

## Test Code System

### How Test Codes Work
- Each test gets a unique 6-character code (e.g., "ABC123")
- Codes are randomly generated and stored locally
- Students use codes to access specific tests
- Multiple students can take the same test using the same code

### Test Code Format
- 6 characters: uppercase letters (A-Z) and numbers (0-9)
- Example: `EXAM01`, `TEST99`, `QUIZ42`

---

## Grading System

### Automatic Grading
- **Multiple Choice**: Automatically graded as correct/incorrect
- **Text Answers**: Marked as pending (requires manual review)

### Score Calculation
- Each question has assigned points
- Multiple choice: Full points if correct, 0 if incorrect
- Text answers: Manual grading needed
- Total score = sum of all points earned
- Percentage = (Total Score / Total Points) × 100

### Passing Score
- Default: 60% is considered passing
- Adjust by creating tests with appropriate difficulty

---

## Data Storage

### Where Data is Stored
- All tests and submissions are stored in browser's **localStorage**
- Data persists across browser sessions
- Data is local to each device

### Backup Recommendations
- Export test data regularly
- Keep records of test codes
- Note submission results

### Clearing Data
- Use browser developer tools to clear localStorage
- Or use "Clear Session" button during test

---

## Features

### For Instructors
✓ Create unlimited tests
✓ Add multiple question types
✓ Set custom point values
✓ View test codes
✓ Copy codes easily
✓ Review all questions before publishing

### For Students
✓ Enter test using code
✓ Navigate between questions
✓ See progress indicator
✓ Timer with warnings
✓ Webcam monitoring
✓ Instant results for multiple choice
✓ View answer summary

### Security Features
✓ Webcam monitoring during test
✓ Tab switching detection
✓ Camera off detection
✓ Session monitoring
✓ Unique test codes

---

## Troubleshooting

### Test Code Not Found
- Check code is entered correctly (case-insensitive)
- Verify code was copied correctly from instructor
- Ensure test was created successfully

### Timer Issues
- Timer starts when test begins
- Automatically submits when time runs out
- Check system clock is correct

### Camera Issues
- Ensure camera permissions are granted
- Check camera is not in use by another app
- Refresh page if camera won't start

### Lost Progress
- Answers are saved as you type
- Refresh page to continue (if not submitted)
- After submission, results are saved

---

## Tips for Best Results

### For Instructors
1. Test your questions before sharing
2. Use clear, concise question wording
3. Provide adequate time for test duration
4. Share test code through secure channel
5. Keep backup of test codes

### For Students
1. Read questions carefully
2. Answer all questions before submitting
3. Use Previous/Next to review answers
4. Ensure good lighting for camera
5. Minimize distractions
6. Don't switch tabs during test

---

## Technical Details

### Browser Compatibility
- Works on all modern browsers
- Requires localStorage support
- Requires webcam access

### Data Format
- Tests stored as JSON in localStorage
- Submissions include timestamps
- Automatic grading for multiple choice

### Performance
- Handles 100+ questions per test
- Supports unlimited test submissions
- Smooth navigation between questions

