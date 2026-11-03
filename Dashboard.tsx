import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, ArrowLeft, Download, Trash2, Eye, FileText, Users, TrendingUp } from 'lucide-react';
import { getSubmissions, deleteSubmission, deleteAllSubmissions, Submission } from '@/lib/testStorage';

const Dashboard = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = () => {
    setLoading(true);
    const allSubmissions = getSubmissions();
    setSubmissions(allSubmissions);
    setLoading(false);
  };

  const handleDeleteAllSubmissions = () => {
    if (window.confirm('Are you sure you want to delete all submissions? This action cannot be undone.')) {
      deleteAllSubmissions();
      setSubmissions([]);
      setSelectedSubmission(null);
    }
  };

  const handleDeleteSubmission = (testCode: string, studentName: string) => {
    if (window.confirm(`Delete submission from ${studentName}?`)) {
      deleteSubmission(testCode, studentName);
      loadSubmissions();
      setSelectedSubmission(null);
    }
  };

  const handleDownloadResults = () => {
    const csv = generateCSV(submissions);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `exam-results-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const generateCSV = (subs: Submission[]) => {
    const headers = ['Test Code', 'Student Name', 'Score', 'Total Points', 'Percentage', 'Submitted At'];
    const rows = subs.map(s => [
      s.testCode,
      s.studentName,
      s.totalScore,
      s.totalPoints,
      s.percentage,
      new Date(s.submittedAt).toLocaleString(),
    ]);
    return [headers, ...rows].map(row => row.join(',')).join('\n');
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-success/10 text-success border-success/30';
    if (percentage >= 60) return 'bg-warning/10 text-warning border-warning/30';
    return 'bg-destructive/10 text-destructive border-destructive/30';
  };

  const getPassStatus = (percentage: number) => {
    return percentage >= 60 ? 'Pass' : 'Fail';
  };

  if (selectedSubmission) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <header className="border-b border-border/40 bg-card/95 backdrop-blur-sm shadow-sm sticky top-0 z-10">
          <div className="container mx-auto px-6 py-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
                  <ShieldCheck className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">ExamGuard</h1>
                  <p className="text-sm text-muted-foreground">Submission Details</p>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={() => setSelectedSubmission(null)}
                className="gap-2 hover:bg-primary/10 hover:border-primary/50 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Results
              </Button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-6 py-8">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Header Card */}
            <Card className="border-border/50 shadow-sm bg-gradient-to-r from-card to-card/50">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Student</p>
                    <p className="text-2xl font-bold">{selectedSubmission.studentName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground mb-1">Test Code</p>
                    <code className="text-lg font-mono font-bold">{selectedSubmission.testCode}</code>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <p className="text-sm font-medium text-muted-foreground mb-2">Score</p>
                  <p className="text-3xl font-bold text-primary">
                    {selectedSubmission.totalScore}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    out of {selectedSubmission.totalPoints}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <p className="text-sm font-medium text-muted-foreground mb-2">Percentage</p>
                  <p className="text-3xl font-bold text-purple-500">
                    {selectedSubmission.percentage}%
                  </p>
                  <div className="w-full h-2 bg-muted rounded-full mt-3 overflow-hidden">
                    <div
                      className={`h-full ${
                        selectedSubmission.percentage >= 80 ? 'bg-green-500' :
                        selectedSubmission.percentage >= 60 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${selectedSubmission.percentage}%` }}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className={`border-border/50 shadow-sm hover:shadow-md transition-shadow ${getScoreColor(selectedSubmission.percentage)}`}>
                <CardContent className="pt-6">
                  <p className="text-sm font-medium text-muted-foreground mb-2">Status</p>
                  <p className="text-3xl font-bold">
                    {getPassStatus(selectedSubmission.percentage)}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Answer Details */}
            <Card className="border-border/50 shadow-sm">
              <CardHeader className="border-b border-border/50 bg-muted/30">
                <CardTitle className="text-lg">Answer Details</CardTitle>
                <CardDescription>
                  {selectedSubmission.answers.length} question{selectedSubmission.answers.length !== 1 ? 's' : ''}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-2 max-h-96 overflow-y-auto p-6">
                  {selectedSubmission.answers.map((answer, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-lg border transition-all ${
                        answer.isCorrect
                          ? 'bg-green-500/5 border-green-500/30 hover:bg-green-500/10'
                          : 'bg-red-500/5 border-red-500/30 hover:bg-red-500/10'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold text-sm">Question {idx + 1}</span>
                            <Badge
                              variant={answer.isCorrect ? 'default' : 'destructive'}
                              className="text-xs"
                            >
                              {answer.isCorrect ? '✓ Correct' : '✗ Incorrect'}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            <span className="font-medium">Answer:</span> {answer.answer || '(No answer provided)'}
                          </p>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="font-medium">
                              Points: <span className="text-primary">{answer.pointsEarned || 0}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex gap-3 justify-end">
              <Button
                variant="destructive"
                onClick={() => handleDeleteSubmission(selectedSubmission.testCode, selectedSubmission.studentName)}
                className="gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete Submission
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const calculateStats = () => {
    const totalSubmissions = submissions.length;
    const avgScore = totalSubmissions > 0
      ? (submissions.reduce((sum, s) => sum + s.percentage, 0) / totalSubmissions).toFixed(1)
      : 0;
    const passCount = submissions.filter(s => s.percentage >= 60).length;

    return { totalSubmissions, avgScore, passCount };
  };

  const stats = calculateStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <header className="border-b border-border/40 bg-card/95 backdrop-blur-sm shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
                <ShieldCheck className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">ExamGuard</h1>
                <p className="text-sm text-muted-foreground">Results Dashboard</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={handleDownloadResults}
                disabled={submissions.length === 0}
                variant="outline"
                className="gap-2 hover:bg-primary/10 hover:border-primary/50 transition-all"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </Button>
              <Button
                onClick={() => window.location.href = '/'}
                variant="outline"
                className="hover:bg-primary/10 hover:border-primary/50 transition-all"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Home
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Total Submissions</p>
                    <p className="text-3xl font-bold text-foreground">{stats.totalSubmissions}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Average Score</p>
                    <p className="text-3xl font-bold text-foreground">{stats.avgScore}%</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-purple-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Pass Rate</p>
                    <p className="text-3xl font-bold text-foreground">
                      {stats.totalSubmissions > 0
                        ? ((stats.passCount / stats.totalSubmissions) * 100).toFixed(0)
                        : 0}%
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Submissions Table */}
          <Card className="border-border/50 shadow-sm">
            <CardHeader className="border-b border-border/50 bg-muted/30">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Test Submissions</CardTitle>
                  <CardDescription className="mt-1">
                    {submissions.length} submission{submissions.length !== 1 ? 's' : ''} recorded
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  {submissions.length > 0 && (
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={handleDeleteAllSubmissions}
                      className="gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete All
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {loading ? (
                <div className="text-center py-16">
                  <div className="inline-block w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
                  <p className="text-muted-foreground">Loading submissions...</p>
                </div>
              ) : submissions.length === 0 ? (
                <div className="text-center py-16 px-4">
                  <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="text-lg font-medium text-foreground mb-2">No submissions yet</p>
                  <p className="text-muted-foreground mb-6">Get started by taking a test</p>
                  <Button onClick={() => window.location.href = '/take-test'} className="gap-2">
                    <FileText className="w-4 h-4" />
                    Take a Test
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border/50 bg-muted/20">
                        <th className="text-left py-4 px-6 font-semibold text-sm text-muted-foreground uppercase tracking-wider">Student</th>
                        <th className="text-left py-4 px-6 font-semibold text-sm text-muted-foreground uppercase tracking-wider">Test Code</th>
                        <th className="text-center py-4 px-6 font-semibold text-sm text-muted-foreground uppercase tracking-wider">Score</th>
                        <th className="text-center py-4 px-6 font-semibold text-sm text-muted-foreground uppercase tracking-wider">Percentage</th>
                        <th className="text-center py-4 px-6 font-semibold text-sm text-muted-foreground uppercase tracking-wider">Status</th>
                        <th className="text-left py-4 px-6 font-semibold text-sm text-muted-foreground uppercase tracking-wider">Submitted</th>
                        <th className="text-center py-4 px-6 font-semibold text-sm text-muted-foreground uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/30">
                      {submissions.map((submission, idx) => (
                        <tr key={idx} className="hover:bg-muted/30 transition-colors">
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="text-sm font-semibold text-primary">
                                  {submission.studentName.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <span className="font-medium">{submission.studentName}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <code className="px-2 py-1 bg-muted/50 rounded text-sm font-mono">
                              {submission.testCode}
                            </code>
                          </td>
                          <td className="py-4 px-6 text-center">
                            <span className="font-semibold text-foreground">
                              {submission.totalScore}
                            </span>
                            <span className="text-muted-foreground">/{submission.totalPoints}</span>
                          </td>
                          <td className="py-4 px-6 text-center">
                            <div className="inline-flex items-center gap-2">
                              <div className="w-12 h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                  className={`h-full ${
                                    submission.percentage >= 80 ? 'bg-green-500' :
                                    submission.percentage >= 60 ? 'bg-yellow-500' :
                                    'bg-red-500'
                                  }`}
                                  style={{ width: `${submission.percentage}%` }}
                                />
                              </div>
                              <span className="font-semibold text-sm">{submission.percentage}%</span>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-center">
                            <Badge
                              variant={submission.percentage >= 60 ? 'default' : 'destructive'}
                              className="font-medium"
                            >
                              {getPassStatus(submission.percentage)}
                            </Badge>
                          </td>
                          <td className="py-4 px-6 text-sm text-muted-foreground">
                            {new Date(submission.submittedAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </td>
                          <td className="py-4 px-6 text-center">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setSelectedSubmission(submission)}
                              className="gap-2 hover:bg-primary/10 hover:text-primary transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

