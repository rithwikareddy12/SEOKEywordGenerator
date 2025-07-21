
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, BellRing, Search, Youtube } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-8">Main Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* WhatsApp Notification Tracker */}
        <Card>
          <CardHeader>
            <LayoutDashboard className="w-8 h-8 text-blue-600 mb-2" />
            <CardTitle>WhatsApp Tracker</CardTitle>
            <CardDescription>Track milestones for YouTube videos.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Get notified on WhatsApp when your video reaches specific milestones
              like views or likes.
            </p>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              className="w-full dark:border-gray-700 dark:text-gray-300"
              onClick={() => navigate("/analytics/whatsapp")}
            >
              Track on WhatsApp
            </Button>
          </CardFooter>
        </Card>

        {/* Search Volume Checker */}
        <Card>
          <CardHeader>
            <Search className="w-8 h-8 text-green-600 mb-2" />
            <CardTitle>Search Volume</CardTitle>
            <CardDescription>Analyze keyword popularity.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Enter a keyword to get search volume estimates and competition level
              for SEO planning.
            </p>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              className="w-full dark:border-gray-700 dark:text-gray-300"
              onClick={() => navigate("/analytics/search-volume")}
            >
              Check Keyword Volume
            </Button>
          </CardFooter>
        </Card>

        {/* YouTube Video Analytics */}
        <Card>
          <CardHeader>
            <Youtube className="w-8 h-8 text-red-600 mb-2" />
            <CardTitle>YouTube Analytics</CardTitle>
            <CardDescription>View engagement stats on videos.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Analyze likes, views, shares, and more using a YouTube video ID.
            </p>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              className="w-full dark:border-gray-700 dark:text-gray-300"
              onClick={() => navigate("/analytics/video-analysis")}
            >
              Analyze Video
            </Button>
          </CardFooter>
        </Card>

        {/* Analytics Dashboard Entry */}
        <Card>
          <CardHeader>
            <BellRing className="w-8 h-8 text-yellow-600 mb-2" />
            <CardTitle>Analytics Dashboard</CardTitle>
            <CardDescription>
              Go to central analytics dashboard with all tools.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              One place to manage WhatsApp alerts, check keyword search volume,
              and analyze YouTube videos.
            </p>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              className="w-full dark:border-gray-700 dark:text-gray-300"
              onClick={() => navigate("/analytics")}
            >
              View Analytics
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
