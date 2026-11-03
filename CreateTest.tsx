import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, Copy } from 'lucide-react';
import { generateTestCode, saveTest } from '@/lib/utils';
import { createCreatorSession, saveTestCreator } from '@/lib/auth';
import { useNavigate } from 'react-router-dom';
import { TestDashboard } from '@/components/TestDashboard';

const CreateTest = () => {
  const navigate = useNavigate();
  
  interface Question {
    id: number;
    text: string;
    type: "text" | "multiple-choice";
    options: string[];
    correctAnswer: number;
    points: number;
  }

  const [testDetails, setTestDetails] = useState({
    title: '',
    duration: '',
    description: '',
    questions: [] as Question[],
    interfaceType: 'standard' as 'standard' | 'survey' | 'timed'
  });

  const [newQuestion, setNewQuestion] = useState({
    text: '',
    type: "multiple-choice" as const,
    options: ['', '', '', ''],
    correctAnswer: 0,
    points: 1
  });

  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [creatorEmail, setCreatorEmail] = useState('');
  const [creatorName, setCreatorName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (testDetails.questions.length === 0) {
      alert('Please add at least one question to the test');
      return;
    }

    // validate creator email (basic Gmail check)
    if (!creatorEmail || !creatorEmail.includes('@') || !creatorEmail.toLowerCase().includes('gmail.com')) {
      alert('Please enter a valid Gmail address for the test creator.');
      return;
    }

    // create a prefixed code based on interface type
    const prefixMap: Record<string, string> = {
      standard: 'STD',
      survey: 'SRV',
      timed: 'TMD'
    };
    const baseCode = generateTestCode();
    const prefix = prefixMap[testDetails.interfaceType || 'standard'] || 'STD';
    const code = `${prefix}-${baseCode}`;

    const test = {
      id: Date.now().toString(),
      code,
      ...testDetails,
      createdAt: new Date().toISOString(),
      creatorEmail: creatorEmail.trim().toLowerCase(),
    };

    saveTest(test);

    // create or update creator session/listing so dashboard can match by email
    const creator = createCreatorSession(creatorEmail.trim().toLowerCase(), creatorName || creatorEmail.split('@')[0]);
    saveTestCreator(code, creator);
    setGeneratedCode(code);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Create New Test</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Test Title</Label>
                <Input
                  id="title"
                  value={testDetails.title}
                  onChange={(e) => setTestDetails({ ...testDetails, title: e.target.value })}
                  placeholder="Enter test title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="creatorEmail">Creator Gmail</Label>
                <Input
                  id="creatorEmail"
                  type="email"
                  value={creatorEmail}
                  onChange={(e) => setCreatorEmail(e.target.value)}
                  placeholder="creator@gmail.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="creatorName">Creator Name (optional)</Label>
                <Input
                  id="creatorName"
                  value={creatorName}
                  onChange={(e) => setCreatorName(e.target.value)}
                  placeholder="Creator display name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={testDetails.duration}
                  onChange={(e) => setTestDetails({ ...testDetails, duration: e.target.value })}
                  placeholder="Enter test duration"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Test Description</Label>
                <Textarea
                  id="description"
                  value={testDetails.description}
                  onChange={(e) => setTestDetails({ ...testDetails, description: e.target.value })}
                  placeholder="Enter test description"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="interfaceType">Test Interface Type</Label>
                <select
                  id="interfaceType"
                  value={testDetails.interfaceType}
                  onChange={(e) => setTestDetails({ ...testDetails, interfaceType: e.target.value as any })}
                  className="w-full p-2 border rounded"
                >
                  <option value="standard">Standard (graded, multiple-choice)</option>
                  <option value="survey">Survey (responses only, no grading)</option>
                  <option value="timed">Timed (graded with timer)</option>
                </select>
              </div>

              {/* Questions Section */}
              <div className="space-y-4">
                <Label>Questions</Label>
                {testDetails.questions.map((question, index) => (
                  <Card key={question.id} className="p-4">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">Question {index + 1}</h3>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => {
                            setTestDetails({
                              ...testDetails,
                              questions: testDetails.questions.filter((q) => q.id !== question.id),
                            });
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <p>{question.text}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {question.options.map((option, optIndex) => (
                          <div
                            key={optIndex}
                            className={`p-2 border rounded ${
                              question.correctAnswer === optIndex ? 'border-green-500 bg-green-50' : ''
                            }`}
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}

                {/* Add New Question Form */}
                <Card className="p-4">
                  <div className="space-y-4">
                    <h3 className="font-medium">Add New Question</h3>
                    <div className="space-y-2">
                      <Label htmlFor="questionText">Question Text</Label>
                      <Textarea
                        id="questionText"
                        value={newQuestion.text}
                        onChange={(e) =>
                          setNewQuestion({ ...newQuestion, text: e.target.value })
                        }
                        placeholder="Enter your question"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Options</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {newQuestion.options.map((option, index) => (
                          <div key={index} className="space-y-1">
                            <Input
                              value={option}
                              onChange={(e) => {
                                const newOptions = [...newQuestion.options];
                                newOptions[index] = e.target.value;
                                setNewQuestion({ ...newQuestion, options: newOptions });
                              }}
                              placeholder={`Option ${index + 1}`}
                            />
                            <Button
                              type="button"
                              variant={newQuestion.correctAnswer === index ? "default" : "outline"}
                              className="w-full"
                              onClick={() =>
                                setNewQuestion({ ...newQuestion, correctAnswer: index })
                              }
                            >
                              {newQuestion.correctAnswer === index ? "Correct Answer" : "Set as Correct"}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button
                      type="button"
                      onClick={() => {
                        if (newQuestion.text.trim() && newQuestion.options.every(opt => opt.trim())) {
                          setTestDetails({
                            ...testDetails,
                            questions: [
                              ...testDetails.questions,
                              {
                                id: Date.now(),
                                ...newQuestion,
                                type: "multiple-choice",
                                points: 1,
                              },
                            ],
                          });
                          setNewQuestion({
                            text: '',
                            type: "multiple-choice",
                            options: ['', '', '', ''],
                            correctAnswer: 0,
                            points: 1
                          });
                        }
                      }}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Question
                    </Button>
                  </div>
                </Card>
              </div>

              <Button 
                type="submit" 
                className="w-full"
                disabled={generatedCode !== null}
              >
                Create Test
              </Button>
            </form>

            {generatedCode && (
              <div className="mt-6 space-y-6">
                <Card className="bg-green-50">
                  <CardContent className="pt-6">
                    <div className="text-center space-y-4">
                      <h3 className="text-xl font-semibold text-green-700">Test Created Successfully!</h3>
                      <div className="bg-white p-4 rounded-lg border border-green-200">
                        <p className="text-sm text-gray-600 mb-2">Test Code:</p>
                        <div className="flex items-center justify-center gap-2">
                          <code className="text-2xl font-mono font-bold text-green-600">{generatedCode}</code>
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => {
                              navigator.clipboard.writeText(generatedCode);
                              alert('Test code copied to clipboard!');
                            }}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">
                        Share this code with students to let them take the test
                      </p>
                      <div className="flex gap-2 justify-center">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setGeneratedCode(null);
                            setTestDetails({
                              title: '',
                              duration: '',
                              description: '',
                              questions: [],
                              interfaceType: 'standard'
                            });
                          }}
                        >
                          Create Another Test
                        </Button>
                        <Button
                          onClick={() => navigate('/creator-dashboard')}
                        >
                          Go to Creator Dashboard
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Test Monitoring Dashboard */}
                <Card>
                  <CardHeader>
                    <CardTitle>Test Monitoring Dashboard</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <TestDashboard testCode={generatedCode} />
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateTest;