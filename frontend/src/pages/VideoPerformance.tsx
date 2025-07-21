
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpRight, ArrowDownRight, Eye, TrendingUp, RefreshCw, Clock, Hash } from "lucide-react";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

interface VideoAnalysisItem {
  id: string;
  videoName: string;
  timestamp: string;
  title: string;
  hashtags: string[];
  transcript: string;
  summary: string;
  views: {
    total: number;
    byHashtag: Record<string, number>;
    engagement: number;
    impressions: number;
  };
}

const VideoPerformance = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [analysisData, setAnalysisData] = useState<VideoAnalysisItem | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Generate performance data for demo
  const [performanceData, setPerformanceData] = useState<any>({
    dailyViews: [],
    hashtagPerformance: [],
    engagementRate: 0,
    viewTrend: 'up',
    weeklyGrowth: 0,
    contentPerformance: [] // Added for content vs hashtag graph
  });
  
  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
      return;
    }
    
    // Load video analysis data
    const historyString = localStorage.getItem("video-analysis-history") || "[]";
    const history = JSON.parse(historyString) as VideoAnalysisItem[];
    
    const analysis = history.find(item => item.id === id);
    if (!analysis) {
      navigate("/history");
      return;
    }
    
    setAnalysisData(analysis);
    
    // Generate demo performance data
    generatePerformanceData(analysis);
    
    setLoading(false);
  }, [id, navigate]);
  
  const generatePerformanceData = (analysis: VideoAnalysisItem) => {
    // Generate daily views for the last 14 days
    const dailyViews = [];
    let totalViews = analysis.views.total || Math.floor(Math.random() * 5000) + 1000;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 14);
    
    for (let i = 0; i < 14; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      
      const dailyView = Math.floor(Math.random() * (totalViews / 20)) + (totalViews / 30);
      dailyViews.push({
        date: date.toISOString().split('T')[0],
        views: dailyView
      });
    }
    
    // Generate hashtag performance data
    const hashtagPerformance = analysis.hashtags.map(tag => ({
      hashtag: tag,
      views: analysis.views.byHashtag[tag] || Math.floor(Math.random() * 500) + 50,
      engagement: Math.floor(Math.random() * 100) / 10, // 0.0 to 10.0
      ranking: Math.floor(Math.random() * 100) + 1 // 1-100 ranking
    }));
    
    // Generate content vs hashtag performance data
    const contentPerformance = analysis.hashtags.map(tag => {
      const contentScore = Math.floor(Math.random() * 100) + 1;
      const hashtagScore = Math.floor(Math.random() * 100) + 1;
      
      return {
        hashtag: tag,
        contentScore,
        hashtagScore,
      };
    });
    
    // Calculate growth and engagement metrics
    const lastWeekViews = dailyViews.slice(-7).reduce((sum, day) => sum + day.views, 0);
    const previousWeekViews = dailyViews.slice(0, 7).reduce((sum, day) => sum + day.views, 0);
    const weeklyGrowth = previousWeekViews === 0 ? 100 : ((lastWeekViews - previousWeekViews) / previousWeekViews) * 100;
    
    const engagementRate = analysis.views.engagement || (Math.random() * 4) + 1; // 1-5%
    const viewTrend = weeklyGrowth >= 0 ? 'up' : 'down';
    
    setPerformanceData({
      dailyViews,
      hashtagPerformance,
      engagementRate,
      viewTrend,
      weeklyGrowth,
      contentPerformance
    });
  };
  
  // Format date for display
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
  
  if (loading || !analysisData) {
    return (
      <DashboardLayout title="Video Analytics">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-purple"></div>
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout title="Video Performance Analytics">
      <div className="space-y-6 animate-fade-in">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{analysisData.videoName}</CardTitle>
                <CardDescription>
                  Analyzed on {formatDate(analysisData.timestamp)}
                </CardDescription>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500 dark:text-gray-400">Generated title:</div>
                <div className="font-medium">{analysisData.title}</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between space-x-4">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                        <Eye className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Total Views</div>
                        <div className="text-2xl font-bold">{(analysisData.views.total || 1256).toLocaleString()}</div>
                      </div>
                    </div>
                    <div className={`flex items-center ${performanceData.viewTrend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                      {performanceData.viewTrend === 'up' ? (
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 mr-1" />
                      )}
                      <span className="text-sm">
                        {Math.abs(performanceData.weeklyGrowth).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between space-x-4">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-full">
                        <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-300" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Engagement</div>
                        <div className="text-2xl font-bold">{performanceData.engagementRate.toFixed(1)}%</div>
                      </div>
                    </div>
                    <div className="text-green-500 flex items-center">
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      <span className="text-sm">0.5%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between space-x-4">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
                        <Hash className="h-5 w-5 text-green-600 dark:text-green-300" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Top Hashtag</div>
                        <div className="text-xl font-bold">
                          #{performanceData.hashtagPerformance[0]?.hashtag || analysisData.hashtags[0]}
                        </div>
                      </div>
                    </div>
                    <div className="text-green-500 flex items-center">
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      <span className="text-sm">12.3%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between space-x-4">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-full">
                        <RefreshCw className="h-5 w-5 text-orange-600 dark:text-orange-300" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Impressions</div>
                        <div className="text-2xl font-bold">
                          {(analysisData.views.impressions || 3210).toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <div className="text-green-500 flex items-center">
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      <span className="text-sm">5.2%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview" className="flex items-center">
              <span className="mr-2">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="hashtags" className="flex items-center">
              <span className="mr-2">Hashtag Performance</span>
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center">
              <span className="mr-2">Content vs Hashtags</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>View Trends</CardTitle>
                <CardDescription>
                  Daily views over the last 14 days
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={performanceData.dailyViews}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 25,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="date" 
                        angle={-45} 
                        textAnchor="end" 
                        height={60}
                        tick={{fontSize: 12}}
                      />
                      <YAxis />
                      <Tooltip 
                        formatter={(value) => [`${value} views`, 'Views']}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="views" 
                        stroke="#6E59A5" 
                        strokeWidth={2} 
                        activeDot={{ r: 8 }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="hashtags" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Hashtag Performance</CardTitle>
                <CardDescription>
                  Views, engagement, and rankings by hashtag
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart
                      data={performanceData.hashtagPerformance}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 60,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="hashtag" 
                        angle={-45} 
                        textAnchor="end" 
                        height={60}
                        tick={{fontSize: 12}}
                      />
                      <YAxis yAxisId="left" orientation="left" stroke="#6E59A5" />
                      <YAxis yAxisId="right" orientation="right" stroke="#9b87f5" />
                      <Tooltip 
                        formatter={(value, name) => {
                          if (name === "views") return [`${value} views`, "Views"];
                          if (name === "engagement") return [`${value}%`, "Engagement"];
                          if (name === "ranking") return [`#${value}`, "Ranking"];
                          return [value, name];
                        }}
                        labelFormatter={(label) => `#${label}`}
                      />
                      <Legend />
                      <Bar 
                        yAxisId="left"
                        dataKey="views" 
                        name="Views" 
                        fill="#6E59A5" 
                        radius={[4, 4, 0, 0]} 
                      />
                      <Bar 
                        yAxisId="right"
                        dataKey="engagement" 
                        name="Engagement %" 
                        fill="#9b87f5" 
                        radius={[4, 4, 0, 0]} 
                      />
                      <Bar 
                        yAxisId="right"
                        dataKey="ranking" 
                        name="Ranking" 
                        fill="#4CAF50" 
                        radius={[4, 4, 0, 0]} 
                      />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Content vs Hashtag Performance</CardTitle>
                <CardDescription>
                  Comparison between content quality and hashtag effectiveness
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart
                      data={performanceData.contentPerformance}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 60,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="hashtag" 
                        angle={-45} 
                        textAnchor="end" 
                        height={60}
                        tick={{fontSize: 12}}
                      />
                      <YAxis />
                      <Tooltip 
                        formatter={(value, name) => {
                          if (name === "contentScore") return [`${value}/100`, "Content Score"];
                          if (name === "hashtagScore") return [`${value}/100`, "Hashtag Score"];
                          return [value, name];
                        }}
                        labelFormatter={(label) => `#${label}`}
                      />
                      <Legend />
                      <Bar 
                        dataKey="contentScore" 
                        name="Content Score" 
                        fill="#6E59A5" 
                        radius={[4, 4, 0, 0]} 
                      />
                      <Bar 
                        dataKey="hashtagScore" 
                        name="Hashtag Score" 
                        fill="#4CAF50" 
                        radius={[4, 4, 0, 0]} 
                      />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default VideoPerformance;
