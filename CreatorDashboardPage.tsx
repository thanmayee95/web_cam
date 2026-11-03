import { getCurrentCreator } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CreatorDashboard } from '@/components/CreatorDashboard';

export default function CreatorDashboardPage() {
  const creator = getCurrentCreator();

  // ProtectedRoute in App.tsx also protects this route; here we show helpful state
  if (!creator) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-2">Creator Dashboard</h2>
              <p className="text-muted-foreground mb-4">You must be signed in as a test creator to view this page.</p>
              <div className="flex items-center justify-center gap-3">
                <Button asChild>
                  <a href="/login">Sign in as Creator</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/">Go Home</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // If creator exists but has no created tests, guide them to create one
  if (!creator.createdTests || creator.createdTests.length === 0) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Create your first test</CardTitle>
              <CardDescription>Once you create a test, you'll see it listed here with live monitoring stats.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 text-center">
              <Button asChild>
                <a href="/create-test">Create Test</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Creator Dashboard</h1>
          <p className="text-muted-foreground">Overview of your tests and live monitoring (visible only to you).</p>
        </div>
        <CreatorDashboard />
      </div>
    </div>
  );
}
