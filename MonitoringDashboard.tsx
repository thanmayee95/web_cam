import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { getCurrentCreator } from '@/lib/auth';

// Types
export type AlertSeverity = 'low' | 'medium' | 'high';

export interface AlertEvent {
  type: string;
  severity: AlertSeverity;
  message: string;
  timestamp: number;
}

export interface StudentSession {
  id: string;
  name: string;
  testCode: string;
  startTime: number;
  currentScore: number;
  averageScore: number;
  alertCount: number;
  lastAlert?: AlertEvent;
  status: 'focused' | 'distracted' | 'away';
}

const MonitoringDashboard = () => {
  const [sessions, setSessions] = useState<StudentSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<StudentSession | null>(null);
  const [currentCreator, setCurrentCreator] = useState<any | null>(null);

  useEffect(() => {
    // Load current creator (if any)
    const creator = getCurrentCreator();
    setCurrentCreator(creator);

    // Mock data setup (replace with real data source later)
    const mockSessions: StudentSession[] = [
      {
        id: '1',
        name: 'John Doe',
        testCode: 'ABC123',
        startTime: Date.now() - 300000,
        currentScore: 85,
        averageScore: 82,
        alertCount: 2,
        status: 'focused',
        lastAlert: {
          type: 'distraction',
          severity: 'low',
          message: 'Brief distraction detected',
          timestamp: Date.now() - 30000,
        },
      },
      {
        id: '2',
        name: 'Jane Smith',
        testCode: 'XYZ789',
        startTime: Date.now() - 600000,
        currentScore: 45,
        averageScore: 52,
        alertCount: 8,
        status: 'distracted',
        lastAlert: {
          type: 'device_detected',
          severity: 'high',
          message: 'Mobile phone detected',
          timestamp: Date.now() - 5000,
        },
      },
      {
        id: '3',
        name: 'Bob Wilson',
        testCode: 'DEF456',
        startTime: Date.now() - 120000,
        currentScore: 92,
        averageScore: 90,
        alertCount: 0,
        status: 'focused',
      },
    ];

    // If a creator is logged in, only show sessions for tests they created
    if (creator && creator.createdTests && creator.createdTests.length > 0) {
      // Normalize codes to be prefix-agnostic. Tests created use codes like "STD-ABC123"
      // while our mock sessions use "ABC123". Strip any prefix before matching.
      const normalizedCreatorCodes = creator.createdTests.map((c: string) => c.replace(/^.*-/, ''));
      const filtered = mockSessions.filter((s) => normalizedCreatorCodes.includes(s.testCode) || creator.createdTests.includes(s.testCode));
      setSessions(filtered);
    } else if (creator) {
      // creator exists but has no tests yet -> show empty sessions
      setSessions([]);
    } else {
      // not logged in as creator, show empty list (page will prompt login)
      setSessions([]);
    }
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'focused':
        return 'bg-green-100 text-green-800';
      case 'distracted':
        return 'bg-yellow-100 text-yellow-800';
      case 'away':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAlertSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    }
    return `${minutes}m ${seconds % 60}s`;
  };

  // If no creator is logged in, show a friendly prompt (only creators can view this page)
  if (!currentCreator) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => (window.location.href = '/')}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <h1 className="text-3xl font-bold text-slate-900">Monitoring Dashboard</h1>
            <p className="text-slate-600 mt-2">This view is only available to the test creator who created the test.</p>
          </div>

          <Card>
            <CardContent className="p-8 text-center">
              <p className="mb-4">You're not signed in as a test creator.</p>
              <div className="flex items-center justify-center gap-3">
                <Button onClick={() => (window.location.href = '/login')}>Sign in as Creator</Button>
                <Button variant="outline" onClick={() => (window.location.href = '/')}>Go Home</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => (window.location.href = '/')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-4xl font-bold text-slate-900">Exam Monitoring Dashboard</h1>
          <p className="text-slate-600 mt-2">Real-time monitoring of student attention and behavior</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Active Sessions</p>
                <p className="text-3xl font-bold">{sessions.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Focused Students</p>
                <p className="text-3xl font-bold text-green-600">
                  {sessions.filter((s) => s.status === 'focused').length}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Distracted</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {sessions.filter((s) => s.status === 'distracted').length}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Total Alerts</p>
                <p className="text-3xl font-bold text-red-600">
                  {sessions.reduce((sum, s) => sum + s.alertCount, 0)}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Active Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sessions.map((session) => (
                    <div
                      key={session.id}
                      className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition"
                      onClick={() => setSelectedSession(session)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold">{session.name}</p>
                          <p className="text-sm text-muted-foreground">Test: {session.testCode}</p>
                        </div>
                        <Badge className={getStatusColor(session.status)}>
                          {session.status.toUpperCase()}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-sm mb-2">
                        <div>
                          <p className="text-muted-foreground">Current</p>
                          <p className="font-semibold">{session.currentScore}%</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Average</p>
                          <p className="font-semibold">{session.averageScore}%</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Duration</p>
                          <p className="font-semibold">{formatTime(Date.now() - session.startTime)}</p>
                        </div>
                      </div>

                      {session.alertCount > 0 && (
                        <div className="flex items-center gap-2 text-xs text-destructive">
                          <AlertTriangle className="w-3 h-3" />
                          {session.alertCount} alerts
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {selectedSession && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Session Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Student Name</p>
                  <p className="font-semibold">{selectedSession.name}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Test Code</p>
                  <p className="font-semibold">{selectedSession.testCode}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-semibold">{formatTime(Date.now() - selectedSession.startTime)}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Current Score</p>
                  <p className="text-2xl font-bold">{selectedSession.currentScore}%</p>
                </div>

                {selectedSession.lastAlert && (
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm font-semibold mb-1">Last Alert</p>
                    <Badge className={getAlertSeverityColor(selectedSession.lastAlert.severity)}>
                      {selectedSession.lastAlert.severity.toUpperCase()}
                    </Badge>
                    <p className="text-sm mt-2">{selectedSession.lastAlert.message}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default MonitoringDashboard;

