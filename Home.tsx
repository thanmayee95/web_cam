import { ShieldCheck, BookOpen, Play, BarChart3, Video, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Home = () => {
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
            <div className="px-4 py-2 rounded-lg bg-success-subtle border border-success/20">
              <p className="text-xs text-muted-foreground">System Status</p>
              <p className="text-sm font-semibold text-success">Operational</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Welcome to ExamGuard</h2>
            <p className="text-lg text-muted-foreground mb-2">
              Secure, monitored exam platform with AI-powered proctoring
            </p>
            <p className="text-muted-foreground">
              Choose your role below to get started
            </p>
          </div>

          {/* Creator Dashboard moved to a separate page (visible to creators only) */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold">Creator Tools</h3>
                <p className="text-muted-foreground">Creator dashboard is available on a separate page for test creators.</p>
              </div>
              <div className="flex gap-2">
                <Button asChild>
                  <a href="/create-test" className="gap-2">Create New Test</a>
                </Button>
                <Button asChild>
                  <a href="/creator-dashboard" className="gap-2">Go to Creator Dashboard</a>
                </Button>
              </div>
            </div>
          </div>

          {/* Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Create Test Card */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary/50"
              onClick={() => window.location.href = '/create-test'}>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Create Test</CardTitle>
                </div>
                <CardDescription>
                  For Instructors
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Create and manage exams with multiple-choice and text-based questions. Generate unique test codes for your students.
                </p>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Create custom tests
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Set duration and points
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Generate test codes
                  </li>
                </ul>
                <Button className="w-full mt-4">
                  Create Test
                </Button>
              </CardContent>
            </Card>

            {/* Take Test Card */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-secondary/50"
              onClick={() => window.location.href = '/take-test'}>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <Play className="w-6 h-6 text-secondary" />
                  </div>
                  <CardTitle>Take Test</CardTitle>
                </div>
                <CardDescription>
                  For Students
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Take an exam with AI-powered webcam monitoring. Answer questions and receive instant results with detailed feedback.
                </p>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    Enter test code
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    Webcam monitoring
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    Instant results
                  </li>
                </ul>
                <Button className="w-full mt-4">
                  Take Test
                </Button>
              </CardContent>
            </Card>

            {/* Dashboard Card */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-accent/50"
              onClick={() => window.location.href = '/dashboard'}>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-accent" />
                  </div>
                  <CardTitle>Results Dashboard</CardTitle>
                </div>
                <CardDescription>
                  View All Results
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  View all test submissions, student scores, and detailed analytics in one place.
                </p>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    View all submissions
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    Export results to CSV
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    Detailed analytics
                  </li>
                </ul>
                <Button className="w-full mt-4">
                  View Dashboard
                </Button>
              </CardContent>
            </Card>

            {/* Recordings Card */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-blue-500/50"
              onClick={() => window.location.href = '/recordings'}>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Video className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle>Video Recordings</CardTitle>
                </div>
                <CardDescription>
                  View Exam Sessions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Watch and manage all recorded exam sessions. Download or delete recordings as needed.
                </p>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    Watch recordings
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    Download videos
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    Manage storage
                  </li>
                </ul>
                <Button className="w-full mt-4">
                  View Recordings
                </Button>
              </CardContent>
            </Card>

            {/* Monitoring Dashboard Card */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-purple-500/50"
              onClick={() => window.location.href = '/monitoring'}>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Eye className="w-6 h-6 text-purple-600" />
                  </div>
                  <CardTitle>Live Monitoring</CardTitle>
                </div>
                <CardDescription>
                  Real-Time Proctoring
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Monitor student attention and behavior in real-time with AI-powered analysis and alerts.
                </p>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                    Attention tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                    Device detection
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                    Live alerts
                  </li>
                </ul>
                <Button className="w-full mt-4">
                  View Dashboard
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Features Section */}
          <Card className="bg-muted/50 border-muted">
            <CardHeader>
              <CardTitle>Key Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">🎥 AI Monitoring</h4>
                  <p className="text-sm text-muted-foreground">
                    Real-time webcam monitoring with attention tracking and alert detection
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">⚡ Instant Grading</h4>
                  <p className="text-sm text-muted-foreground">
                    Automatic grading for multiple-choice questions with immediate feedback
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">📊 Detailed Analytics</h4>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive session statistics and attention score tracking
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Home;

