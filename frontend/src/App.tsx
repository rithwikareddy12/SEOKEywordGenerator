import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import VideoAnalysis from "./pages/VideoAnalysis";
import History from "./pages/History";
import Settings from "./pages/Settings";
import VideoPerformance from "./pages/VideoPerformance";
import NotFound from "./pages/NotFound";
import WhatsAppNotification from "./pages/WhatsAppNotification";
import YouTubeAnalysis from "./pages/YouTubeAnalysis";
import AnalyticsDashboard from "./pages/AnalyticsDashboard";
import { ThemeProvider } from "./components/ThemeProvider";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/video-analysis" element={<VideoAnalysis />} />
            <Route path="/history" element={<History />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/video-analytics/:id" element={<VideoPerformance />} />

            {/* Analytics-related routes */}
            <Route path="/analyticsdashboard" element={<AnalyticsDashboard />}></Route>
            <Route path="/analytics" element={<AnalyticsDashboard />} />
            <Route path="/analytics/whatsapp" element={<WhatsAppNotification />} />
            {/*<Route path="/analytics/search-volume" element={<SearchVolume />} /> */}
            <Route path="/analytics/youtube-analysis" element={<YouTubeAnalysis />} />
            
            {/* Fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
