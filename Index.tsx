import { useState, useEffect } from 'react';
import { WebcamMonitor } from '@/components/WebcamMonitor';
import { FocusScore } from '@/components/FocusScore';
import { AlertPanel } from '@/components/AlertPanel';
import { SessionControls } from '@/components/SessionControls';
import { StatsPanel } from '@/components/StatsPanel';
import { ShieldCheck } from 'lucide-react';

interface Alert {
  id: string;
  type: 'focus_loss' | 'device_detected' | 'away' | 'distracted';
  timestamp: Date;
  severity: 'low' | 'medium' | 'high';
  message: string;
}

const Index = () => {
  const [focusScore, setFocusScore] = useState(85);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [totalFocusTime, setTotalFocusTime] = useState(0);
  const [distractedTime, setDistractedTime] = useState(0);
  const [deviceDetections, setDeviceDetections] = useState(0);
  const [cameraActive, setCameraActive] = useState<boolean | undefined>(undefined);
  const [externalStopCounter, setExternalStopCounter] = useState(0);

  const handleCameraChange = (active: boolean, reason?: string) => {
    setCameraActive(active);
    if (!active) {
      // let the parent handle stopping the session with the provided reason
      handleStopSession(reason ?? 'camera_off');
      // Note: handleStopSession now handles incrementing externalStopCounter
    }
  };

  const handleStartSession = () => {
    console.log('Session started');
  };

  const handlePauseSession = () => {
    console.log('Session paused');
  };

  const handleStopSession = (reason?: string) => {
    console.log('Session stopped', reason ?? 'manual');
    // Create an alert when session ends due to camera off or tab change
    if (reason === 'camera_off') {
      const newAlert: Alert = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        type: 'away',
        timestamp: new Date(),
        severity: 'high',
        message: 'Camera turned off — session ended.',
      };
      setAlerts((prev) => [newAlert, ...prev]);
    } else if (reason === 'tab_hidden') {
      const newAlert: Alert = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        type: 'away',
        timestamp: new Date(),
        severity: 'high',
        message: 'Tab changed or hidden — session ended.',
      };
      setAlerts((prev) => [newAlert, ...prev]);
    } else if (reason === 'camera_covered') {
      const newAlert: Alert = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        type: 'away',
        timestamp: new Date(),
        severity: 'high',
        message: 'Camera appears to be covered — session ended.',
      };
      setAlerts((prev) => [newAlert, ...prev]);
    }
    // Notify SessionControls (or other child components) to reset local timers/UI
    setExternalStopCounter((c) => c + 1);
    // Reset stats if needed
  };

  // End session if user switches tab or hides the page
  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) {
        handleStopSession('tab_hidden');
      }
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">ExamGuard</h1>
                <p className="text-sm text-muted-foreground">AI-Powered Exam Monitoring</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="px-4 py-2 rounded-lg bg-success-subtle border border-success/20">
                <p className="text-xs text-muted-foreground">System Status</p>
                <p className="text-sm font-semibold text-success">Operational</p>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => window.location.href = '/create-test'}
                  className="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg font-medium flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  Create Test
                </button>
                <button 
                  onClick={() => window.location.href = '/take-test'}
                  className="px-4 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-lg font-medium flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m5 3 4 9-4 9 15-9Z" />
                  </svg>
                  Take Test
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Webcam & Score */}
          <div className="lg:col-span-2 space-y-6">
            <WebcamMonitor onCameraChange={handleCameraChange} />
            <SessionControls
              onStart={handleStartSession}
              onPause={handlePauseSession}
              onStop={handleStopSession}
              cameraActive={cameraActive}
              externalStopCounter={externalStopCounter}
            />
          </div>

          {/* Right Column - Stats & Alerts */}
          <div className="space-y-6">
            <FocusScore score={focusScore} trend="up" />
            <StatsPanel
              totalFocusTime={totalFocusTime}
              distractedTime={distractedTime}
              deviceDetections={deviceDetections}
              averageScore={focusScore}
            />
            <AlertPanel alerts={alerts} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
