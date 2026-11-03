from ultralytics import YOLO
import cv2
import numpy as np

class DeviceDetector:
    def __init__(self):
        # Load YOLOv8 model
        self.model = YOLO('yolov8n.pt')  # Use nano model for faster inference
        self.target_classes = ['cell phone', 'laptop', 'tablet']
        
    def detect(self, frame):
        # Run inference
        results = self.model(frame)
        
        detected_devices = []
        
        # Process results
        for result in results:
            boxes = result.boxes
            for box in boxes:
                # Get class name
                cls = result.names[int(box.cls[0])]
                
                # Check if detected object is in target classes
                if cls in self.target_classes:
                    # Get confidence score
                    conf = float(box.conf[0])
                    
                    # Only add if confidence is high enough
                    if conf > 0.5:  # 50% confidence threshold
                        detected_devices.append(cls)
        
        return list(set(detected_devices))  # Remove duplicates