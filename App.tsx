import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Home from "./pages/Home";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Recordings from "./pages/Recordings";
import Debug from "./pages/Debug";
import MonitoringDashboard from "./pages/MonitoringDashboard";
import CreateTest from "./pages/CreateTest";
import CreatorDashboardPage from "./pages/CreatorDashboardPage";
import TakeTest from "./pages/TakeTest";
import NotFound from "./pages/NotFound";
import { LoginPage } from "./pages/Login";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          
          {/* Protected routes for test creators */}
          <Route path="/dashboard" element={
            <ProtectedRoute requiresCreator>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/recordings" element={
            <ProtectedRoute requiresCreator>
              <Recordings />
            </ProtectedRoute>
          } />
          <Route path="/creator-dashboard" element={
            <ProtectedRoute requiresCreator>
              <CreatorDashboardPage />
            </ProtectedRoute>
          } />
          <Route path="/monitoring" element={
            <ProtectedRoute requiresCreator>
              <MonitoringDashboard />
            </ProtectedRoute>
          } />
          <Route path="/create-test" element={
            <ProtectedRoute requiresCreator>
              <CreateTest />
            </ProtectedRoute>
          } />
          
          {/* Public routes */}
          <Route path="/debug" element={<Debug />} />
          <Route path="/monitor" element={<Index />} />
          <Route path="/take-test" element={<TakeTest />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
