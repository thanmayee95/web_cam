/**
 * Video Recording Service
 * Handles recording of webcam stream using MediaRecorder API
 */

export interface VideoRecorderOptions {
  mimeType?: string;
  audioBitsPerSecond?: number;
  videoBitsPerSecond?: number;
}

export class VideoRecorder {
  private mediaRecorder: MediaRecorder | null = null;
  private recordedChunks: Blob[] = [];
  private stream: MediaStream | null = null;
  private isRecording = false;

  /**
   * Start recording from a media stream
   */
  startRecording(stream: MediaStream, options?: VideoRecorderOptions): boolean {
    try {
      // Check if MediaRecorder is supported
      if (!window.MediaRecorder) {
        console.error('MediaRecorder is not supported in this browser');
        return false;
      }

      this.stream = stream;
      this.recordedChunks = [];

      // Determine MIME type
      const mimeType = options?.mimeType || this.getSupportedMimeType();
      
      if (!mimeType) {
        console.error('No supported MIME type found for video recording');
        return false;
      }

      // Create MediaRecorder
      this.mediaRecorder = new MediaRecorder(stream, {
        mimeType,
        audioBitsPerSecond: options?.audioBitsPerSecond,
        videoBitsPerSecond: options?.videoBitsPerSecond || 2500000, // 2.5 Mbps default
      });

      // Handle data available
      this.mediaRecorder.ondataavailable = (event: BlobEvent) => {
        if (event.data.size > 0) {
          this.recordedChunks.push(event.data);
        }
      };

      // Start recording
      this.mediaRecorder.start();
      this.isRecording = true;
      console.log('Video recording started');
      return true;
    } catch (error) {
      console.error('Error starting video recording:', error);
      return false;
    }
  }

  /**
   * Stop recording and return the recorded video blob
   */
  stopRecording(): Promise<Blob | null> {
    return new Promise((resolve) => {
      if (!this.mediaRecorder || !this.isRecording) {
        resolve(null);
        return;
      }

      this.mediaRecorder.onstop = () => {
        const mimeType = this.mediaRecorder?.mimeType || 'video/webm';
        const blob = new Blob(this.recordedChunks, { type: mimeType });
        console.log('Video recording stopped. Size:', blob.size, 'bytes');
        console.log('Recorded chunks count:', this.recordedChunks.length);
        this.isRecording = false;
        // Don't clear recordedChunks here - let saveToIndexedDB use them
        resolve(blob);
      };

      this.mediaRecorder.stop();
    });
  }

  /**
   * Pause recording
   */
  pauseRecording(): boolean {
    if (!this.mediaRecorder || !this.isRecording) {
      return false;
    }
    this.mediaRecorder.pause();
    return true;
  }

  /**
   * Resume recording
   */
  resumeRecording(): boolean {
    if (!this.mediaRecorder || !this.isRecording) {
      return false;
    }
    this.mediaRecorder.resume();
    return true;
  }

  /**
   * Get recording status
   */
  getIsRecording(): boolean {
    return this.isRecording;
  }

  /**
   * Get supported MIME type for video recording
   */
  private getSupportedMimeType(): string | null {
    const types = [
      'video/webm;codecs=vp9,opus',
      'video/webm;codecs=vp8,opus',
      'video/webm;codecs=h264,opus',
      'video/webm',
      'video/mp4',
    ];

    for (const type of types) {
      if (MediaRecorder.isTypeSupported(type)) {
        return type;
      }
    }

    return null;
  }

  /**
   * Download recorded video
   */
  downloadVideo(filename: string = 'recording.webm'): void {
    if (this.recordedChunks.length === 0) {
      console.warn('No recorded data to download');
      return;
    }

    const mimeType = this.mediaRecorder?.mimeType || 'video/webm';
    const blob = new Blob(this.recordedChunks, { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  /**
   * Save recorded video to IndexedDB
   */
  async saveToIndexedDB(
    dbName: string = 'ExamGuardDB',
    storeName: string = 'recordings',
    key: string = `recording_${Date.now()}`
  ): Promise<boolean> {
    try {
      console.log('saveToIndexedDB called with key:', key);
      console.log('Recorded chunks count:', this.recordedChunks.length);

      if (this.recordedChunks.length === 0) {
        console.warn('No recorded data to save');
        return false;
      }

      const mimeType = this.mediaRecorder?.mimeType || 'video/webm';
      const blob = new Blob(this.recordedChunks, { type: mimeType });
      console.log('Saving video to IndexedDB. Blob size:', blob.size, 'bytes');

      return new Promise((resolve) => {
        const request = indexedDB.open(dbName, 1);

        request.onerror = () => {
          console.error('IndexedDB open error:', request.error);
          resolve(false);
        };

        request.onupgradeneeded = (event) => {
          console.log('IndexedDB upgrade needed');
          const db = (event.target as IDBOpenDBRequest).result;
          if (!db.objectStoreNames.contains(storeName)) {
            console.log('Creating object store:', storeName);
            db.createObjectStore(storeName, { keyPath: 'key' });
          }
        };

        request.onsuccess = () => {
          console.log('IndexedDB opened successfully');
          const db = request.result;

          try {
            const transaction = db.transaction([storeName], 'readwrite');
            const objectStore = transaction.objectStore(storeName);

            const recordData = {
              key,
              blob,
              timestamp: new Date().toISOString(),
              size: blob.size,
            };

            console.log('Putting record:', recordData.key, 'Size:', recordData.size);
            const putRequest = objectStore.put(recordData);

            putRequest.onsuccess = () => {
              console.log('✅ Video saved to IndexedDB:', key, 'Size:', blob.size);
              // Clear chunks after successful save
              this.recordedChunks = [];
              resolve(true);
            };

            putRequest.onerror = () => {
              console.error('❌ Error saving to IndexedDB:', putRequest.error);
              resolve(false);
            };

            transaction.onerror = () => {
              console.error('❌ Transaction error:', transaction.error);
              resolve(false);
            };
          } catch (err) {
            console.error('❌ Error in transaction:', err);
            resolve(false);
          }
        };
      });
    } catch (error) {
      console.error('Error saving video to IndexedDB:', error);
      return false;
    }
  }
}

// Export singleton instance
export const videoRecorder = new VideoRecorder();

