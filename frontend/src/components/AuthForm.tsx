
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

interface AuthFormProps {
  type: "login" | "register";
  onSubmit: (data: { email: string; password: string; name?: string }) => Promise<void>;
}

export const AuthForm = ({ type, onSubmit }: AuthFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      await onSubmit({ email, password, ...(type === "register" ? { name } : {}) });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setIsLoading(false);
    }
  };
  
  const slideVariants = {
    hidden: { 
      opacity: 0, 
      x: type === "login" ? -50 : 50 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };
  
  return (
    <motion.div 
      variants={slideVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {type === "register" && (
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
                placeholder="Enter your name"
                className="dark:bg-gray-700"
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="dark:bg-gray-700"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              {type === "login" && (
                <Link to="/forgot-password" className="text-xs text-brand-purple dark:text-brand-purple-light hover:underline">
                  Forgot password?
                </Link>
              )}
            </div>
            <Input 
              id="password" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="dark:bg-gray-700"
            />
          </div>
          
          {error && (
            <div className="text-sm text-red-500 dark:text-red-400">
              {error}
            </div>
          )}
          
          <Button 
            type="submit" 
            className="w-full bg-brand-purple hover:bg-brand-purple-dark dark:bg-brand-purple-light dark:hover:bg-brand-purple"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin h-4 w-4 mr-2 border-b-2 border-white rounded-full"></div>
                <span>{type === "login" ? "Signing in..." : "Creating account..."}</span>
              </div>
            ) : (
              <span>{type === "login" ? "Sign in" : "Create account"}</span>
            )}
          </Button>
          
          <div className="text-center text-sm">
            {type === "login" ? (
              <p className="dark:text-gray-400">
                Don't have an account?{" "}
                <Link to="/register" className="text-brand-purple dark:text-brand-purple-light hover:underline font-medium">
                  Sign up
                </Link>
              </p>
            ) : (
              <p className="dark:text-gray-400">
                Already have an account?{" "}
                <Link to="/login" className="text-brand-purple dark:text-brand-purple-light hover:underline font-medium">
                  Sign in
                </Link>
              </p>
            )}
          </div>
        </form>
      </div>
    </motion.div>
  );
};
