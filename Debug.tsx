import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const Debug = () => {
  const [recordings, setRecordings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkRecordings();
  }, []);

  const checkRecordings = async () => {
    setLoading(true);
    setError(null);
    try {
      const request = indexedDB.open('ExamGuardDB', 1);

      request.onerror = () => {
        setError(`IndexedDB error: ${request.error}`);
        setLoading(false);
      };

      request.onsuccess = () => {
        const db = request.result;
        console.log('Database opened successfully');
        console.log('Object stores:', Array.from(db.objectStoreNames));

        const transaction = db.transaction(['recordings'], 'readonly');
        const objectStore = transaction.objectStore('recordings');
        const getAllRequest = objectStore.getAll();

        getAllRequest.onsuccess = () => {
          const data = getAllRequest.result || [];
          console.log('Recordings found:', data.length);
          console.log('Recordings data:', data);
          
          // Convert blobs to sizes for display
          const recordingsInfo = data.map((r: any) => ({
            key: r.key,
            timestamp: r.timestamp,
            size: r.size,
            testCode: r.testCode || 'N/A',
            studentName: r.studentName || 'N/A',
            blobSize: r.blob?.size || 0,
          }));
          
          setRecordings(recordingsInfo);
          setLoading(false);
        };

        getAllRequest.onerror = () => {
          setError(`Error getting recordings: ${getAllRequest.error}`);
          setLoading(false);
        };
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains('recordings')) {
          db.createObjectStore('recordings', { keyPath: 'key' });
        }
      };
    } catch (err) {
      setError(`Error: ${err}`);
      setLoading(false);
    }
  };

  const clearAllRecordings = async () => {
    try {
      const request = indexedDB.open('ExamGuardDB', 1);

      request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction(['recordings'], 'readwrite');
        const objectStore = transaction.objectStore('recordings');
        const clearRequest = objectStore.clear();

        clearRequest.onsuccess = () => {
          alert('All recordings cleared!');
          checkRecordings();
        };
      };
    } catch (err) {
      alert(`Error clearing: ${err}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => window.location.href = '/'}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>Debug - IndexedDB Recordings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex gap-3">
              <Button onClick={checkRecordings} variant="outline">
                Refresh
              </Button>
              <Button onClick={clearAllRecordings} variant="destructive">
                Clear All Recordings
              </Button>
            </div>

            {loading && <p className="text-muted-foreground">Loading...</p>}

            {error && (
              <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
                <p className="text-destructive font-semibold">Error:</p>
                <p className="text-sm text-destructive/80">{error}</p>
              </div>
            )}

            {!loading && !error && (
              <div>
                <p className="font-semibold mb-4">
                  Total Recordings: <span className="text-primary">{recordings.length}</span>
                </p>

                {recordings.length === 0 ? (
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <p className="text-muted-foreground">No recordings found in IndexedDB</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {recordings.map((rec, idx) => (
                      <div key={idx} className="p-4 border rounded-lg bg-card">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Key</p>
                            <p className="font-mono text-xs break-all">{rec.key}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Timestamp</p>
                            <p className="text-xs">{rec.timestamp}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Size</p>
                            <p className="font-semibold">{(rec.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Blob Size</p>
                            <p className="font-semibold">{(rec.blobSize / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Test Code</p>
                            <p className="font-semibold">{rec.testCode}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Student Name</p>
                            <p className="font-semibold">{rec.studentName}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm font-semibold text-blue-900 mb-2">How to use this page:</p>
              <ol className="text-sm text-blue-800 space-y-1">
                <li>1. Take a test with camera enabled</li>
                <li>2. Submit the test</li>
                <li>3. Come back to this page</li>
                <li>4. Click "Refresh" to see if recording appears</li>
                <li>5. Check the recording details below</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Debug;

