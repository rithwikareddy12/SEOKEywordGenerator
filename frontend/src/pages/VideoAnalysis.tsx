import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { VideoUploader } from "@/components/VideoUploader";
import { DashboardLayout } from "@/components/DashboardLayout";
import { VideoPreview } from "@/components/VideoPreview";
import { AnalysisLoading } from "@/components/AnalysisLoading";
import { AnalysisResults } from "@/components/AnalysisResults";
import { StartAnalysisButton } from "@/components/StartAnalysisButton";
import { useToast } from "@/hooks/use-toast";

const VideoAnalysis = () => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [analysisId, setAnalysisId] = useState<string>("");
  const [analysisContent, setAnalysisContent] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState("Initializing...");
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
      return;
    }
    
    setUser(JSON.parse(storedUser));
  }, [navigate]);
  
  const handleVideoUploaded = (file: File, url: string) => {
    setVideoFile(file);
    setVideoUrl(url);
    
    // User must explicitly start analysis now
    toast({
      title: "Video uploaded",
      description: "Your video is ready for analysis",
    });
  };
  
  const analyzeVideo = async (file: File) => {
    if (!file) return;
    
    setIsAnalyzing(true);
    
    try {
      // Generate a unique ID for this analysis
      const newAnalysisId = `analysis-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      setAnalysisId(newAnalysisId);
      
      // Create FormData to send file to backend
      const formData = new FormData();
      formData.append('video', file);
      formData.append('userId', user?.email || '');
      formData.append('analysisId', newAnalysisId);
      
      // Start the analysis process
      setCurrentStep("Uploading video...");
      setProgress(10);
      
      // Send to backend 
      const response = await fetch('http://localhost:4000/api/analyze-video', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to upload video for analysis');
      }
      
      // Begin polling for status updates
      let analysisResult = null;
      let completed = false;
      
      // Poll for status updates every 3 seconds
      while (!completed) {
        setCurrentStep("Processing video...");
        setProgress(30);
        
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        const statusResponse = await fetch(`http://localhost:4000/api/analysis-status/${newAnalysisId}`);
        const statusData = await statusResponse.json();
        
        if (!statusResponse.ok) {
          throw new Error('Failed to get analysis status');
        }
        
        setCurrentStep(statusData.currentStep || "Processing...");
        setProgress(statusData.progress || 50);
        
        if (statusData.status === 'completed') {
          analysisResult = statusData.result;
          completed = true;
        }
        
        if (statusData.status === 'failed') {
          throw new Error(statusData.error || 'Analysis failed');
        }
      }
      
      // Format the received data to match our frontend expectations
      setAnalysisContent({
        title: analysisResult.title,
        hashtags: analysisResult.keywords,
        transcript: analysisResult.transcript,
        summary: analysisResult.summary,
        chartData: analysisResult.keywords.map((tag: string, index: number) => ({
          tag,
          count: Math.floor(Math.random() * 300) + 50,
          relevance: Math.floor(Math.random() * 100)
        }))
      });
      
      setIsAnalyzing(false);
      setAnalysisComplete(true);
      
      toast({
        title: "Analysis complete",
        description: "Your video has been analyzed successfully",
      });
    } catch (error) {
      console.error("Analysis error:", error);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis failed",
        description: "There was an error analyzing your video. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  if (!user) {
    return null; // Will redirect to login
  }
  
  return (
    <DashboardLayout title="Video Analysis">
      <div className="space-y-8">
        {!videoFile ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Upload a Video</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Upload a video to analyze and get SEO keywords, transcripts, and hashtag recommendations
            </p>
            <VideoUploader onVideoUploaded={handleVideoUploaded} />
          </div>
        ) : (
          <>
            <VideoPreview videoFile={videoFile} videoUrl={videoUrl} />
            
            {isAnalyzing ? (
              <AnalysisLoading currentStep={currentStep} progress={progress} />
            ) : analysisComplete && analysisContent ? (
              <AnalysisResults analysisContent={analysisContent} />
            ) : (
              <StartAnalysisButton onStartAnalysis={() => analyzeVideo(videoFile)} isLoading={isAnalyzing} />
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default VideoAnalysis;
