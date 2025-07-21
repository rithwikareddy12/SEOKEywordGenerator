
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { 
  ChevronLeft, 
  ChevronRight, 
  LayoutDashboard, 
  Upload, 
  History, 
  Settings, 
  LogOut,
  Bell
} from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

export function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const [user] = useState<{ name: string; email: string } | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [collapsed, setCollapsed] = useState(() => {
    // Get collapsed state from localStorage or default to false
    const storedState = localStorage.getItem("sidebar-collapsed");
    return storedState ? JSON.parse(storedState) : false;
  });
  const [unreadNotifications] = useState(0);
  const navigate = useNavigate();
  
  // Save collapsed state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", JSON.stringify(collapsed));
  }, [collapsed]);
  
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const menuItems = [
    { title: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { title: "Video Analysis", icon: Upload, path: "/video-analysis" },
    // { title: "History", icon: History, path: "/history" },
    { title: "Settings", icon: Settings, path: "/settings" },
  ];

  // Record navigation history
  useEffect(() => {
    const currentPath = window.location.pathname;
    const timestamp = new Date().toISOString();
    
    // Get existing history or initialize empty array
    const historyString = localStorage.getItem("navigation-history") || "[]";
    const history = JSON.parse(historyString);
    
    // Add current page to history (limit to last 20 entries)
    const updatedHistory = [
      { path: currentPath, title: title, timestamp: timestamp },
      ...history
    ].slice(0, 20);
    
    localStorage.setItem("navigation-history", JSON.stringify(updatedHistory));
  }, [title]);

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Sidebar */}
      <div 
        className={`${
          collapsed ? "w-20" : "w-64"
        } bg-white dark:bg-gray-800 shadow-md transition-all duration-300 flex flex-col h-screen`}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          {!collapsed && (
            <h2 className="text-xl font-bold text-brand-purple dark:text-brand-purple-light">HashTag</h2>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setCollapsed(!collapsed)} 
            className="ml-auto"
          >
            {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </Button>
        </div>
        <div className="flex-1 py-6 overflow-y-auto">
          <nav className="space-y-1 px-2">
            {menuItems.map((item) => (
              <Button
                key={item.path}
                variant={window.location.pathname === item.path ? "secondary" : "ghost"}
                className={`w-full justify-start mb-1 ${
                  collapsed ? "px-2" : "px-4"
                }`}
                onClick={() => navigate(item.path)}
              >
                <item.icon className={`h-5 w-5 ${!collapsed ? "mr-2" : ""}`} />
                {!collapsed && <span>{item.title}</span>}
              </Button>
            ))}
          </nav>
        </div>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="ghost"
            className={`w-full justify-start ${collapsed ? "px-2" : "px-4"}`}
            onClick={handleLogout}
          >
            <LogOut className={`h-5 w-5 ${!collapsed ? "mr-2" : ""}`} />
            {!collapsed && <span>Logout</span>}
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h1>
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative"
                onClick={() => navigate("/notifications")}
              >
                <Bell className="h-5 w-5" />
                {unreadNotifications > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                    {unreadNotifications}
                  </span>
                )}
              </Button>
              {user && <span className="text-sm dark:text-gray-300 hidden md:inline-block">Welcome, {user.name}</span>}
              <ThemeToggle />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-900">
          {children}
        </main>
      </div>
    </div>
  );
}
