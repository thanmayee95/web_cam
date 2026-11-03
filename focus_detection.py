import cv2
import mediapipe as mp
import numpy as np

class FocusDetector:
    def __init__(self):
        self.mp_face_mesh = mp.solutions.face_mesh
        self.face_mesh = self.mp_face_mesh.FaceMesh(
            max_num_faces=1,
            min_detection_confidence=0.5,
            min_tracking_confidence=0.5
        )
        self.frame_counter = 0
        self.distraction_frames = 0
        
    def detect(self, frame):
        # Convert BGR to RGB
        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        
        # Process the frame
        results = self.face_mesh.process(frame_rgb)
        
        if not results.multi_face_landmarks:
            self.frame_counter = 0
            return "Away", "Not Detected"
        
        # Get face landmarks
        face_landmarks = results.multi_face_landmarks[0]
        
        # Get head pose
        head_pose = self._estimate_head_pose(face_landmarks, frame.shape)
        
        # Get gaze direction
        gaze_direction = self._estimate_gaze(face_landmarks)
        
        # Determine focus state
        focus_state = self._determine_focus_state(head_pose, gaze_direction)
        
        return focus_state, head_pose
    
    def _estimate_head_pose(self, landmarks, frame_shape):
        # Simple head pose estimation based on face landmarks
        # This is a simplified version - could be enhanced with proper 3D pose estimation
        image_height, image_width = frame_shape[:2]
        
        # Get nose tip and forehead points
        nose_tip = landmarks.landmark[4]
        forehead = landmarks.landmark[10]
        
        # Convert to pixel coordinates
        nx, ny = int(nose_tip.x * image_width), int(nose_tip.y * image_height)
        fx, fy = int(forehead.x * image_width), int(forehead.y * image_height)
        
        # Determine head pose based on relative positions
        if abs(nx - fx) < 10:  # Roughly frontal
            return "Frontal"
        elif nx > fx:
            return "Right"
        else:
            return "Left"
    
    def _estimate_gaze(self, landmarks):
        # Simple gaze estimation based on eye landmarks
        # This could be enhanced with proper eye tracking algorithms
        left_eye = landmarks.landmark[33]  # Left eye center
        right_eye = landmarks.landmark[263]  # Right eye center
        
        # Calculate average eye position
        eye_pos = (left_eye.z + right_eye.z) / 2
        
        if eye_pos > 0:
            return "Forward"
        else:
            return "Away"
    
    def _determine_focus_state(self, head_pose, gaze_direction):
        if head_pose == "Frontal" and gaze_direction == "Forward":
            self.distraction_frames = 0
            return "Focused"
        else:
            self.distraction_frames += 1
            if self.distraction_frames > 90:  # ~3 seconds at 30 fps
                return "Distracted"
            return "Focused"  # Give some buffer time before marking as distracted