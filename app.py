import streamlit as st
import cv2
import numpy as np
from focus_detection import FocusDetector
from device_detection import DeviceDetector
from utils import calculate_attention_score

def main():
    st.title("Online Exam Monitoring System")
    
    # Initialize detectors
    focus_detector = FocusDetector()
    device_detector = DeviceDetector()
    
    # Webcam setup
    cap = cv2.VideoCapture(0)
    
    # Streamlit layout
    col1, col2 = st.columns(2)
    
    with col1:
        frame_placeholder = st.empty()
        
    with col2:
        status_placeholder = st.empty()
        score_placeholder = st.empty()
        alert_placeholder = st.empty()
    
    focus_frames = 0
    total_frames = 0
    
    while True:
        ret, frame = cap.read()
        if not ret:
            st.error("Failed to access webcam!")
            break
            
        # Process frame for focus detection
        focus_state, head_pose = focus_detector.detect(frame)
        
        # Process frame for device detection
        devices_detected = device_detector.detect(frame)
        
        # Update attention score
        if focus_state == "Focused":
            focus_frames += 1
        total_frames += 1
        attention_score = calculate_attention_score(focus_frames, total_frames)
        
        # Draw status on frame
        frame = cv2.putText(frame, f"Status: {focus_state}", (10, 30),
                           cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
        
        # Display frame
        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        frame_placeholder.image(frame_rgb)
        
        # Update status and alerts
        status_placeholder.write(f"Head Pose: {head_pose}")
        score_placeholder.write(f"Attention Score: {attention_score:.2f}%")
        
        if devices_detected:
            alert_placeholder.error(f"⚠️ Alert: {', '.join(devices_detected)} detected!")
        elif focus_state == "Away":
            alert_placeholder.warning("⚠️ Student not detected in frame!")
        elif focus_state == "Distracted":
            alert_placeholder.warning("⚠️ Student appears distracted!")
        else:
            alert_placeholder.success("✅ Student is focused")

if __name__ == "__main__":
    main()