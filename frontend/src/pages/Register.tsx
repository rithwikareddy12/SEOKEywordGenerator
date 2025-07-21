
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthForm } from "@/components/AuthForm";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/ThemeToggle";

// Mock user database for demonstration
const MOCK_USERS = [
  { email: "demo@example.com", password: "password123", name: "Demo User" }
];

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRegister = async ({ 
    email, 
    password, 
    name 
  }: { 
    email: string; 
    password: string; 
    name?: string 
  }) => {
    setLoading(true);
    
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const userExists = MOCK_USERS.some(u => u.email === email);
    
    if (userExists) {
      toast({
        title: "Registration failed",
        description: "Email already in use",
        variant: "destructive",
      });
      throw new Error("Email already in use");
    }
    
    // In a real app, you would send this data to your backend
    // For demo purposes, we'll just store in localStorage
    localStorage.setItem("user", JSON.stringify({ email, name }));
    
    toast({
      title: "Registration successful",
      description: "Your account has been created",
    });
    
    navigate("/dashboard");
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
          <p className="mt-3 text-gray-600 dark:text-gray-400">Create an account to get started</p>
        </div>
        
        <AuthForm type="register" onSubmit={handleRegister} />
      </div>
    </div>
  );
};

export default Register;
