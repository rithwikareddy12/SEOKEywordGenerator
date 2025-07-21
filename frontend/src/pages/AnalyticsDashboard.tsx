import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SearchVolumeChart, YouTubeAnalysisChart, WhatsAppNotificationChart } from "@/components/AnalyticsCharts";
import { LoadingSpinner } from "@/components/ui/loading";

const AnalyticsDashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching analytics data
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <DashboardLayout title="Analytics Dashboard">
      <div className="space-y-6 animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card
            className="card-shadow hover-scale dark:bg-gray-800 dark:text-white cursor-pointer"
            onClick={() => navigate("/analytics/whatsapp")}
            >
            <CardHeader>
                <CardTitle>WhatsApp Notifications</CardTitle>
                <CardDescription className="dark:text-gray-400">
                Track video milestones and send alerts via WhatsApp
                </CardDescription>
            </CardHeader>
            <CardContent>
                <WhatsAppNotificationChart />
            </CardContent>
           </Card>

           

          <Card
            className="card-shadow hover-scale dark:bg-gray-800 dark:text-white cursor-pointer"
            onClick={() => navigate("/analytics/youtube-analysis")}
            >
            <CardHeader>
                <CardTitle>YouTube Video Analysis</CardTitle>
                <CardDescription className="dark:text-gray-400">
                Analyze your YouTube video's performance
                </CardDescription>
            </CardHeader>
            <CardContent>
                <YouTubeAnalysisChart />
            </CardContent>
            </Card>

        </div>

        <div className="mt-6">
          <Button
            variant="outline"
            className="w-full dark:border-gray-700 dark:text-gray-300"
            onClick={() => navigate("/dashboard")}
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AnalyticsDashboard;
