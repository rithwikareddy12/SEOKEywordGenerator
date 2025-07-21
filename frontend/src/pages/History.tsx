import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, Calendar, Clock, Tag, FileText } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

interface VideoAnalysisHistoryItem {
  id: string;
  videoName: string;
  timestamp: string;
  title: string;
  hashtags: string[];
  transcript: string;
  summary: string;
}

const History = () => {
  const [history, setHistory] = useState<VideoAnalysisHistoryItem[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
      return;
    }
    
   }, [navigate]);
  
  // Format date for displaying in history
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  };
  
  const handleViewDetails = (itemId: string) => {
    console.log("Navigating to video details:", itemId);
    navigate(`/video-analytics/${itemId}`);
  };
  
  return (
    <DashboardLayout title="Analysis History">
      <div className="space-y-6 animate-fade-in">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Video Analysis History</CardTitle>
            <CardDescription>
              Your previously analyzed videos and generated content
            </CardDescription>
          </CardHeader>
          <CardContent>
            {history.length > 0 ? (
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-6">
                  {history.map((item) => (
                    <Card key={item.id} className="border-l-4 border-l-brand-purple hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Video className="h-5 w-5 text-brand-purple" />
                            <CardTitle className="text-lg">{item.videoName}</CardTitle>
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                            <Clock className="inline h-4 w-4 mr-1" />
                            {formatDate(item.timestamp)}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-3">
                          <div>
                            <h4 className="text-sm font-medium flex items-center mb-1">
                              <FileText className="h-4 w-4 mr-1 text-gray-500" /> Generated Title
                            </h4>
                            <p className="text-sm font-semibold pl-5">{item.title}</p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium flex items-center mb-1">
                              <Tag className="h-4 w-4 mr-1 text-gray-500" /> Hashtags
                            </h4>
                            <div className="flex flex-wrap gap-1 pl-5">
                              {item.hashtags.slice(0, 5).map((tag, idx) => (
                                <span key={idx} className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                  #{tag}
                                </span>
                              ))}
                              {item.hashtags.length > 5 && (
                                <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                  +{item.hashtags.length - 5} more
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium flex items-center mb-1">
                              <FileText className="h-4 w-4 mr-1 text-gray-500" /> Summary
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 pl-5">{item.summary}</p>
                          </div>
                          
                          <div className="pt-2 flex justify-end">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-xs"
                              onClick={() => handleViewDetails(item.id)}
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <div className="text-center py-12 space-y-3">
                <Video className="h-12 w-12 mx-auto text-gray-400" />
                <h3 className="text-lg font-semibold">No analysis history yet</h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                  You haven't analyzed any videos yet. Start by uploading a video in the Video Analysis section.
                </p>
                <Button 
                  onClick={() => navigate("/video-analysis")}
                  className="mt-2 bg-brand-purple hover:bg-brand-purple-dark"
                >
                  Start Video Analysis
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default History;
