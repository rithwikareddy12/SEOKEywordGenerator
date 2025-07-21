
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthForm } from "@/components/AuthForm";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/ThemeToggle";

// Mock user database for demonstration
const MOCK_USERS = [
  { email: "demo@example.com", password: "password123", name: "Demo User" }
];

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async ({ email, password }: { email: string; password: string }) => {
    setLoading(true);
    
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user exists in mock database
    const user = MOCK_USERS.find(
      u => u.email === email && u.password === password
    );
    
    if (user) {
      // Store user data in localStorage (in a real app, use proper auth tokens)
      localStorage.setItem("user", JSON.stringify({ email: user.email, name: user.name }));
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
      navigate("/dashboard");
    } else {
      throw new Error("Invalid credentials");
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-gray-light dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-brand-purple dark:text-brand-purple-light">HashTag Visualizer</h1>
          <p className="mt-3 text-gray-600 dark:text-gray-400">Analyze videos and optimize your SEO keywords</p>
        </div>
        
        <AuthForm type="login" onSubmit={handleLogin} />
      </div>
    </div>
  );
};

export default Login;


