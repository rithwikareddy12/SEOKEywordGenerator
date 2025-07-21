import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Sparkles, Settings, BarChart } from "lucide-react";
import { PricingPlans } from "@/components/PricingPlans";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const Dashboard = () => {
  const navigate = useNavigate();
  const [showPricingDialog, setShowPricingDialog] = useState(false);

  return (
    <DashboardLayout title="Dashboard">
      <div className="space-y-6 animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="card-shadow hover-scale border-t-4 border-t-brand-purple dark:bg-gray-800 dark:border-t-brand-purple-light dark:text-white">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>New Analysis</CardTitle>
                <div className="p-2 bg-brand-purple/10 dark:bg-brand-purple/20 rounded-full">
                  <Upload className="h-5 w-5 text-brand-purple dark:text-brand-purple-light" />
                </div>
              </div>
              <CardDescription className="dark:text-gray-400">Upload a video to analyze</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm dark:text-gray-300">
                Generate SEO keywords, transcripts, and hashtag recommendations
              </p>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-brand-purple hover:bg-brand-purple-dark dark:bg-brand-purple-light dark:hover:bg-brand-purple text-white"
                onClick={() => navigate("/video-analysis")}
              >
                New Upload
              </Button>
            </CardFooter>
          </Card>

          <Card className="card-shadow hover-scale border-t-4 border-t-brand-purple dark:bg-gray-800 dark:border-t-brand-purple-light dark:text-white">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Analytics</CardTitle>
                <div className="p-2 bg-brand-purple/10 dark:bg-brand-purple/20 rounded-full">
                  <BarChart className="h-5 w-5 text-brand-purple dark:text-brand-purple-light" />
                </div>
              </div>
              <CardDescription className="dark:text-gray-400">View your performance</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm dark:text-gray-300">Track hashtag performance and video insights</p>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full dark:border-gray-700 dark:text-gray-300"
                onClick={() => navigate("/analyticsdashboard")}
              >
                View Analytics
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Card className="card-shadow hover-scale w-full dark:bg-gray-800 dark:text-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Account Settings</CardTitle>
              <div className="p-2 bg-brand-purple/10 dark:bg-brand-purple/20 rounded-full">
                <Settings className="h-5 w-5 text-brand-purple dark:text-brand-purple-light" />
              </div>
            </div>
            <CardDescription className="dark:text-gray-400">Manage your account</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm dark:text-gray-300">Update your profile, subscription, and preferences</p>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              className="w-full dark:border-gray-700 dark:text-gray-300"
              onClick={() => navigate("/settings")}
            >
              Settings
            </Button>
          </CardFooter>
        </Card>

        <Dialog open={showPricingDialog} onOpenChange={setShowPricingDialog}>
          <DialogContent className="sm:max-w-[900px]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center mb-2">
                Advanced Analytics Subscription
              </DialogTitle>
              <DialogDescription className="text-center">
                Choose a plan that's right for your content creation needs
              </DialogDescription>
            </DialogHeader>
            <PricingPlans />
          </DialogContent>
        </Dialog>

        <Card className="w-full card-shadow hover-scale bg-gradient-to-r from-brand-purple/10 to-brand-purple-light/10 border-brand-purple/20 dark:from-brand-purple/20 dark:to-brand-purple-light/20 dark:border-brand-purple/30 dark:text-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-brand-purple dark:text-brand-purple-light">
                Unlock Advanced Analytics
              </CardTitle>
              <div className="p-2 bg-brand-purple/20 dark:bg-brand-purple/30 rounded-full">
                <Sparkles className="h-5 w-5 text-brand-purple dark:text-brand-purple-light" />
              </div>
            </div>
            <CardDescription className="dark:text-gray-400">Get more insights and recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm dark:text-gray-300">
              Upgrade to one of our premium plans to access advanced analytics, competitor analysis, 
              trend forecasting, and more personalized recommendations.
            </p>
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="p-3 bg-white/50 dark:bg-white/5 rounded-lg text-center">
                <div className="text-lg font-bold text-brand-purple dark:text-brand-purple-light">$20</div>
                <div className="text-xs">per month</div>
              </div>
              <div className="p-3 bg-white/50 dark:bg-white/5 rounded-lg text-center border-2 border-brand-purple dark:border-brand-purple-light relative">
                <div className="absolute -top-2 -right-2 bg-brand-purple dark:bg-brand-purple-light text-white text-xs px-2 py-0.5 rounded-full">
                  Popular
                </div>
                <div className="text-lg font-bold text-brand-purple dark:text-brand-purple-light">$100</div>
                <div className="text-xs">for 6 months</div>
              </div>
              <div className="p-3 bg-white/50 dark:bg-white/5 rounded-lg text-center">
                <div className="text-lg font-bold text-brand-purple dark:text-brand-purple-light">$180</div>
                <div className="text-xs">per year</div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full border-brand-purple bg-brand-purple hover:bg-brand-purple/90 text-white dark:border-brand-purple-light dark:bg-brand-purple-light dark:hover:bg-brand-purple"
              onClick={() => setShowPricingDialog(true)}
            >
              View Plans
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
