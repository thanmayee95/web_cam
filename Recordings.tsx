import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Download, Trash2, Play, Video, RefreshCw } from 'lucide-react';
import { getAllRecordings, deleteRecording, VideoRecording } from '@/lib/testStorage';
import { getCurrentCreator } from '@/lib/auth';
import { getTests } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const Recordings = () => {
  const [recordings, setRecordings] = useState<VideoRecording[]>([]);
  const [selectedRecording, setSelectedRecording] = useState<VideoRecording | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadRecordings();
  }, []);

  const loadRecordings = async () => {
    setLoading(true);
    try {
      const allRecordings = await getAllRecordings();
      console.log('Loaded recordings:', allRecordings);

      // If a creator is logged in, only show recordings for tests they created (match by creatorEmail)
      const currentCreator = getCurrentCreator();
      let filtered = allRecordings;
      if (currentCreator) {
        const tests = getTests();
        const myTestCodes = tests.filter(t => (t as any).creatorEmail === currentCreator.email).map(t => t.code);
        filtered = allRecordings.filter(r => r.testCode && myTestCodes.includes(r.testCode));
      }

      // Sort by timestamp descending (newest first)
      const sorted = filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      setRecordings(sorted);
    } catch (error) {
      console.error('Error loading recordings:', error);
      toast({
        title: "Error",
        description: "Failed to load recordings",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  const handleRefresh = () => {
    loadRecordings();
    toast({
      title: "Refreshed",
      description: "Recordings list updated",
    });
  };

  const handleDownloadRecording = (recording: VideoRecording) => {
    try {
      const url = URL.createObjectURL(recording.blob);
      const a = document.createElement('a');
      a.href = url;
      const timestamp = new Date(recording.timestamp).toISOString().split('T')[0];
      const studentName = recording.studentName || 'unknown';
      a.download = `recording_${studentName}_${timestamp}.webm`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Success",
        description: "Recording downloaded successfully",
      });
    } catch (error) {
      console.error('Error downloading recording:', error);
      toast({
        title: "Error",
        description: "Failed to download recording",
        variant: "destructive",
      });
    }
  };

  const handleDeleteRecording = async (key: string) => {
    if (window.confirm('Are you sure you want to delete this recording?')) {
      try {
        const success = await deleteRecording(key);
        if (success) {
          setRecordings(recordings.filter(r => r.key !== key));
          setSelectedRecording(null);
          toast({
            title: "Success",
            description: "Recording deleted successfully",
          });
        } else {
          toast({
            title: "Error",
            description: "Failed to delete recording",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Error deleting recording:', error);
        toast({
          title: "Error",
          description: "Failed to delete recording",
          variant: "destructive",
        });
      }
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  if (selectedRecording) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => setSelectedRecording(null)}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Recordings
          </Button>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Video className="w-5 h-5" />
                    Recording Details
                  </CardTitle>
                  <CardDescription>
                    {selectedRecording.studentName && `Student: ${selectedRecording.studentName}`}
                    {selectedRecording.testCode && ` • Test: ${selectedRecording.testCode}`}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Video Player */}
              <div className="bg-black rounded-lg overflow-hidden">
                <video
                  controls
                  className="w-full h-auto max-h-96"
                  src={URL.createObjectURL(selectedRecording.blob)}
                />
              </div>

              {/* Recording Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Recording Date</p>
                  <p className="font-semibold">
                    {new Date(selectedRecording.timestamp).toLocaleString()}
                  </p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <p className="text-sm text-muted-foreground">File Size</p>
                  <p className="font-semibold">{formatFileSize(selectedRecording.size)}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  onClick={() => handleDownloadRecording(selectedRecording)}
                  className="flex-1"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Recording
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    handleDeleteRecording(selectedRecording.key);
                  }}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              onClick={() => window.location.href = '/'}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <Button
              variant="outline"
              onClick={handleRefresh}
              size="sm"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 flex items-center gap-3">
            <Video className="w-8 h-8 text-blue-600" />
            Video Recordings
          </h1>
          <p className="text-slate-600 mt-2">
            View and manage all exam session recordings
          </p>
        </div>

        {loading ? (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">Loading recordings...</p>
            </CardContent>
          </Card>
        ) : recordings.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Video className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground font-semibold">No recordings found</p>
              <p className="text-sm text-muted-foreground mt-2">
                Recordings will appear here when students complete exams with camera enabled.
              </p>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm font-semibold text-blue-900 mb-2">How to create recordings:</p>
                <ol className="text-sm text-blue-800 space-y-1 text-left">
                  <li>1. Go to <strong>Create Test</strong> and create a test</li>
                  <li>2. Go to <strong>Take Test</strong> and enter the test code</li>
                  <li>3. <strong>Enable your camera</strong> when prompted</li>
                  <li>4. Complete and submit the test</li>
                  <li>5. Recordings will appear here automatically</li>
                </ol>
              </div>
              <Button
                onClick={handleRefresh}
                className="mt-6"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh to Check for Recordings
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {recordings.map((recording) => (
              <Card
                key={recording.key}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedRecording(recording)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                        <Play className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">
                          {recording.studentName || 'Unknown Student'}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          {recording.testCode && (
                            <Badge variant="outline">Test: {recording.testCode}</Badge>
                          )}
                          <span className="text-sm text-muted-foreground">
                            {new Date(recording.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Size: {formatFileSize(recording.size)}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownloadRecording(recording);
                        }}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteRecording(recording.key);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Recordings;

